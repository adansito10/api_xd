import pool from '../config/Db.js';

class Empleado {
    // Obtener todos los empleados
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM EMPLEADOS WHERE delete_at IS NULL');
            return result.rows;
        } catch (error) {
            throw new Error('Error al obtener los empleados: ' + error.message);
        }
    }

    // Crear un nuevo empleado
    static async create({ nombre, RFC, telefono, apellidos }) {
        try {
            const result = await pool.query(
                'INSERT INTO EMPLEADOS (nombre, RFC, telefono, apellidos) VALUES ($1, $2, $3, $4) RETURNING *',
                [nombre, RFC, telefono, apellidos]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al crear el empleado: ' + error.message);
        }
    }

    // Obtener un empleado por ID
    static async findById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM EMPLEADOS WHERE id = $1 AND delete_at IS NULL',
                [id]
            );
            if (result.rowCount === 0) {
                throw new Error('Empleado no encontrado');
            }
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al buscar el empleado: ' + error.message);
        }
    }

    // Actualizar un empleado
    static async update(id, data) {
        const { nombre, RFC, telefono, apellidos } = data;
        try {
            const result = await pool.query(
                'UPDATE EMPLEADOS SET nombre = $1, RFC = $2, telefono = $3, apellidos = $4, update_at = NOW() WHERE id = $5 AND delete_at IS NULL RETURNING *',
                [nombre, RFC, telefono, apellidos, id]
            );
            if (result.rowCount === 0) {
                throw new Error('Empleado no encontrado o ya eliminado');
            }
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al actualizar el empleado: ' + error.message);
        }
    }

    // Eliminar un empleado de forma lógica
    static async delete(id) {
        try {
            const result = await pool.query(
                'UPDATE EMPLEADOS SET delete_at = NOW() WHERE id = $1 AND delete_at IS NULL RETURNING *',
                [id]
            );
            if (result.rowCount === 0) {
                throw new Error('Empleado no encontrado o ya eliminado');
            }
            return { message: 'Empleado eliminado exitosamente', empleado: result.rows[0] };
        } catch (error) {
            throw new Error('Error al eliminar el empleado: ' + error.message);
        }
    }
}

export default Empleado;
