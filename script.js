// Lista gerada automaticamente com base na data: 2025-04-20
const palavrasSimilares = [
  "fio",
  "corda",
  "arame",
  "linha",
  "condutor",
  "haste",
  "alça",
  "punho",
  "extremidade",
  "ponta",
  "manivela",
  "braço",
  "vara",
  "barra",
  "gancho",
  "trilho",
  "trança",
  "chicote",
  "laço",
  "nó",
  "passador",
  "encaixe",
  "gancho",
  "fita",
  "trama",
  "cinta",
  "pega",
  "fiação",
  "contato",
  "canal",
  "fiozinho",
  "trilho",
  "pegador",
  "apoio",
  "suporte",
  "encaixe",
  "tubo",
  "roldana",
  "fecho",
  "ligação",
  "ligador",
  "passagem",
  "empunhadura",
  "presilha",
  "braçadeira",
  "giro",
  "volta",
  "tomada",
  "torção",
  "alavanca",
  "cabo", // posição 50
  "soldado",
  "sargento",
  "oficial",
  "comandante",
  "militar",
  "tenente",
  "coronel",
  "general",
  "patente",
  "hierarquia",
  "tropa",
  "guerreiro",
  "combatente",
  "segurança",
  "vigia",
  "sentinela",
  "policial",
  "exército",
  "marinha",
  "batalhão",
  "recruta",
  "força",
  "arma",
  "quartel",
  "farda",
  "esquadrão",
  "pelotão",
  "quartel",
  "guarnição",
  "capitão",
  "serviço",
  "ordem",
  "posto",
  "comando",
  "tarefa",
  "missão",
  "instrutor",
  "giroflex",
  "patrulha",
  "base",
  "reforço",
  "treinamento",
  "alvo",
  "tática",
  "estratégia",
  "defesa",
  "reserva",
  "controle",
  "coordenação",
];

// Mostrar a dica da palavra 100 logo ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const dicaPalavra = palavrasSimilares[palavrasSimilares.length - 1]; // palavra nº 100
  const paragrafoDica = document.createElement("p");
  paragrafoDica.innerHTML = `A palavra de número 100 é <strong>"${dicaPalavra}"</strong>.`;
  paragrafoDica.style.marginTop = "8px";
  document
    .querySelector(".header")
    .insertAdjacentElement("afterend", paragrafoDica);
});

const alvoIndex = 49;
const tentativasRegistradas = [];
const dataHoje = "2025-04-20";
const jaJogouHoje = localStorage.getItem("guess50_jogado_em") === dataHoje;

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function getGrupo(diff) {
  if (diff === 0) return 0;
  if (diff <= 1) return 1;
  if (diff <= 2) return 2;
  if (diff <= 3) return 3;
  if (diff <= 5) return 4;
  if (diff <= 7) return 5;
  if (diff <= 10) return 6;
  if (diff <= 15) return 7;
  if (diff <= 20) return 8;
  if (diff <= 30) return 9;
  return 10;
}

function renderTentativas() {
  const guessList = document.getElementById("guessList");
  guessList.innerHTML = "";

  const ordenadas = tentativasRegistradas.sort((a, b) => a.index - b.index);

  for (const tentativa of ordenadas) {
    const li = document.createElement("li");
    li.classList.add("grupo-" + tentativa.grupo);

    const spanPalavra = document.createElement("span");
    spanPalavra.textContent = tentativa.palavraOriginal;
    spanPalavra.classList.add("palavra-bold");

    const spanPosicao = document.createElement("span");
    spanPosicao.textContent = tentativa.index + 1;

    li.appendChild(spanPalavra);
    li.appendChild(spanPosicao);
    guessList.appendChild(li);
  }
}

function mostrarFeedback(
  texto,
  cor = "",
  icone = "",
  animar = false,
  classeExtra = ""
) {
  const feedback = document.getElementById("feedback");
  feedback.className = ""; // limpa classes anteriores
  feedback.innerHTML =
    (icone ? `<i data-lucide="${icone}" style="margin-right: 6px;"></i>` : "") +
    texto;
  feedback.style.color = cor;

  if (animar) {
    feedback.classList.add("palavra-certa");
  }

  if (classeExtra) {
    // Garante que a animação reinicie
    feedback.classList.remove(classeExtra);
    void feedback.offsetWidth; // força reflow para reiniciar a animação
    feedback.classList.add(classeExtra);
  }

  lucide.createIcons();
}

