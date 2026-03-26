import { Navbar } from '../../components/navbar/index.js';
import { Footer } from '../../components/footer/index.js';

const body = document.body;

const navbar = Navbar();
body.appendChild(navbar);

const main = document.createElement('main');
main.className = 'page-container';
main.innerHTML = `
    <h1>🏠 Home</h1>
    <p>Bem-vindo à página inicial do App de Seleções!</p>
    <a href="../selecoes/index.html" class="btn">Ir para Seleções</a>
`;
body.appendChild(main);

const footer = Footer();
body.appendChild(footer);