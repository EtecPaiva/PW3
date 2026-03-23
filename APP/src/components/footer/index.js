const Footer = () => {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="footer-container">
            <p>&copy; 2026 App de Seleções - Todos os direitos reservados</p>
            <p>Feito com ❤️ para amantes do futebol</p>
        </div>
    `;
    return footer;
};

export { Footer };