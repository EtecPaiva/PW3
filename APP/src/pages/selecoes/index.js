import { getSelecoes } from "../../services/selecoes.service.js";
import { Navbar } from '../../components/navbar/index.js';
import { Footer } from '../../components/footer/index.js';

const body = document.body;

const navbar = Navbar();
body.appendChild(navbar);

const main = document.createElement('main');
main.className = 'page-container';
main.innerHTML = `
    <h1>⚽ Seleções</h1>
    <div id="selecoes-container"></div>
`;
body.appendChild(main);

const footer = Footer();
body.appendChild(footer);

const container = document.getElementById("selecoes-container");

const renderSelecoes = (raw) => {
    
    const selecoes = Array.isArray(raw) ? raw : (Array.isArray(raw?.selecoes) ? raw.selecoes : []);
    container.innerHTML = "";

    if (!selecoes.length) {
        container.innerHTML = "<p style='color:var(--accent);text-align:center'>Nenhuma seleção encontrada.</p>";
        return;
    }

    // ordenar alfabeticamente pelo nome para previsibilidade
    selecoes.sort((a, b) => (a.nome || '').localeCompare(b.nome || '', 'pt-BR', { sensitivity: 'base' }));

    selecoes.forEach((selecao) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const conquistas = Array.isArray(selecao.conquistas) ? selecao.conquistas : [];
        const jogadores = Array.isArray(selecao.jogadores) ? selecao.jogadores : [];

        const conquistasList = conquistas.map(c => `<li>${c.ano} - ${c.pais}</li>`).join('');
        const jogadoresList = jogadores.map(j => `<li>${j.nome} (${j.posicao || 'N/A'})${j.camisa ? ` - Camisa ${j.camisa}` : ''}</li>`).join('');

        card.innerHTML = `
            <img src="${(selecao.logo || '').trim()}" alt="${selecao.nome} logo" />
            <div class="meta">
                <div class="badge">Grupo ${selecao.grupo || '-'}</div>
                <div class="badge">🏆 ${conquistas.length}</div>
            </div>
            <h2>${selecao.nome}</h2>
            <p><strong>Conquistas</strong></p>
            <ul>${conquistasList}</ul>
            <p><strong>Jogadores</strong></p>
            <ul>${jogadoresList}</ul>
        `;

        container.appendChild(card);
    });
};

const load = async () => {
    try {
        const selecoes = await getSelecoes();
        console.log(selecoes);
        renderSelecoes(selecoes);
    } catch (error) {
        container.innerHTML = "<p>Erro ao carregar seleções</p>";
    }
};

load();