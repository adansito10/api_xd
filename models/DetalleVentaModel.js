import pool from '../config/Db.js'; // Tu pool de conexiones con pg

// Función para obtener todos los detalles de ventas
const getAllDetalles = async () => {
    const query = 'SELECT * FROM detalleventas';
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener todos los detalles de venta: ' + error.message);
    }
};

// Función para obtener un detalle de venta por ID
const getDetalleById = async (id) => {
    const query = 'SELECT * FROM detalleventas WHERE idDetalleVenta = $1';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0]; // Devolver el primer (y único) resultado
    } catch (error) {
        throw new Error('Error al obtener el detalle de venta: ' + error.message);
    }
};

// Función para crear un nuevo detalle de venta
const createDetalleVenta = async (detalleVenta) => {
    const query = 'INSERT INTO detalleventas(idVenta, producto, cantidad, precio, total) VALUES($1, $2, $3, $4, $5) RETURNING *';
    try {
        const { rows } = await pool.query(query, [detalleVenta.idVenta, detalleVenta.producto, detalleVenta.cantidad, detalleVenta.precio, detalleVenta.total]);
        return rows[0]; // Retorna el detalle de venta creado
    } catch (error) {
        throw new Error('Error al crear el detalle de venta: ' + error.message);
    }
};

// Función para actualizar un detalle de venta
const updateDetalleVenta = async (id, detalleVenta) => {
    const query = 'UPDATE detalleventas SET producto = $1, cantidad = $2, precio = $3, total = $4, update_at = NOW() WHERE idDetalleVenta = $5 RETURNING *';
    try {
        const { rows } = await pool.query(query, [detalleVenta.producto, detalleVenta.cantidad, detalleVenta.precio, detalleVenta.total, id]);
        return rows[0]; // Retorna el detalle de venta actualizado
    } catch (error) {
        throw new Error('Error al actualizar el detalle de venta: ' + error.message);
    }
};

// Función para eliminar un detalle de venta (Lógica, actualizando la columna delete_at)
const deleteDetalleVenta = async (id) => {
    const query = 'UPDATE detalleventas SET delete_at = NOW() WHERE idDetalleVenta = $1 RETURNING *';
    try {
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            return { message: 'Detalle de venta no encontrado o ya eliminado' };
        }
        return { message: 'Detalle de venta eliminado correctamente', detalleVenta: rows[0] };
    } catch (error) {
        throw new Error('Error al eliminar el detalle de venta: ' + error.message);
    }
};

export default { getAllDetalles, getDetalleById, createDetalleVenta, updateDetalleVenta, deleteDetalleVenta };
