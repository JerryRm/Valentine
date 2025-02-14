document.addEventListener("DOMContentLoaded", function () {
  preloadAudio();
});

function preloadAudio() {
  let audio = new Audio("song.mp3");
  audio.preload = "auto";
}

let finalStep = 0;
const finalScreens = [
  {
    text: "Así como te dedico esta canción te dedico mi vida entera mi amor, espero que podamos pasar un San Valentín lindo, aunque no esté tan lleno de regalos como nos hubiese gustado a ambos... Hablando de regalos...",
    gif: "gif4.gif",
    buttons: [{ text: "Continuar", action: nextFinalStep }]
  },
  {
    text: "Nunca me dijiste qué regalo querías, es más, aún no me has dicho algo que de verdad quieras, aparte del dinero. Pero yo ya sabía algo que te iba a dar, ya no es secreto, ya te lo puedo decir, ya que llegó el día. Te quería regalar unas flores junto con un yogurt especial, y no, no hecho por mí. Es más, lo escogiste tú misma sin darte cuenta. ¿Ves? Por eso te lo pregunté en diciembre, para que no te acordaras jajaja.",
    gif: "gif1.gif",
    buttons: [{ text: "Continuar", action: nextFinalStep }]
  },
  {
    text: "Es más... creo que aún ni sabes bien lo que quiero, tienes una idea pero seguro que ni sabes. Aunque se me viene algo a la cabeza... Sí... ¡Ya sé qué quiero!",
    gif: "gif3.gif",
    buttons: [{ text: "Continuar", action: nextFinalStep }]
  },
  {
    text: "¡Te quiero a ti! Claro que sí, mi amor, y lo digo en serio. Quiero salir contigo, quiero compartir contigo y quiero llenar mi vida y la tuya de experiencias juntos. Quiero:",
    gif: "gif21.gif",
    buttons: [
      { text: "Bailar contigo 💃", action: () => updateGif("gif5.gif") },
      { text: "Te quiero abrazar 🤗", action: () => updateGif("gif9.gif") },
      { text: "Y te quiero besar, con ganas 💋", action: () => updateGif("gif11.gif") },
      { text: "Continuar", action: nextFinalStep }
    ]
  },
  {
    text: "Recuerda, mi amor, yo soy tuyo y de nadie más. Espero te guste mi regalito de San Valentín.",
    gif: "gif15.gif",
    buttons: [{ text: "❤️", action: handleHeartButton }]
  }
];

function nextFinalStep() {
  finalStep++;
  if (finalStep < finalScreens.length) {
    renderFinalScreen();
  }
}

function updateGif(newGif) {
  let imgEl = document.querySelector("#final-sequence img");
  if (imgEl) {
    imgEl.src = "gifs/" + newGif;
  }
}

let heartClickCount = 0;

function handleHeartButton() {
  heartClickCount++;
  createFlyingHeart();

  if (heartClickCount === 20) {
    let textEl = document.querySelector("#final-sequence p.final-text");
    let imgEl = document.querySelector("#final-sequence img");
    textEl.innerText = "No fue nada fácil hacer todo esto mi amor, me alegra que hayas descubierto este secreto. Te cuento que fue súper difícil, pero lo volvería a hacer por ti. Recuerdas cuando te dije que casi todo lo que te iba a dar podría o no tener algo secreto? JA, conseguiste este. Eso es, si lo estás leyendo... si no, pues mala suerte para mí por hacer algo que no ves.";
    imgEl.src = "gifs/gif13.gif";
  } else if (heartClickCount > 20) {
    resetFinalScreen();
  }
}

function resetFinalScreen() {
  heartClickCount = 0;
  let textEl = document.querySelector("#final-sequence p.final-text");
  let imgEl = document.querySelector("#final-sequence img");
  textEl.innerText = "Recuerda, mi amor, yo soy tuyo y de nadie más. Espero te guste mi regalito de San Valentín.";
  imgEl.src = "gifs/gif15.gif";
}

function createFlyingHeart() {
  let heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = "❤️";
  document.body.appendChild(heart);

  let startPos = Math.random() * window.innerWidth;
  heart.style.left = `${startPos}px`;

  setTimeout(() => heart.remove(), 3000);
}

function renderFinalScreen() {
  let finalContainer = document.getElementById('final-sequence');
  finalContainer.innerHTML = "";
  let screen = finalScreens[finalStep];

  let textEl = document.createElement('p');
  textEl.innerText = screen.text;
  textEl.className = "final-text";
  finalContainer.appendChild(textEl);

  if (screen.gif) {
    let imgEl = document.createElement('img');
    imgEl.src = "gifs/" + screen.gif;
    imgEl.style.width = "300px";
    imgEl.style.margin = "20px";
    finalContainer.appendChild(imgEl);
  }

  let buttonsDiv = document.createElement('div');
  buttonsDiv.style.margin = "20px";
  screen.buttons.forEach(btnObj => {
    let btn = document.createElement('button');
    btn.innerText = btnObj.text;
    btn.style.fontSize = "18px";
    btn.style.padding = "10px 20px";
    btn.style.margin = "10px";
    btn.onclick = btnObj.action;
    buttonsDiv.appendChild(btn);
  });

  finalContainer.appendChild(buttonsDiv);
}