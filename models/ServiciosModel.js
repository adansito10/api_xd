import pool from '../config/Db.js';

class Servicio {
    static async findAll() {
        try {
            const result = await pool.query(
                'SELECT * FROM SERVICIOS WHERE delete_at IS NULL'
            );
            return result.rows;
        } catch (error) {
            throw new Error('Error al obtener los servicios: ' + error.message);
        }
    }

    static async create({ nombre_servicio, tipo_servicio, ubicacion, precio }) {
        try {
            const result = await pool.query(
                `INSERT INTO SERVICIOS (nombre_servicio, tipo_servicio, ubicacion, precio) 
                 VALUES ($1, $2, $3, $4) 
                 RETURNING *`,
                [nombre_servicio, tipo_servicio, ubicacion, precio]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al crear el servicio: ' + error.message);
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM SERVICIOS WHERE id = $1 AND delete_at IS NULL',
                [id]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error al buscar el servicio: ' + error.message);
        }
    }

    static async update(id, data) {
        const { nombre_servicio, tipo_servicio, ubicacion, precio } = data;
        try {
            const result = await pool.query(
                `UPDATE SERVICIOS 
                 SET nombre_servicio = $1, tipo_servicio = $2, ubicacion = $3, precio = $4, update_at = NOW() 
                 WHERE id = $5 AND delete_at IS NULL 
                 RETURNING *`,
                [nombre_servicio, tipo_servicio, ubicacion, precio, id]
            );

            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error al actualizar el servicio: ' + error.message);
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query(
                `UPDATE SERVICIOS 
                 SET delete_at = NOW() 
                 WHERE id = $1 AND delete_at IS NULL 
                 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                return { message: 'Servicio no encontrado o ya eliminado' };
            }

            return {
                message: 'Servicio eliminado correctamente',
                servicio: result.rows[0]
            };
        } catch (error) {
            throw new Error('Error al eliminar el servicio: ' + error.message);
        }
    }
}

export default Servicio;
