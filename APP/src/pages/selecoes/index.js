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

const renderSelecoes = (selecoes) => {
    container.innerHTML = "";

    selecoes.forEach((selecao) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const conquistasList = selecao.conquistas.map(c => `<li>${c.ano} - ${c.pais}</li>`).join('');
        const jogadoresList = selecao.jogadores.map(j => `<li>${j.nome} (${j.posicao}) - Camisa ${j.camisa}</li>`).join('');

        card.innerHTML = `
            <img src="${selecao.logo}" alt="${selecao.nome} logo" />
            <h2>${selecao.nome}</h2>
            <p><strong>Grupo:</strong> ${selecao.grupo}</p>
            <p><strong>🏆 Títulos:</strong> ${selecao.conquistas.length}</p>
            <ul>${conquistasList}</ul>
            <p><strong>👥 Jogadores:</strong> ${selecao.jogadores.length}</p>
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