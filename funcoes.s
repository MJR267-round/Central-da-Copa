// FUNÇÕES AUXILIARES
function formatarHora(data, offset) {
    return new Date(data.getTime() + offset * 3600000)
        .toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

function carregarDados(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
}
