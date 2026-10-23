import express from 'express';
import cors from 'cors';
import * as UsuarioService from './service/usuario.js';
import * as TarefaService from './service/tarefa.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
        }
        const novoUsuario = await UsuarioService.cadastrarUsuario(nome, email, senha);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ erro: 'Este e-mail já está cadastrado' });
        }
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
        }

        const usuario = await UsuarioService.login(email, senha);

        if (usuario) {
            res.status(200).json({ mensagem: 'Login realizado com sucesso', usuario });
        } else {
            res.status(401).json({ erro: 'E-mail ou senha inválidos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/tarefas', async (req, res) => {
    try {
        const { fk_usuario_id } = req.query;
        const tarefas = await TarefaService.consultarTarefas(fk_usuario_id);
        res.status(200).json(tarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/tarefas/:id', async (req, res) => {
    try {
        const tarefa = await TarefaService.consultarTarefaPorId(req.params.id);
        if (tarefa) {
            res.status(200).json(tarefa);
        } else {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.post('/tarefas', async (req, res) => {
    try {
        const { fk_usuario_id, titulo, descricao, data } = req.body;
        if (!fk_usuario_id || !titulo) {
            return res.status(400).json({ erro: 'fk_usuario_id e titulo são obrigatórios' });
        }
        const novaTarefa = await TarefaService.cadastrarTarefa(fk_usuario_id, titulo, descricao, data);
        res.status(201).json(novaTarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.put('/tarefas/:id', async (req, res) => {
    try {
        const { titulo, descricao, data, status } = req.body;
        const tarefaAtualizada = await TarefaService.editarTarefa(req.params.id, titulo, descricao, data, status);
        
        if (tarefaAtualizada) {
            res.status(200).json(tarefaAtualizada);
        } else {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.delete('/tarefas/:id', async (req, res) => {
    try {
        const deletou = await TarefaService.deletarTarefa(req.params.id);
        if (deletou) {
            res.status(204).send();
        } else {
            res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.listen(3000, () => {
    console.log(`Sistema inicializado: \nInf: ${new Date()}`);
    console.log('http://localhost:3000/');
});