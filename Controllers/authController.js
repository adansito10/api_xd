import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authController = {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'El correo ya está registrado.' });
      }
      const user = await User.create(email, password);
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar usuario.' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
      }
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login exitoso.', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  },
};

export default authController;