function checkWord() {
  const inputField = document.getElementById("wordInput");
  const input = inputField.value.trim();
  const normalizedInput = normalizar(input);

  if (input === "" || inputField.disabled) return;

  const repetida = tentativasRegistradas.some(
    (e) => normalizar(e.palavraOriginal) === normalizedInput
  );

  if (repetida) {
    mostrarFeedback(
      "Você já tentou essa palavra!",
      "#fbc02d",
      "alert-triangle"
    );
    inputField.value = "";
    return;
  }

  let index = palavrasSimilares.findIndex(
    (palavra) => normalizar(palavra) === normalizedInput
  );

  if (index === -1) {
    mostrarFeedback(
      "Palavra fora da lista.",
      "#ff5252",
      "x-circle",
      false,
      "feedback-pulsar"
    );
    return; // importante: sai da função sem limpar
  } else {
    const diff = Math.abs(index - alvoIndex);
    const grupo = getGrupo(diff);

    tentativasRegistradas.push({
      palavraOriginal: palavrasSimilares[index],
      index,
      grupo,
    });

    if (diff === 0) {
      mostrarFeedback(
        "Acertou! A palavra 50 foi encontrada!",
        "#2e7d32",
        "check-circle",
        true
      );

      const botaoMostrar = document.createElement("button");
      botaoMostrar.textContent = "Mostrar as 100 palavras";
      botaoMostrar.style.marginTop = "15px";
      botaoMostrar.style.padding = "10px 16px";
      botaoMostrar.style.fontSize = "14px";
      botaoMostrar.style.borderRadius = "8px";
      botaoMostrar.style.border = "none";
      botaoMostrar.style.cursor = "pointer";
      botaoMostrar.style.backgroundColor = "#2e7d32";
      botaoMostrar.style.color = "white";
      botaoMostrar.style.transition = "background-color 0.3s ease";
      botaoMostrar.onmouseover = () =>
        (botaoMostrar.style.backgroundColor = "#1b5e20");
      botaoMostrar.onmouseout = () =>
        (botaoMostrar.style.backgroundColor = "#2e7d32");

      botaoMostrar.onclick = function () {
        mostrarTodasPalavrasRestantes();
        botaoMostrar.disabled = true;
        botaoMostrar.textContent = "Palavras exibidas";
        botaoMostrar.style.opacity = "0.7";
        botaoMostrar.style.cursor = "default";
      };

      document.getElementById("extraActions").innerHTML = ""; // limpa caso haja algo
      document.getElementById("extraActions").appendChild(botaoMostrar);

      localStorage.setItem("guess50_jogado_em", dataHoje);
      document.getElementById("wordInput").disabled = true;
    } else {
      mostrarFeedback(
        `"${palavrasSimilares[index]}" está na posição ${index + 1} da lista.`,
        "",
        "info"
      );
    }

    renderTentativas();
  }

  inputField.value = "";
}

function mostrarPreview(palavra) {
  const preview = document.getElementById("palavraPreview");
  if (!palavra || palavra.trim() === "") {
    preview.style.display = "none";
    return;
  }

  const normalizada = normalizar(palavra);
  const index = palavrasSimilares.findIndex(
    (p) => normalizar(p) === normalizada
  );

  if (index === -1) {
    preview.style.display = "none";
    return;
  }

  preview.innerHTML = `
    <span class="palavra-bold">${palavrasSimilares[index]}</span>
    <span>${index + 1}</span>
  `;
  preview.style.display = "flex";
}

document
  .getElementById("wordInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      checkWord();
    }
  });

window.onload = function () {
  const input = document.getElementById("wordInput");
  input.focus();

  if (jaJogouHoje) {
    input.disabled = true;
    mostrarFeedback("Você já jogou hoje. Volte amanhã!", "#999", "calendar-x");
  }

  const temaSalvo = localStorage.getItem("guess50_tema") || "dark";
  document.body.classList.toggle("light", temaSalvo === "light");

  const icon = document.getElementById("themeIcon");
  icon.setAttribute("data-lucide", temaSalvo === "light" ? "moon" : "sun");
  lucide.createIcons();
};

document.getElementById("toggleTheme").addEventListener("click", function () {
  const temaAtual = document.body.classList.toggle("light") ? "light" : "dark";
  localStorage.setItem("guess50_tema", temaAtual);

  const icon = document.getElementById("themeIcon");
  icon.setAttribute("data-lucide", temaAtual === "light" ? "moon" : "sun");
  lucide.createIcons();
});

function mostrarTodasPalavrasRestantes() {
  const guessList = document.getElementById("guessList");
  guessList.innerHTML = ""; // limpa completamente a lista para garantir ordem e unicidade

  const palavrasRegistradasPorIndice = {};
  tentativasRegistradas.forEach((tentativa) => {
    palavrasRegistradasPorIndice[tentativa.index] = tentativa;
  });

  palavrasSimilares.forEach((palavra, index) => {
    const diff = Math.abs(index - alvoIndex);
    const grupo = getGrupo(diff);

    const li = document.createElement("li");
    li.classList.add("grupo-" + grupo);

    const spanPalavra = document.createElement("span");
    spanPalavra.textContent = palavra;
    spanPalavra.classList.add("palavra-bold");

    const spanPosicao = document.createElement("span");
    spanPosicao.textContent = index + 1;

    li.appendChild(spanPalavra);
    li.appendChild(spanPosicao);

    // animação apenas para novas
    if (!palavrasRegistradasPorIndice[index]) {
      li.style.animation = "fadeInUp 0.3s ease forwards";
    }

    guessList.appendChild(li);
  });
}
