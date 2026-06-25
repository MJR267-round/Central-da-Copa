// ==============================================
// 📁 CONFIGURAÇÕES GERAIS - CENTRAL DA COPA 2026
// Edite aqui tudo o que quiser mudar no site
// ==============================================

const CONFIG = {
    // NOME DO SITE
    nomeSite: "🏆 CENTRAL DA COPA 2026 🇧🇷",
    descricaoSite: "Horários, Transmissões e Bate-papo para a Copa do Mundo",
    
    // INFORMAÇÕES DA COMPETIÇÃO
    competicao: {
        nome: "Copa do Mundo FIFA 2026",
        dataInicio: "11/06/2026",
        dataFim: "19/07/2026",
        paisSede: "Estados Unidos / México / Canadá",
        estadioFinal: "Estádio Nacional, Nova Jersey"
    },

    // FUSOS HORÁRIOS BRASIL
    fusosHorarios: [
        {
            id: "fuso_noronha",
            nome: "Fernando de Noronha",
            offsetUTC: 2,
            ativo: true
        },
        {
            id: "fuso_brasilia",
            nome: "Brasília / Bahia / Sudeste / Nordeste",
            offsetUTC: 3,
            ativo: true
        },
        {
            id: "fuso_amazonas",
            nome: "Amazonas / Mato Grosso / Mato Grosso do Sul",
            offsetUTC: 4,
            ativo: true
        },
        {
            id: "fuso_acre",
            nome: "Acre / Oeste do Amazonas",
            offsetUTC: 5,
            ativo: true
        }
    ],

    // HORÁRIOS PARA AVISO DE JOGOS AO VIVO
    avisosJogos: [
        "08:00",
        "10:00",
        "13:00",
        "16:00",
        "17:00",
        "19:00",
        "21:00"
    ],

    // LINKS PADRÃO DAS SALAS DE VOZ
    salaVozPadrao: "https://meet.jit.si/central-copa-2026-",

    // CORES DO SITE
    cores: {
        primaria: "#0059b3",
        secundaria: "#0077ed",
        perigo: "#dc3545",
        fundo: "#121212",
        card: "#1e1e1e",
        texto: "#ffffff",
        textoCinza: "#aaaaaa"
    },

    // CONFIGURAÇÕES DO CHAT
    chat: {
        maxCaracteres: 150,
        tempoApagar: 3600, // segundos
        ativo: true
    },

    // CONFIGURAÇÕES DE SELEÇÕES
    selecoes: {
        mostrarBandeiras: true,
        ordenarPorGrupo: true,
        mostrarQuantidade: 48
    },

    // LINKS DE TRANSMISSÃO
    transmissoes: {
        oficial: "https://globoplay.globo.com/",
        alternativa: "https://www.youtube.com/results?search_query=copa+2026+ao+vivo"
    }
};

// ==============================================
// EXPORTA PARA USAR EM OUTROS ARQUIVOS
// ==============================================
if (typeof module !== 'undefined') {
    module.exports = CONFIG;
}
