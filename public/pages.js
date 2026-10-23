const API = 'http://localhost:3000';
let cadastrando = false;
let usuario = null;

function alternarModo() {
    cadastrando = !cadastrando;
    document.getElementById('titulo-auth').innerText   = cadastrando ? 'Cadastro' : 'Login';
    document.getElementById('btn-auth').innerText      = cadastrando ? 'Cadastrar' : 'Entrar';
    document.getElementById('link-toggle').innerText   = cadastrando ? 'Já tenho conta' : 'Criar conta';
    document.getElementById('nome').style.display      = cadastrando ? 'block' : 'none';
}

async function enviarAuth() {
    const nome  = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const url  = cadastrando ? '/usuarios' : '/login';
    const body = cadastrando ? { nome, email, senha } : { email, senha };

    const res   = await fetch(API + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const dados = await res.json();

    if (!res.ok) return alert(dados.erro);

    if (cadastrando) {
        alert('Cadastrado! Faça login.');
        alternarModo();
    } else {
        usuario = dados.usuario;
        document.getElementById('secao-auth').style.display    = 'none';
        document.getElementById('secao-tarefas').style.display = 'block';
        const nomeEl = document.getElementById('nome-usuario');
        const avatarEl = document.getElementById('avatar-inicial');
        if (nomeEl) nomeEl.innerText = usuario.nome || 'Minha conta';
        if (avatarEl) avatarEl.innerText = (usuario.nome || 'T').trim().charAt(0).toUpperCase();
        listarTarefas();
    }
}

function sair() {
    usuario = null;
    document.getElementById('secao-auth').style.display    = 'block';
    document.getElementById('secao-tarefas').style.display = 'none';
}

async function consultar() {
    const titulo = document.getElementById('busca').value;
    const res    = await fetch(`${API}/tarefas?fk_usuario_id=${usuario.id}&titulo=${titulo}`);
    const tarefas = await res.json();
    desenharLista(tarefas);
}

async function listarTarefas() {
    document.getElementById('busca').value = ''; 
    const res     = await fetch(`${API}/tarefas?fk_usuario_id=${usuario.id}`);
    const tarefas = await res.json();
    desenharLista(tarefas);
}

function desenharLista(tarefas) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    const totalEl = document.getElementById('stat-total');
    const concluidasEl = document.getElementById('stat-concluidas');
    const pendentesEl = document.getElementById('stat-pendentes');
    const concluidas = tarefas.filter(t => t.status === 'CONCLUIDA').length;
    const pendentes = tarefas.length - concluidas;
    if (totalEl) totalEl.innerText = tarefas.length;
    if (concluidasEl) concluidasEl.innerText = concluidas;
    if (pendentesEl) pendentesEl.innerText = pendentes;

    if (!tarefas.length) {
        lista.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
        return;
    }

    tarefas.forEach(t => {
        const div = document.createElement('div');
        div.className = 'tarefa' + (t.status === 'CONCLUIDA' ? ' feita' : '');
        div.innerHTML = `
            <strong>${t.titulo}</strong><br>
            <small>${t.descricao || ''}</small><br>
            <button onclick="concluir(${t.id}, '${t.status}')">
                ${t.status === 'CONCLUIDA' ? 'Reabrir' : 'Concluir'}
            </button>
            <button onclick="abrirEdicao(${t.id})">Editar</button>
            <button onclick="deletar(${t.id})">Excluir</button>
        `;
        lista.appendChild(div);
    });
}

async function criarTarefa() {
    const titulo    = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const data      = document.getElementById('data').value;

    await fetch(API + '/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fk_usuario_id: usuario.id, titulo, descricao, data })
    });

    document.getElementById('titulo').value    = '';
    document.getElementById('descricao').value = '';
    listarTarefas();
}

async function abrirEdicao(id) {
    const res     = await fetch(`${API}/tarefas/${id}`);
    const tarefa  = await res.json();

    document.getElementById('edit-id').value        = tarefa.id;
    document.getElementById('edit-titulo').value    = tarefa.titulo;
    document.getElementById('edit-descricao').value = tarefa.descricao || '';
    document.getElementById('edit-data').value      = tarefa.data ? tarefa.data.split('T')[0] : '';
    document.getElementById('edit-status').value    = tarefa.status;

    document.getElementById('secao-tarefas').style.display = 'none';
    document.getElementById('secao-editar').style.display  = 'block';
}

async function salvarEdicao() {
    const id        = document.getElementById('edit-id').value;
    const titulo    = document.getElementById('edit-titulo').value;
    const descricao = document.getElementById('edit-descricao').value;
    const data      = document.getElementById('edit-data').value;
    const status    = document.getElementById('edit-status').value;

    await fetch(`${API}/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, data, status })
    });

    cancelarEdicao();
}

function cancelarEdicao() {
    document.getElementById('secao-editar').style.display  = 'none';
    document.getElementById('secao-tarefas').style.display = 'block';
    listarTarefas();
}


async function concluir(id, statusAtual) {
    const novoStatus = statusAtual === 'CONCLUIDA' ? 'PENDENTE' : 'CONCLUIDA';
    await fetch(`${API}/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    });
    listarTarefas();
}

async function deletar(id) {
    if (!confirm('Excluir esta tarefa?')) return;
    await fetch(`${API}/tarefas/${id}`, { method: 'DELETE' });
    listarTarefas();
}