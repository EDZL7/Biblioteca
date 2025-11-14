document.addEventListener('DOMContentLoaded', () => {
    // Caminho para o arquivo JSON
    const dataUrl = 'dados.json';
    
    // Seleciona o corpo da tabela de forma específica para evitar erro 'null'
    const tableBody = document.querySelector('table.table tbody'); 
    
    if (!tableBody) {
        console.error("Erro: O elemento <tbody> da tabela não foi encontrado.");
        return;
    }

    // Inicia a requisição para buscar os dados
    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.statusText}`);
            }
            return response.json(); 
        })
        .then(data => {
            // Limpa o corpo da tabela
            tableBody.innerHTML = ''; 
            
            // Percorre a lista de livros e cria as linhas da tabela
            data.forEach(livro => {
                const row = tableBody.insertRow();
                
                // CÉLULA DA CAPA (IMAGEM)
                const capaCell = row.insertCell();
                const capaImg = document.createElement('img');
                
                // Define o link da imagem do JSON
                capaImg.src = livro.capa_placeholder; 
                capaImg.alt = `Capa do livro ${livro.titulo}`;
                
                // Estilização: width=50px, class do Bootstrap
                capaImg.style.width = '50px';
                capaImg.classList.add('img-fluid', 'rounded'); 
                
                capaCell.appendChild(capaImg);
                
                // OUTRAS CÉLULAS
                row.insertCell().textContent = livro.titulo;
                row.insertCell().textContent = livro.autor;
                row.insertCell().textContent = livro.genero;
            });
        })
        .catch(error => {
            // Trata erros (se o JSON não for encontrado ou estiver inválido)
            console.error('Erro ao carregar o catálogo:', error);
            const errorRow = tableBody.insertRow();
            const errorCell = errorRow.insertCell();
            errorCell.colSpan = 4;
            errorCell.textContent = `Erro ao carregar o catálogo.`;
            errorCell.classList.add('text-danger', 'text-center');
        });
});