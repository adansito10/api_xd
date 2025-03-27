import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UserModels.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ success: false, message: 'Faltan datos requeridos' });
    }

    const existingUser = await UsuarioModel.getByEmail(correo);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }

    const nuevoUsuario = await UsuarioModel.create({ nombre, correo, contrasena });

    const token = jwt.sign({ id: nuevoUsuario._id, correo: nuevoUsuario.correo }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ success: true, message: 'Usuario registrado', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario', error: err.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ success: false, message: 'Faltan correo o contraseña' });
    }

    const user = await UsuarioModel.getByEmail(correo);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id, correo: user.correo }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ success: true, message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: err.message });
  }
});

// Ruta protegida para verificar el token
router.get('/verify', authenticate, (req, res) => {
  res.status(200).json({ message: 'Token válido', user: req.user });
});

export default router;