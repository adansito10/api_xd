import pool from '../config/dbPostgres.js';
import bcrypt from 'bcryptjs';

class User {
  // Crear un nuevo usuario
  static async create(email, contrasena) {
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Hashear la contraseña
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Buscar un usuario por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}

export default User;