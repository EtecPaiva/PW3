import pool from '../index.js';

// Cadastrar um novo usuário
export const cadastrarUsuario = async (nome, email, senha) => {
    const cx = await pool.getConnection();
    try {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        const [result] = await cx.query(sql, [nome, email, senha]);
        
        return { id: result.insertId, nome, email };
    } finally {
        cx.release();
    }
};

export const login = async (email, senha) => {
    const cx = await pool.getConnection();
    try {
        const sql = 'SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?';
        const [dados] = await cx.query(sql, [email, senha]);
        return dados.length > 0 ? dados[0] : null;
    } finally {
        cx.release();
    }
};