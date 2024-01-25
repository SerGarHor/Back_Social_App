import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
 
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'social_app',
    password: process.env.DB_PASSWORD || 'root',
    port: 5432,
  });
 
pool.connect(err => {
    if(err){
        console.log('Error con la bd', err)
        return;
    } else {
        console.log('Conexión exitosa con la bd')
    }
})
 
module.exports = pool