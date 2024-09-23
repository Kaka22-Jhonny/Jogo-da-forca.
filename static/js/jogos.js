let dicaAtual;
let letrasAdivinhadas = [];
const tentativasMaximas = 6;
let tentativasRestantes;
let palavraAtual;
const palavras = [
    "auggie",
    "nate",
    "sr browne",
    "sr buzanfa",
    "sra garcia",
    "jackWill",
    "julian",
    "charlotte",
    "olivia",
    "bullying",
    "melhora",
    "diferenças",
    "star wars",
    "gentileza",
    "extraordinario"
];
const dicas = [
    "Protagonista",
    "Papai",
    "Professor",
    "Diretor",
    "Professora",
    "Melhor amigo",
    "Bully",
    "Amiga",
    "Irmã",
    "O que auggie sofre?",
    "Quando percebe que esta errado",
    "O que distingue o protagonista",
    "Franquia que o protagonista adora",
    "Ser bom",
    "Descrição do protagonista"
];

function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas = [];
    tentativasRestantes = tentativasMaximas;

    atualizarDisplayDoJogo();
}

function atualizarDisplayDoJogo() {
    let palavraExibida = "";
    for (let i = 0; i < palavraAtual.length; i++) {
        const letra = palavraAtual[i];
        if (letrasAdivinhadas.indexOf(letra) !== -1) {
            palavraExibida += letra;
        } else {
            palavraExibida += "_";
        }
    }

    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;

    desenharBoneco(tentativasRestantes); // Atualiza o boneco
}

function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess");
    const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();
    if (letraAdivinhada.length === 1 && /^[a-záéíóuãöç\s]+$/.test(letraAdivinhada)) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);

            // Verifica se a letra está na palavra
            let letraNaoEncontrada = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (palavraAtual[i] === letraAdivinhada) {
                    letraNaoEncontrada = false;
                    break;
                }
            }

            if (letraNaoEncontrada) {
                tentativasRestantes--;
            }

            atualizarDisplayDoJogo();

            let palavraCompleta = true;
            for (let i = 0; i < palavraAtual.length; i++) {
                if (letrasAdivinhadas.indexOf(palavraAtual[i]) === -1) {
                    palavraCompleta = false;
                    break;
                }
            }

            if (palavraCompleta) {
                document.getElementById("status").textContent = "Você venceu!";
            } else if (tentativasRestantes <= 0) {
                document.getElementById("status").textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
            }
        }
        entradaAdivinhacao.value = "";
    }
}

// Inicializa o jogo quando a página é carregada
document.addEventListener("DOMContentLoaded", iniciarJogo);
