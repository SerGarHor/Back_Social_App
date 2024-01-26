const http = require('http')
const _app = require('./../src/app')
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.SERVER_PORT || 3000

const server = http.createServer(_app)

server.listen(port, () => {
    console.log('Servidor escuchando en puerto', port)
})
