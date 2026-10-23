import pool from '../index.js';

export const consultarTarefas = async (fk_usuario_id) => {
    const cx = await pool.getConnection();
    try {
        let sql = 'SELECT * FROM tarefas';
        let params = [];

        if (fk_usuario_id) {
            sql += ' WHERE fk_usuario_id = ?';
            params.push(fk_usuario_id);
        }

        const [dados] = await cx.query(sql, params);
        return dados;
    } finally {
        cx.release();
    }
};

export const consultarTarefaPorId = async (id) => {
    const cx = await pool.getConnection();
    try {
        const [dados] = await cx.query('SELECT * FROM tarefas WHERE id = ?', [id]);
        return dados.length > 0 ? dados[0] : null;
    } finally {
        cx.release();
    }
};

export const cadastrarTarefa = async (fk_usuario_id, titulo, descricao, data) => {
    const cx = await pool.getConnection();
    try {
        const sql = 'INSERT INTO tarefas (fk_usuario_id, titulo, descricao, data) VALUES (?, ?, ?, ?)';
        const [result] = await cx.query(sql, [fk_usuario_id, titulo, descricao, data]);
        
        const [novaTarefa] = await cx.query('SELECT * FROM tarefas WHERE id = ?', [result.insertId]);
        return novaTarefa[0];
    } finally {
        cx.release();
    }
};

export const editarTarefa = async (id, titulo, descricao, data, status) => {
    const cx = await pool.getConnection();
    try {
        const sql = `
            UPDATE tarefas 
            SET titulo = COALESCE(?, titulo),
                descricao = COALESCE(?, descricao),
                data = COALESCE(?, data),
                status = COALESCE(?, status)
            WHERE id = ?`;
            
        await cx.query(sql, [titulo, descricao, data, status, id]);
        
        const [tarefaAtualizada] = await cx.query('SELECT * FROM tarefas WHERE id = ?', [id]);
        return tarefaAtualizada[0];
    } finally {
        cx.release();
    }
};

export const deletarTarefa = async (id) => {
    const cx = await pool.getConnection();
    try {
        const [result] = await cx.query('DELETE FROM tarefas WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } finally {
        cx.release();
    }
};