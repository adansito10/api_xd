import pool from '../config/Db.js';

export const getAllVentas = async () => {
    try {
        const query = `
            SELECT v.*, c.nombre AS nombre_cliente
            FROM ventas v
            JOIN clientes c ON v.id_cliente = c.id
            WHERE v.delete_at IS NULL
        `;
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener las ventas: ${error.message}`);
    }
};

export const getVentaById = async (id) => {
    try {
        const query = `
            SELECT v.*, c.nombre AS nombre_cliente
            FROM ventas v
            JOIN clientes c ON v.id_cliente = c.id
            WHERE v.id = $1 AND v.delete_at IS NULL
        `;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error(`Venta con ID ${id} no encontrada.`);
        }
        return rows[0];
    } catch (error) {
        throw new Error(`Error al obtener la venta: ${error.message}`);
    }
};

export const createVenta = async (venta) => {
    try {
        const query = `
            INSERT INTO ventas (monto, id_cliente) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const { rows } = await pool.query(query, [venta.monto, venta.id_cliente]);
        return rows[0];
    } catch (error) {
        throw new Error(`Error al crear la venta: ${error.message}`);
    }
};

export const updateVenta = async (id, venta) => {
    try {
        const query = `
            UPDATE ventas 
            SET monto = $1, id_cliente = $2, update_at = NOW() 
            WHERE id = $3 AND delete_at IS NULL 
            RETURNING *
        `;
        const { rows } = await pool.query(query, [venta.monto, venta.id_cliente, id]);
        if (rows.length === 0) {
            throw new Error(`Venta con ID ${id} no encontrada o ya eliminada.`);
        }
        return rows[0];
    } catch (error) {
        throw new Error(`Error al actualizar la venta: ${error.message}`);
    }
};

export const deleteVenta = async (id) => {
    try {
        const query = `
            UPDATE ventas 
            SET delete_at = NOW() 
            WHERE id = $1 AND delete_at IS NULL 
            RETURNING *
        `;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error(`Venta con ID ${id} no encontrada o ya eliminada.`);
        }
        return {
            message: 'Venta eliminada correctamente',
            venta: rows[0],
        };
    } catch (error) {
        throw new Error(`Error al eliminar la venta: ${error.message}`);
    }
};