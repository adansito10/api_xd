import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authController = {
  // Registro de usuario
  async register(req, res) {
    const { correo, contrasena } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(correo);
      if (existingUser) {
        return res.status(400).json({ error: 'El correo ya está registrado.' });
      }

      // Crear el usuario
      const user = await User.create(correo, contrasena);

      // Generar un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar usuario.' });
    }
  },

  // Inicio de sesión
  async login(req, res) {
    const { correo, contrasena } = req.body;

    try {
      // Buscar el usuario por email
      const user = await User.findByEmail(correo);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(contrasena, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Login exitoso.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  },
};

export default authController;