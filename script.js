// ===== Global State for Main Sequence =====
let state = {
  yes: 0,    // Yes steps: 0 -> 1 -> 2 -> 3 -> 4 (final)
  no: 0,     // No steps: 0 -> 1 -> 2 -> 3 -> 4 (then extra clicks)
  noExtra: 0 // Counts extra No clicks (for exponential growth)
};

// ===== Main Page Functions =====

// Fade out the welcome screen and reveal main content
function startValentine() {
  let welcomeScreen = document.getElementById('welcome-screen');
  let mainContent = document.getElementById('main-content');
  
  welcomeScreen.style.opacity = "0";
  welcomeScreen.style.transition = "opacity 0.8s ease-out";
  
  setTimeout(() => {
    welcomeScreen.style.display = "none";
    mainContent.classList.remove('hidden');
  }, 800);
}

// Fade out the main intro gif (gif6)
function fadeOutMainGif() {
  let mainGif = document.querySelector('.main-gif');
  if (mainGif && mainGif.style.display !== 'none') {
    mainGif.style.opacity = "0";
    setTimeout(() => { mainGif.style.display = "none"; }, 500);
  }
}

// ===== Yes Button Logic =====
function yesClick() {
  // If in extra-No mode, reset and resume yes sequence:
  if (state.no >= 4 && state.noExtra > 0) {
    state.no = 0;
    state.noExtra = 0;
    let yesBtn = document.getElementById('yes-button');
    yesBtn.style.transform = "scale(1)";
    let noBtn = document.getElementById('no-button');
    if (noBtn) noBtn.style.display = "none";
  }
  
  fadeOutMainGif();
  document.getElementById('gif-container').innerHTML = "";
  
  if (state.yes === 0) {
    document.getElementById('main-text').innerText = "Estas segura mi amor? ❤️";
    document.getElementById('response').innerText = "Es que se que es una decicion un poco dificil... 😥";
    document.getElementById('yes-button').innerText = "por supuesto 😘";
    document.getElementById('no-button').innerText = "Mejor no 😢";
    setGif("gif16.gif");
    state.yes = 1;
    
  } else if (state.yes === 1) {
    document.getElementById('main-text').innerText = "De verdaita? 😏";
    document.getElementById('yes-button').innerText = "Si mi amor, de verdaita 😍";
    document.getElementById('no-button').innerText = "Mejor no 😢";
    setGif("gif2.gif"); // Now plays gif2.gif
    state.yes = 2;
    
  } else if (state.yes === 2) {
    document.getElementById('main-text').innerText = "Mira que de aqui ya no hay vuelta atras 🔒";
    document.getElementById('yes-button').innerText = "Si mi amor, sin arrepentimientos 💖";
    document.getElementById('no-button').innerText = "Me arrepiento 😔";
    setGif("gif8.gif"); // Now plays gif8.gif
    state.yes = 3;
    
  } else if (state.yes === 3) {
    document.getElementById('main-text').innerText = "Gracias mi amoooorrr 😍";
    removeButtonsForFinalYes(); // Replaces Yes/No with a "Continuar" button.
    setGifs(["gif14.gif", "gif7.gif"]);
    state.yes = 4;
    
  } else if (state.yes === 4) {
    // Already in final yes state.
  }
}

// ===== No Button Logic =====
function noClick() {
  fadeOutMainGif();
  document.getElementById('gif-container').innerHTML = "";
  
  if (state.no < 4) {
    if (state.no === 0) {
      document.getElementById('main-text').innerText = "Por favor no me hagas esto 😭";
      document.getElementById('yes-button').innerText = "Mentira, si quiero 😉";
      document.getElementById('no-button').innerText = "Es que no quiero 😞";
      document.getElementById('response').innerText = "Cooooomo? 😱";
      setGif("gif18.gif");
      state.no = 1;
      
    } else if (state.no === 1) {
      document.getElementById('main-text').innerText = "Lo estas haciendo a proposito, di que siii 😤";
      document.getElementById('yes-button').innerText = "Esta bien mi amor 😘";
      document.getElementById('no-button').innerText = "No quiero y ya 😔";
      setGif("gif17.gif");
      state.no = 2;
      
    } else if (state.no === 2) {
      document.getElementById('main-text').innerText = "Anda vale 😕";
      document.getElementById('yes-button').innerText = "Pleaseee 😩";
      document.getElementById('no-button').innerText = "Sigo diciendo que no 😢";
      setGif("gif19.gif");
      state.no = 3;
      
    } else if (state.no === 3) {
      document.getElementById('main-text').innerText = "Sigue diciendo que no para que tu veas 😣";
      document.getElementById('yes-button').innerText = "Me rindo, si quiero 😔";
      document.getElementById('no-button').innerText = "No 😞";
      setGif("gif20.gif");
      state.no = 4;
      state.noExtra = 0;
    }
  } else if (state.no === 4) {
    state.noExtra += 1;
    let yesBtn = document.getElementById('yes-button');
    let newScale = Math.pow(1.5, state.noExtra); // Exponential growth: 1.5^noExtra
    yesBtn.style.transform = `scale(${newScale})`;
    setGif("gif12.gif");
    if (state.noExtra >= 5) {
      let noBtn = document.getElementById('no-button');
      if (noBtn) noBtn.style.display = "none";
    }
  }
}

