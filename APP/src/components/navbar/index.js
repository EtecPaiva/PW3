const Navbar = () => {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <div class="navbar-container">
            <h1 class="navbar-title">🏆 Copa do Mundo</h1>
            <ul class="navbar-menu">
                <li><a href="/src/pages/home/index.html">Home</a></li>
                <li><a href="/src/pages/selecoes/index.html">Seleções</a></li>
            </ul>
        </div>
    `;
    return nav;
};

export { Navbar };