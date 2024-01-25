import express from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { middleware } from '../middleware/middleware';
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
                res.json({token})
            } else {
                console.log('Usuario no existente')
            }
        } else {
            console.log('err', err)
        } 
    })
})

//////// ******* PUT *******  ////////








//////// ******* DELETE *******  ////////
router.post('/test',(req, res) =>{
    middleware.verifyToken(req, res)
})




module.exports = router