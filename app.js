// ==============================================
// 🧠 APP.JS - CENTRAL DA COPA 2026 - COMPLETO
// ==============================================

// --------------------------
// CONFIGURAÇÕES GERAIS
// --------------------------
let VELOCIDADE_ATIVA = true;
const VELOCIDADES = [0.5, 1, 1.5, 2];
let velocidadeAtualIndex = 1;

// --------------------------
// FUSOS HORÁRIOS BRASIL
// --------------------------
function formatarHora(data, offset) {
    return new Date(data.getTime() + offset * 3600000)
        .toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function carregarRelogios() {
    const area = document.getElementById("areaRelogios");
    CONFIG.fusosHorarios.forEach(f => {
        if (f.ativo) {
            const div = document.createElement("div");
            div.className = "fuso";
            div.innerHTML = `
                <h3>UTC ${f.offsetUTC >= 0 ? "+" : ""}${f.offsetUTC}</h3>
                <p>${f.nome}</p>
                <p id="${f.id}">--:--</p>
            `;
            area.appendChild(div);
        }
    });
    atualizarRelogios();
    setInterval(atualizarRelogios, 1000);
}

function atualizarRelogios() {
    const agora = new Date();
    CONFIG.fusosHorarios.forEach(f => {
        if (f.ativo) {
            document.getElementById(f.id).textContent = formatarHora(agora, f.offsetUTC);
        }
    });
}

// --------------------------
// SISTEMA DE ENTRADA E SELEÇÕES
// --------------------------
function carregarSelecoes() {
    const areaUsuario = document.getElementById("areaUsuario");
    const lista = document.getElementById("listaSelecoes");
    
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    if (!nomeSalvo) {
        areaUsuario.innerHTML = `
            <p>Digite seu nome para entrar:</p>
            <input type="text" id="campoNomeUsuario" placeholder="Seu nome" maxlength="20">
            <button class="botao" onclick="entrarSite()">ENTRAR</button>
        `;
    } else {
        areaUsuario.innerHTML = `<p>Bem-vindo <strong>${nomeSalvo}</strong> ✅</p>`;
        lista.style.display = "flex";
    }

    LISTA_SELECOES.forEach(s => {
        const span = document.createElement("span");
        span.className = `selecao ${s.ativa ? "ativa" : ""}`;
        span.innerHTML = CONFIG.selecoes.mostrarBandeiras ? s.nome : s.nome.replace(/[^A-Za-z ]/g, '');
        span.onclick = () => span.classList.toggle("ativa");
        lista.appendChild(span);
    });
}

function entrarSite() {
    const nome = document.getElementById("campoNomeUsuario").value.trim();
    if (nome.length < 2) return alert("Digite um nome válido!");
    localStorage.setItem("nomeUsuario", nome);
    location.reload();
}

// --------------------------
// PLAYER COM EMBED E VELOCIDADE
// --------------------------
function carregarJogos() {
    const area = document.getElementById("listaJogos");
    LISTA_JOGOS.forEach(jogo => {
        const div = document.createElement("div");
        div.className = "jogo-card";
        div.innerHTML = `
            <div class="jogo-titulo" onclick="toggleJogo('${jogo.id}')">${jogo.titulo}</div>
            <div class="jogo-conteudo" id="${jogo.id}">
                <div class="player" id="player${jogo.id}">🎥 Cole link ou código EMBED aqui</div>
                
                <div class="controles-player">
                    <input type="text" id="link${jogo.id}" placeholder="Link YouTube / Embed / Premiere / ESPN">
                    <button class="botao" onclick="atualizarPlayer('${jogo.id}')">✅ Carregar</button>
                    <button class="botao" onclick="alterarVelocidade('${jogo.id}')">⚡ Velocidade: ${VELOCIDADES[velocidadeAtualIndex]}x</button>
                    <button class="botao ${VELOCIDADE_ATIVA ? '' : 'botao-desativado'}" onclick="ligarDesligarVelocidade()">🔄 Aceleração: ${VELOCIDADE_ATIVA ? 'ATIVA' : 'DESATIVADA'}</button>
                </div>

                <div class="linha">
                    <div>
                        <h4>💬 Chat de Texto</h4>
                        <div class="chat-box" id="chat${jogo.id}"></div>
                        <input type="text" id="nome${jogo.id}" value="${localStorage.getItem("nomeUsuario") || "Visitante"}">
                        <input type="text" id="msg${jogo.id}" placeholder="Escreva mensagem..." style="width:72%">
                        <button class="botao" onclick="enviarMsg('${jogo.id}')">Enviar</button>
                    </div>
                    <div>
                        <h4>🗣️ Sala de Voz</h4>
                        <a href="${jogo.salaVoz}" target="_blank" class="botao">🎙️ ENTRAR</a>
                        <div class="admin-area" id="admin${jogo.id}">
                            <button class="botao botao-admin" onclick="limparChat('${jogo.id}')">🗑️ Limpar Chat</button>
                        </div>
                        <button class="botao botao-admin" onclick="mostrarAdmin('${jogo.id}')">⚙️ Painel</button>
                    </div>
                </div>
            </div>
        `;
        area.appendChild(div);
    });
}

function toggleJogo(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === "block" ? "none" : "block";
}

function atualizarPlayer(id) {
    const link = document.getElementById(`link${id}`).value.trim();
    const player = document.getElementById(`player${id}`);

    // SUPORTE YOUTUBE
    if (link.includes("youtube.com") || link.includes("youtu.be") || link.includes("shorts")) {
        let embedLink = link.replace("watch?v=", "embed/").replace("shorts/", "embed/");
        player.innerHTML = `<iframe width="100%" height="220" src="${embedLink}" frameborder="0" allow="autoplay; fullscreen" id="video-${id}"></iframe>`;
    }
    // SUPORTE EMBED PRONTO
    else if (link.includes("<iframe") || link.includes("embed/") || link.includes("premiere") || link.includes("espn") || link.includes("globoplay")) {
        player.innerHTML = link;
    }
    // LINK NORMAL
    else {
        player.innerHTML = `✅ Link carregado com sucesso! <br>📺 Pronto para assistir`;
    }
}

function alterarVelocidade(id) {
    if (!VELOCIDADE_ATIVA) {
        alert("⚠️ Função de aceleração está DESATIVADA");
        return;
    }

    velocidadeAtualIndex = (velocidadeAtualIndex + 1) % VELOCIDADES.length;
    const vel = VELOCIDADES[velocidadeAtualIndex];
    const video = document.getElementById(`video-${id}`);
    
    if (video) {
        video.onload = () => {
            try {
                video.playbackRate = vel;
            } catch (e) {
                alert("⚠️ Não foi possível alterar velocidade neste link");
            }
        }
    }

    document.querySelector(`button[onclick="alterarVelocidade('${id}')"]`).textContent = `⚡ Velocidade: ${vel}x`;
}

function ligarDesligarVelocidade() {
    VELOCIDADE_ATIVA = !VELOCIDADE_ATIVA;
    const btn = document.querySelector('button[onclick="ligarDesligarVelocidade()"]');
    btn.textContent = `🔄 Aceleração: ${VELOCIDADE_ATIVA ? 'ATIVA' : 'DESATIVADA'}`;
    btn.classList.toggle('botao-desativado', !VELOCIDADE_ATIVA);
    alert(VELOCIDADE_ATIVA ? "✅ Aceleração ativada" : "❌ Aceleração desativada");
}

// --------------------------
// SISTEMA DE CHAT
// --------------------------
const chats = {};
LISTA_JOGOS.forEach(j => chats[j.id] = []);

function enviarMsg(id) {
    const nome = document.getElementById(`nome${id}`).value;
    const msg = document.getElementById(`msg${id}`).value.trim();
    
    if (!msg) return;
    if (msg.length > CONFIG.chat.maxCaracteres) {
        alert(`⚠️ Máximo ${CONFIG.chat.maxCaracteres} caracteres`);
        return;
    }

    chats[id].push({ nome, msg, data: new Date().toLocaleTimeString('pt-BR') });
    atualizarChat(id);
    document.getElementById(`msg${id}`).value = "";
}

function atualizarChat(id) {
    const box = document.getElementById(`chat${id}`);
    box.innerHTML = "";
    chats[id].forEach(m => {
        box.innerHTML += `<p><strong>[${m.data}] ${m.nome}:</strong> ${m.msg}</p>`;
    });
    box.scrollTop = box.scrollHeight;
}

function mostrarAdmin(id) {
    document.getElementById(`admin${id}`).style.display = "block";
}

function limparChat(id) {
    if (confirm("Apagar todas as mensagens deste jogo?")) {
        chats[id] = [];
        atualizarChat(id);
    }
}

// --------------------------
// AVISO JOGO AO VIVO
// --------------------------
setInterval(() => {
    const agora = new Date();
    const horaAtual = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    
    if (CONFIG.avisosJogos.includes(horaAtual)) {
        const alerta = document.getElementById("alertaAoVivo");
        alerta.style.display = "block";
        setTimeout(() => alerta.style.display = "none", 5000);
    }
}, 1000);

// --------------------------
// INICIAR TUDO QUANDO ABRIR O SITE
// --------------------------
window.onload = () => {
    carregarRelogios();
    carregarSelecoes();
    carregarJogos();
};
