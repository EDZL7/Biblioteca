const TEMA_CLARO = 'tema_claro';
const TEMA_ESCURO = 'tema_escuro';
const CHAVE_TEMA = 'tema-preferido';
function aplicarTema(tema) {
    const head = document.head;
    let linkTema = document.getElementById('linkTemaAdicional');
    document.body.classList.remove(TEMA_CLARO, TEMA_ESCURO);
    document.body.classList.add(tema);
    if (tema === TEMA_ESCURO) {
        if (!linkTema) {
            linkTema = document.createElement('link');
            linkTema.id = 'linkTemaAdicional';
            linkTema.rel = 'stylesheet';
            linkTema.href = 'style_dark.css';
            head.appendChild(linkTema);
        }
    } else {
        if (linkTema) {
            head.removeChild(linkTema);
        }
    }
    localStorage.setItem(CHAVE_TEMA, tema);
}
function trocarTema() {
    const temaAtual = localStorage.getItem(CHAVE_TEMA) || TEMA_CLARO; 
    const novoTema = temaAtual === TEMA_CLARO ? TEMA_ESCURO : TEMA_CLARO;
    aplicarTema(novoTema);
}
document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem(CHAVE_TEMA) || TEMA_CLARO;
    aplicarTema(temaSalvo);
});