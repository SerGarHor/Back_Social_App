import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors'; // Importa cors

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Reemplaza con la URL de tu aplicación Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})); // Usa cors middleware

// Mock de usuarios (en un entorno de producción, esto debería almacenarse en una base de datos)
const users = [
  { id: 1, username: 'usuario1', password: '$2b$10$5aJXY7EOLyplpMz.j9c2yuphoZNgvqjIvGw3g43kSzP1dOpAs7A/2' } // La contraseña es 'password'
];

// Ruta de registro
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    return res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario
    const user = users.find(user => user.username === username);

    // Verificar si el usuario existe y la contraseña es válida
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear y enviar token JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
