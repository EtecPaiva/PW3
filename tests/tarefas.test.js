import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import request from 'supertest';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import pool from '../data/index.js';

// Inicia o index.js original em um processo separado, sem alterar a API.
const API_URL = 'http://127.0.0.1:3000';
const PROJECT_ROOT = fileURLToPath(new URL('..', import.meta.url));

let serverProcess;
let serverOutput = '';
let serverError = '';
let testUserId;

async function startOriginalServer() {
    return new Promise((resolve, reject) => {
        serverProcess = spawn(process.execPath, ['index.js'], {
            cwd: PROJECT_ROOT,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        let settled = false;
        const startupTimer = setTimeout(() => {
            if (!settled) {
                settled = true;
                reject(new Error(
                    `A API não iniciou na porta 3000. ${serverError || serverOutput}`
                ));
            }
        }, 15000);

        serverProcess.stdout.on('data', (chunk) => {
            serverOutput += chunk.toString();
            if (!settled && serverOutput.includes('Sistema inicializado')) {
                settled = true;
                clearTimeout(startupTimer);
                resolve();
            }
        });

        serverProcess.stderr.on('data', (chunk) => {
            serverError += chunk.toString();
        });

        serverProcess.once('error', (error) => {
            if (!settled) {
                settled = true;
                clearTimeout(startupTimer);
                reject(error);
            }
        });

        serverProcess.once('exit', (code) => {
            if (!settled) {
                settled = true;
                clearTimeout(startupTimer);
                reject(new Error(
                    `A API encerrou antes de iniciar (código ${code}). ${serverError || serverOutput}`
                ));
            }
        });
    });
}

async function stopOriginalServer() {
    if (!serverProcess || serverProcess.exitCode !== null || serverProcess.killed) {
        return;
    }

    const exited = new Promise((resolve) => serverProcess.once('exit', resolve));
    serverProcess.kill('SIGTERM');
    await Promise.race([exited, delay(3000)]);

    if (serverProcess.exitCode === null) {
        serverProcess.kill('SIGKILL');
        await Promise.race([exited, delay(1000)]);
    }
}

beforeAll(async () => {
    // Confere se o MySQL e as tabelas existentes estão disponíveis.
    try {
        await pool.query('SELECT 1');
        await pool.query('SELECT id FROM usuarios LIMIT 1');
        await pool.query('SELECT id FROM tarefas LIMIT 1');
    } catch (error) {
        throw new Error(
            'Não foi possível acessar o MySQL. Confira se o banco atividade_pw e as tabelas do arquivo atividade-pw.sql existem, e se usuário/senha estão corretos em data/index.js. ' + error.message
        );
    }

    // Cria um usuário temporário exclusivo para os testes, usando o banco real.
    const emailTemporario = `vitest_${randomUUID()}@example.com`;
    const [resultado] = await pool.execute(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        ['Usuário temporário dos testes', emailTemporario, 'senha_teste']
    );
    testUserId = resultado.insertId;

    await startOriginalServer();

    // Confirma que a API iniciada responde e consulta o banco.
    const resposta = await request(API_URL)
        .get(`/tarefas?fk_usuario_id=${testUserId}`)
        .timeout({ response: 3000, deadline: 5000 });

    if (resposta.status !== 200) {
        throw new Error(`A API respondeu com status ${resposta.status} ao verificar sua inicialização.`);
    }
}, 30000);

afterAll(async () => {
    await stopOriginalServer();

    // Remove somente as tarefas e o usuário temporário criados pela suíte.
    if (testUserId) {
        try {
            await pool.execute('DELETE FROM tarefas WHERE fk_usuario_id = ?', [testUserId]);
            await pool.execute('DELETE FROM usuarios WHERE id = ?', [testUserId]);
        } finally {
            await pool.end();
        }
    } else {
        await pool.end();
    }
}, 10000);

describe('Testes de integração da API de tarefas com MySQL', () => {
    test('1. Cadastra uma tarefa e confirma que ela foi gravada no banco', async () => {
        const titulo = `Tarefa de teste ${randomUUID()}`;

        const resposta = await request(API_URL)
            .post('/tarefas')
            .send({
                fk_usuario_id: testUserId,
                titulo,
                descricao: 'Tarefa criada pelo teste de integração',
                data: '2030-01-15 12:00:00'
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body.titulo).toBe(titulo);

        // Consulta o MySQL para confirmar a persistência.
        const [registros] = await pool.execute(
            'SELECT id, fk_usuario_id, titulo FROM tarefas WHERE id = ?',
            [resposta.body.id]
        );

        expect(registros).toHaveLength(1);
        expect(registros[0].titulo).toBe(titulo);
        expect(Number(registros[0].fk_usuario_id)).toBe(Number(testUserId));
    }, 15000);

    test('2. Rejeita uma tarefa sem título e não grava registro no banco', async () => {
        const [antes] = await pool.execute(
            'SELECT COUNT(*) AS total FROM tarefas WHERE fk_usuario_id = ?',
            [testUserId]
        );

        const resposta = await request(API_URL)
            .post('/tarefas')
            .send({
                fk_usuario_id: testUserId,
                descricao: 'Esta tarefa não deve ser gravada'
            });

        expect(resposta.status).toBe(400);
        expect(resposta.body.erro).toBe('fk_usuario_id e titulo são obrigatórios');

        const [depois] = await pool.execute(
            'SELECT COUNT(*) AS total FROM tarefas WHERE fk_usuario_id = ?',
            [testUserId]
        );

        expect(Number(depois[0].total)).toBe(Number(antes[0].total));
    }, 15000);

    test('3. Retorna 404 ao consultar uma tarefa que realmente não existe', async () => {
        let idInexistente = 4000000000;
        let encontrado = true;

        for (let tentativa = 0; tentativa < 1000; tentativa += 1) {
            const [registros] = await pool.execute(
                'SELECT id FROM tarefas WHERE id = ?',
                [idInexistente]
            );
            if (registros.length === 0) {
                encontrado = false;
                break;
            }
            idInexistente -= 1;
        }

        expect(encontrado).toBe(false);

        const resposta = await request(API_URL).get(`/tarefas/${idInexistente}`);

        expect(resposta.status).toBe(404);
        expect(resposta.body.erro).toBe('Tarefa não encontrada');
    }, 15000);
});
