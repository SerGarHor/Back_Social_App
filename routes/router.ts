import express from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Middleware } from '../middleware/middleware';
dotenv.config();
const router = express.Router()

const pgConnection = require('./../connection/connection') 

const secretKey = process.env.SECRET_KEY || 'defaultSecret';



//////// ******* GET *******  ////////

//Consultar todos los usuarios

router.get('/user', (req, res)=> {
    pgConnection.query('select * from users', (err: Error, rows: Array<object>) => {
        if (!err){
            res.json(rows)
        } else {
            console.log('err', err)
        } 
    })
})

//Consultar publicaciones por el filtro del search

router.get('/filter', (req, res)=> {

    const publication  = req.query.data
    pgConnection.query(`select * from publications WHERE publication LIKE '%${publication}%' ORDER BY id DESC`,
    (err: Error, rows: any) => {
        console.log('rows', rows)
        if (!err){
            res.json(rows.rows)
        } else {
            console.log('err', err)
        } 
    })
})


router.get('/nameuser', (req, res)=> {

    const id  = req.query.id
    pgConnection.query(`select fullname from users WHERE id=${id} `,
    (err: Error, rows: any) => {
        if (!err){
            res.json(rows.rows)
        } else {
            console.log('err', err)
        } 
    })
})

//Consultar todas las publicaciones

router.get('/publication', (req, res)=> {
    pgConnection.query(`
    SELECT publications.*, users.fullname
    FROM publications
    JOIN users ON publications.iduser = users.id
    ORDER BY publications.id DESC;`,
    (err: Error, rows: any) => {
        if (!err){
            res.json(rows.rows)
        } else {
            console.log('err', err)
        } 
    })
})

//////// ******* POST *******  ////////

//Login y creación del token

router.post('/singin', (req, res) => {
    console.log('req',req.body)
    const { email, password } = req.body
    pgConnection.query('select id, email from users where email = $1 and password = $2',
    [email, password],
    (err: Error, rows: any)=>{
        if (!err){
            if(rows.rows.length > 0){
                let data = JSON.stringify(rows.rows[0])
                const token = jwt.sign(data, secretKey)
                res.json({token, message: 'Bienveni@!', status: 200, data: rows.rows[0]})
            } else {
                console.log('Usuario no existente')
            }
        } else {
            console.log('err', err)
        } 
    })
})

router.post('/createpublication', (req, res) => {
    console.log('req',req.body)
    const { iduser, title, publication } = req.body
    pgConnection.query('INSERT INTO publications (iduser, title, publication) VALUES ($1, $2, $3)',
    [ iduser, title, publication ],
    (err: Error)=>{
        if (!err){
                res.json({status: 200, message:'Publicación creada con exito' })
        } else {
            console.log('err', err)
        } 
    })
})




//Creación de usuario

router.post('/register', (req, res) => {
    const { fullname, age, email, password } = req.body
    pgConnection.query('INSERT INTO users (fullname, age, email, password) VALUES ($1, $2, $3, $4)',
    [fullname, age, email, password],
    (err: Error)=>{
        if (!err){
                res.json({status: 200, message:'Usuario creado con exito' })
        } else {
            console.log('err', err)
        } 
    })
})


//////// ******* PUT *******  ////////








//////// ******* DELETE *******  ////////
router.post('/test',(req, res) =>{
    Middleware.verifyToken(req, res)
})




module.exports = router



