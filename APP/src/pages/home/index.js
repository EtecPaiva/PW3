import { Navbar } from '../../components/navbar/index.js';
import { Footer } from '../../components/footer/index.js';

const body = document.body;

const navbar = Navbar();
body.appendChild(navbar);

const main = document.createElement('main');
main.className = 'page-container';
main.innerHTML = `
    <section class="hero">
        <div class="container">
            <h1>🏠 App de Seleções</h1>
            <p>Explore seleções do mundo — conquistas, jogadores e estatísticas.</p>
            <a href="/src/pages/selecoes/index.html" class="btn">Ver Seleções</a>
        </div>
    </section>
`;
body.appendChild(main);

const footer = Footer();
body.appendChild(footer);