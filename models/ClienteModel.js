import pool from '../config/Db.js';

class Cliente {
    static async findAll() {
        const result = await pool.query('SELECT * FROM CLIENTES WHERE delete_at IS NULL');
        return result.rows;
    }

    static async create(data) {
        const { nombre, apellidos, direccion, telefono, email } = data;
        const result = await pool.query(
            'INSERT INTO CLIENTES (nombre, apellidos, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, apellidos, direccion, telefono, email]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            'SELECT * FROM CLIENTES WHERE id = $1 AND delete_at IS NULL',
            [id]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre, apellidos, direccion, telefono, email } = data;
        const result = await pool.query(
            'UPDATE CLIENTES SET nombre = $1, apellidos = $2, direccion = $3, telefono = $4, email = $5, update_at = CURRENT_TIMESTAMP, delete_at = NULL WHERE id = $6 RETURNING *',
            [nombre, apellidos, direccion, telefono, email, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            'UPDATE CLIENTES SET delete_at = NOW() WHERE id = $1 AND delete_at IS NULL RETURNING *',
            [id]
        );
        return result.rows[0];
    }
}

export default Cliente;
