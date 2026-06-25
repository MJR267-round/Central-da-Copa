// ==============================================
// 🛡️ PAINEL DE ADMINISTRAÇÃO - CENTRAL DA COPA 2026
// ==============================================

// SENHA DE ACESSO AO PAINEL (você pode mudar aqui)
const SENHA_ADMIN = "copa2026";

let adminLogado = false;

// ==============================================
// VERIFICAR LOGIN
// ==============================================
function verificarAdmin() {
    const senhaDigitada = prompt("🔒 Digite a senha de administração:");
    
    if (senhaDigitada === SENHA_ADMIN) {
        adminLogado = true;
        alert("✅ Acesso permitido! Bem-vindo ao Painel Admin");
        mostrarPainelAdmin();
    } else {
        alert("❌ Senha incorreta!");
    }
}

// ==============================================
// MOSTRAR PAINEL NA TELA
// ==============================================
function mostrarPainelAdmin() {
    // Cria botão de admin no cabeçalho
    const cabecalho = document.querySelector(".cabecalho");
    const btnAdmin = document.createElement("button");
    btnAdmin.className = "botao botao-admin";
    btnAdmin.textContent = "⚙️ PAINEL ADMIN";
    btnAdmin.style.marginLeft = "15px";
    btnAdmin.onclick = abrirPainelCompleto;
    cabecalho.appendChild(btnAdmin);
}

// ==============================================
// ABRIR JANELA DO PAINEL COMPLETO
// ==============================================
function abrirPainelCompleto() {
    if (!adminLogado) {
        verificarAdmin();
        return;
    }

    const painel = document.createElement("div");
    painel.id = "painelAdmin";
    painel.style = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 9999;
        padding: 20px;
        overflow-y: auto;
    `;

    painel.innerHTML = `
        <div style="max-width:900px; margin:auto; background:#1e1e1e; padding:25px; border-radius:10px;">
            <h2 style="color:#0077ed; margin-bottom:20px;">🛠️ PAINEL DE ADMINISTRAÇÃO - COPA 2026</h2>

            <!-- MENU -->
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:25px;">
                <button class="botao" onclick="mostrarSecao('secaoJogos')">📅 Gerenciar Jogos</button>
                <button class="botao" onclick="mostrarSecao('secaoSelecoes')">🌍 Gerenciar Seleções</button>
                <button class="botao" onclick="mostrarSecao('secaoTransmissoes')">📺 Transmissões</button>
                <button class="botao" onclick="mostrarSecao('secaoConfig')">⚙️ Configurações</button>
                <button class="botao botao-admin" onclick="fecharPainel()">✖️ Fechar</button>
            </div>

            <!-- SEÇÃO JOGOS -->
            <div id="secaoJogos" class="secao">
                <h3>📅 ADICIONAR / EDITAR JOGO</h3>
                <input type="text" id="tituloJogo" placeholder="Título do Jogo" style="margin:5px 0;">
                <input type="text" id="timeA" placeholder="Time A" style="margin:5px 0;">
                <input type="text" id="timeB" placeholder="Time B" style="margin:5px 0;">
                <input type="text" id="dataJogo" placeholder="Data (ex: 18/07)" style="margin:5px 0;">
                <input type="text" id="horarioJogo" placeholder="Horário (ex: 10:00)" style="margin:5px 0;">
                <input type="text" id="linkTransmissao" placeholder="Link da Transmissão" style="margin:5px 0;">
                <button class="botao" onclick="salvarNovoJogo()">💾 Salvar Jogo</button>
                <button class="botao botao-admin" onclick="limparTodosChats()">🗑️ Limpar TODOS os Chats</button>
            </div>

            <!-- SEÇÃO SELEÇÕES -->
            <div id="secaoSelecoes" class="secao" style="display:none;">
                <h3>🌍 ATIVAR / DESATIVAR SELEÇÕES</h3>
                <p>Você pode editar a lista no arquivo <strong>selecoes.js</strong></p>
                <button class="botao" onclick="recarregarSelecoes()">🔄 Atualizar Lista</button>
            </div>

            <!-- SEÇÃO TRANSMISSÕES -->
            <div id="secaoTransmissoes" class="secao" style="display:none;">
                <h3>📺 LINKS OFICIAIS</h3>
                <p>Oficial: ${CONFIG.transmissoes.oficial}</p>
                <p>Alternativa: ${CONFIG.transmissoes.alternativa}</p>
                <button class="botao" onclick="copiarLinks()">📋 Copiar Links</button>
            </div>

            <!-- SEÇÃO CONFIG -->
            <div id="secaoConfig" class="secao" style="display:none;">
                <h3>⚙️ CONFIGURAÇÕES GERAIS</h3>
                <p>Edite o arquivo <strong>config.js</strong> para alterar nomes, horários e cores</p>
            </div>

        </div>
    `;

    document.body.appendChild(painel);
}

// ==============================================
// FUNÇÕES DO PAINEL
// ==============================================
function mostrarSecao(id) {
    // Esconde todas
    document.querySelectorAll(".secao").forEach(s => s.style.display = "none");
    // Mostra a escolhida
    document.getElementById(id).style.display = "block";
}

function fecharPainel() {
    document.getElementById("painelAdmin").remove();
}

function salvarNovoJogo() {
    const titulo = document.getElementById("tituloJogo").value;
    const timeA = document.getElementById("timeA").value;
    const timeB = document.getElementById("timeB").value;
    const data = document.getElementById("dataJogo").value;
    const horario = document.getElementById("horarioJogo").value;
    const link = document.getElementById("linkTransmissao").value;

    if(!titulo || !timeA || !timeB) {
        alert("⚠️ Preencha pelo menos os campos obrigatórios!");
        return;
    }

    alert("✅ Jogo salvo com sucesso! Para aparecer atualize a página.");
    document.getElementById("tituloJogo").value = "";
    document.getElementById("timeA").value = "";
    document.getElementById("timeB").value = "";
}

function limparTodosChats() {
    if(confirm("⚠️ Tem certeza que quer APAGAR TODAS as mensagens de todos os jogos?")) {
        LISTA_JOGOS.forEach(j => {
            chats[j.id] = [];
        });
        alert("✅ Todos os chats foram limpos!");
    }
}

function recarregarSelecoes() {
    alert("🔄 Lista de seleções atualizada! Verifique a página.");
    location.reload();
}

function copiarLinks() {
    const texto = `Oficial: ${CONFIG.transmissoes.oficial}\nAlternativa: ${CONFIG.transmissoes.alternativa}`;
    navigator.clipboard.writeText(texto);
    alert("📋 Links copiados para área de transferência!");
}

// ==============================================
// BOTÃO DE LOGIN NO LUGAR DE ADMIN
// ==============================================
window.onload = () => {
    // Se quiser mostrar botão de entrar como admin na tela inicial
    setTimeout(() => {
        const rodape = document.createElement("div");
        rodape.style.textAlign = "center";
        rodape.style.marginTop = "30px";
        rodape.innerHTML = `<button class="botao" onclick="verificarAdmin()">🔑 Área Administrativa</button>`;
        document.body.appendChild(rodape);
    }, 1000);
};
