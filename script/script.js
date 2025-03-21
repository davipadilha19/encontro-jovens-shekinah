// Pegando os elementos do cursor e criando rastros
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  let trail = document.createElement("div");
  trail.classList.add("trail");
  document.body.appendChild(trail);

  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  setTimeout(() => {
    trail.style.opacity = "0";
    setTimeout(() => {
      trail.remove();
    }, 300);
  }, 100);
});

function getCountdown() {
  const now = new Date(); // Obtém a data e hora atuais
  const currentDay = now.getDay(); // Dia da semana (0 = domingo, 1 = segunda, ..., 6 = sábado)
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Converte o tempo atual para minutos

  // Define o horário de sexta-feira às 21:30 (21:30 = 21 * 60 + 30 = 1290 minutos)
  const targetDay = 5; // Sexta-feira é o dia 5
  const targetTime = 21 * 60 + 30; // 21:30 em minutos é 1290 minutos

  let targetDate = new Date(now); // Cria uma nova data com a data atual
  targetDate.setHours(21, 30, 0, 0); // Define a hora para 21:30 (em qualquer dia)

  // Se hoje já passou das 21:30 de sexta-feira, calcula o próximo horário de sexta-feira às 21:30
  if (currentDay === targetDay && currentTime >= targetTime) {
    targetDate.setDate(now.getDate() + 7); // Vai para a próxima sexta-feira
  } else if (
    currentDay > targetDay ||
    (currentDay === targetDay && currentTime < targetTime)
  ) {
    // Se o dia atual é após sexta-feira ou antes de 21:30, marca para a próxima sexta-feira
    const diffDays = (targetDay - currentDay + 7) % 7;
    targetDate.setDate(now.getDate() + diffDays); // Ajusta para o próximo dia de sexta-feira
  }

  // Se já for sexta-feira às 21:30, zera a contagem regressiva e espera até o sábado
  if (currentDay === 5 && currentTime >= targetTime) {
    const countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = `00d00h00min00seg`;
    return; // Para a contagem regressiva após atingir sexta-feira às 21:30
  }

  // Calcula a diferença de tempo entre agora e a próxima sexta-feira às 21:30
  const diffTime = targetDate - now;

  // Converte a diferença de tempo em dias, horas, minutos e segundos
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  // Formata a contagem regressiva no formato 00d00h00min00seg
  const countdownText = `${String(days).padStart(2, "0")}d${String(
    hours
  ).padStart(2, "0")}h${String(minutes).padStart(2, "0")}min${String(
    seconds
  ).padStart(2, "0")}seg`;

  // Exibe o tempo restante no elemento <h2>
  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = countdownText;
}

// Atualiza a contagem regressiva a cada segundo
setInterval(getCountdown, 1000);

// Chama a função para inicializar a contagem regressiva assim que a página carregar
getCountdown();
