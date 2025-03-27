import pool from '../config/Db.js';

class Cita {
    static async findAll() {
        const result = await pool.query('SELECT * FROM CITAS WHERE delete_at IS NULL');
        return result.rows;
    }

    static async create(data) {
        const { fechacita, ubicacion, id_cliente } = data;

        const result = await pool.query(
            'INSERT INTO CITAS (fecha_cita, ubicacion, id_cliente) VALUES ($1, $2, $3) RETURNING *',
            [fechacita, ubicacion, id_cliente]
        );
        return result.rows[0];
    }

    static async findById(idcitas) {
        const result = await pool.query('SELECT * FROM CITAS WHERE id = $1 AND delete_at IS NULL', [idcitas]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { fechacita, ubicacion, id_cliente } = data;
        const result = await pool.query(
            'UPDATE CITAS SET fecha_cita = $1, ubicacion = $2, id_cliente = $3, update_at = CURRENT_TIMESTAMP, delete_at = NULL WHERE id = $4 RETURNING *',
            [fechacita, ubicacion, id_cliente, id]
        );
        return result.rows[0];
    }

    static async delete(idcitas) {
        const result = await pool.query(
            'UPDATE CITAS SET delete_at = NOW() WHERE id = $1 AND delete_at IS NULL RETURNING *',
            [idcitas]
        );
        return result.rows[0];
    }
}

export default Cita;