// ===== Helper Functions for Main Sequence =====
function setGif(filename) {
  let container = document.getElementById('gif-container');
  container.innerHTML = `<img src="gifs/${filename}" alt="gif" style="width:200px; animation: pop 0.5s ease;">`;
}

function setGifs(filenames) {
  let container = document.getElementById('gif-container');
  container.innerHTML = "";
  filenames.forEach(file => {
    container.innerHTML += `<img src="gifs/${file}" alt="gif" style="width:200px; margin:5px; animation: pop 0.5s ease;">`;
  });
}

function removeButtonsForFinalYes() {
  let buttonsDiv = document.querySelector('.buttons');
  buttonsDiv.innerHTML = `<button id="continue-btn" onclick="continueFinal()">Continuar ✨</button>`;
}

// When the "Continuar" button (after final yes) is clicked:
function continueFinal() {
  startFinalSequence();
}

// ===== Final Sequence Code =====

// Global variables for final sequence
let finalStep = 0;
let heartCount = 0;

const finalScreens = [
  {
    text: "Asi como te dedico esta cancion te dedico mi vida entera mi amor, espero que podamos pasar un San Valentin lindo, aunque no este tan lleno de regalos como nos hubiese gustado a ambos... Hablando de regalos... ❤️",
    gif: "gif4.gif",
    buttons: [{ text: "Continuar", action: nextFinalScreen }]
  },
  {
    text: "Nunca me dijiste que regalo querias, es mas, aun no me has dicho algo que de verdad quieras, a parte del dinero. Pero yo ya sabia algo que te iba a dar, ya no es secreto, ya te lo puedo decir ya que llego el dia, te queria regalar unas flores junto con un yogurt especial y no, no hecho por mi, es mas, lo escogiste tu misma y sin darte cuenta, ves, por eso te lo pregunte en Diciembre, para que no te acuerdes jajajaja 😆",
    gif: "gif1.gif",
    buttons: [{ text: "Continuar", action: nextFinalScreen }]
  },
  {
    text: "Es mas... creo que aun ni sabes bien lo que quiero, tienes una idea pero seguro que ni sabes, aunque se me viene algo a la cabeza... Si... Ya se que quiero! 😍",
    gif: "gif3.gif",
    buttons: [{ text: "Continuar", action: nextFinalScreen }]
  },
  {
    text: "Te quiero a ti!! Claro que si mi amor y lo digo en serio, quiero salir contigo, quiero compartir contigo y quiero llenar mi vida y la tuya de experiencias juntos, Quiero:",
    gif: "gif21.gif",
    buttons: [
      { text: "Bailar contigo", action: function(){ setFinalGif("gif5.gif"); } },
      { text: "Te quiero abrazar", action: function(){ setFinalGif("gif9.gif"); } },
      { text: "Y te quiero Besar, con ganas", action: function(){ setFinalGif("gif11.gif"); } },
      { text: "Continuar", action: nextFinalScreen }
    ]
  },
  {
    text: "Recuerda mi amor, yo soy tuyo y de nadie mas, espero te guste mi regalito de San Valentin 💕",
    gif: "gif15.gif",
    buttons: [] // Heart button will be added separately.
  }
];

function startFinalSequence() {
  let mainContent = document.getElementById('main-content');
  mainContent.innerHTML = "";
  
  let finalContainer = document.createElement('div');
  finalContainer.id = "final-sequence";
  finalContainer.style.position = "relative";
  finalContainer.style.width = "100%";
  finalContainer.style.height = "100vh";
  finalContainer.style.overflow = "hidden";
  finalContainer.style.display = "flex";
  finalContainer.style.flexDirection = "column";
  finalContainer.style.justifyContent = "center";
  finalContainer.style.alignItems = "center";
  finalContainer.style.textAlign = "center";
  mainContent.appendChild(finalContainer);
  
  finalStep = 0;
  heartCount = 0;
  renderFinalScreen();
  
  // Insert background music as a video element covering the screen
  let bgVideo = document.createElement('video');
  bgVideo.id = "bg-music";
  bgVideo.src = "song.mp4";  // Using MP4 for background video
  bgVideo.autoplay = true;
  bgVideo.controls = false;
  bgVideo.style.position = "fixed";
  bgVideo.style.top = "0";
  bgVideo.style.left = "0";
  bgVideo.style.width = "100%";
  bgVideo.style.height = "100%";
  bgVideo.style.objectFit = "cover";
  bgVideo.style.zIndex = "-1";
  document.body.appendChild(bgVideo);
}

function renderFinalScreen() {
  let finalContainer = document.getElementById('final-sequence');
  finalContainer.innerHTML = "";
  let screen = finalScreens[finalStep];
  
  let textEl = document.createElement('p');
  textEl.innerText = screen.text;
  textEl.style.fontSize = "24px";
  textEl.style.color = "#fff";
  textEl.style.margin = "20px";
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
  
  if (finalStep === finalScreens.length - 1) {
    let heartBtn = document.createElement('button');
    heartBtn.innerText = "❤️";
    heartBtn.style.fontSize = "24px";
    heartBtn.style.padding = "10px 20px";
    heartBtn.style.margin = "10px";
    heartBtn.onclick = handleHeartButton;
    buttonsDiv.appendChild(heartBtn);
  }
  
  finalContainer.appendChild(buttonsDiv);
}

function nextFinalScreen() {
  finalStep++;
  if (finalStep >= finalScreens.length) {
    finalStep = finalScreens.length - 1;
  }
  renderFinalScreen();
}

function setFinalGif(gifName) {
  let finalContainer = document.getElementById('final-sequence');
  let imgs = finalContainer.getElementsByTagName('img');
  if (imgs.length > 0) {
    imgs[0].src = "gifs/" + gifName;
  } else {
    let imgEl = document.createElement('img');
    imgEl.src = "gifs/" + gifName;
    imgEl.style.width = "300px";
    imgEl.style.margin = "20px";
    finalContainer.appendChild(imgEl);
  }
}

function handleHeartButton() {
  heartCount++;
  let heart = document.createElement('div');
  heart.innerText = "❤️";
  heart.style.position = "absolute";
  heart.style.bottom = "20px";
  heart.style.left = Math.random() * 80 + 10 + "%";
  heart.style.fontSize = "24px";
  heart.style.opacity = "1";
  heart.style.transition = "all 2s ease-out";
  document.getElementById('final-sequence').appendChild(heart);
  setTimeout(() => {
    heart.style.bottom = "100%";
    heart.style.opacity = "0";
  }, 100);
  setTimeout(() => { heart.remove(); }, 2100);
  
  if (heartCount === 20) {
    let finalContainer = document.getElementById('final-sequence');
    let p = finalContainer.getElementsByTagName('p')[0];
    p.innerText = "No fue nada facil hacer todo esto mi amor, me alegra que hayas descubierto este secreto, te cuento que fue super dificil, pero lo volveria a hacer por ti, recuerdas cuando te dije que casi todo lo que te iba a dar podria o no tener algo secreto? JA, conseguiste este, eso es si lo estas leyendo, si no pues mala suerte para mi por hacer algo que no ves. Para hacer que valga la pena te cuento un secreto: me he estado masturbando pensando en ti todos los dias desde la ultima vez que lo hicimos, me encantaron tus gemidos/orgasmos, que sabroso ❤️";
  } else if (heartCount === 21) {
    heartCount = 0;
    let finalContainer = document.getElementById('final-sequence');
    let p = finalContainer.getElementsByTagName('p')[0];
    p.innerText = finalScreens[finalScreens.length - 1].text;
    setFinalGif(finalScreens[finalScreens.length - 1].gif);
  }
}
