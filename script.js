// Global state for yes/no sequences
let state = {
  yes: 0,       // 0 -> 1 -> 2 -> 3 -> 4 are the Yes steps
  no: 0,        // 0 -> 1 -> 2 -> 3 -> 4 are the No steps
  noExtra: 0    // extra No clicks after no=4
};

// Called when the "Continuar" button on the welcome screen is clicked
function startValentine() {
  let welcomeScreen = document.getElementById('welcome-screen');
  let mainContent = document.getElementById('main-content');
  
  // Fade out the welcome screen
  welcomeScreen.style.opacity = "0";
  welcomeScreen.style.transition = "opacity 0.8s ease-out";

  setTimeout(() => {
    welcomeScreen.style.display = "none";
    mainContent.classList.remove('hidden');
    // gif6 is now visible
  }, 800);
}

// Fade out gif6 (the main intro GIF) if it’s still showing
function fadeOutMainGif() {
  let mainGif = document.querySelector('.main-gif');
  if (mainGif && mainGif.style.display !== 'none') {
    mainGif.style.opacity = "0";
    setTimeout(() => {
      mainGif.style.display = "none";
    }, 500);
  }
}

// =============== YES CLICK LOGIC ===============
function yesClick() {
  // If we're in the "final No" scenario (no=4 or beyond),
  // force the Yes button to say "Me rindo, si quiero," reset scale,
  // and remove the No button. Then stop.
  if (state.no >= 4) {
    let yesBtn = document.getElementById('yes-button');
    yesBtn.innerText = "Me rindo, si quiero";
    yesBtn.style.transform = "scale(1)"; // reset size
    let noBtn = document.getElementById('no-button');
    if (noBtn) noBtn.style.display = "none";
    return;
  }

  // Otherwise, proceed with the Yes sequence
  fadeOutMainGif(); // remove gif6 on the first click
  document.getElementById('gif-container').innerHTML = ""; // clear any existing GIF

  if (state.yes === 0) {
    // 1st Yes
    document.getElementById('main-text').innerText = "Estas segura mi amor?";
    document.getElementById('response').innerText = "Es que se que es una decicion un poco dificil...";
    document.getElementById('yes-button').innerText = "por supuesto";
    document.getElementById('no-button').innerText = "Mejor no";
    setGif("gif16.gif");
    state.yes = 1;

  } else if (state.yes === 1) {
    // 2nd Yes
    document.getElementById('main-text').innerText = "De verdaita?";
    document.getElementById('yes-button').innerText = "Si mi amor, de verdaita";
    document.getElementById('no-button').innerText = "Mejor no"; // stays the same
    setGif("gif2.gif");
    state.yes = 2;

  } else if (state.yes === 2) {
    // 3rd Yes (the newly inserted step)
    document.getElementById('main-text').innerText = "Mira que de aqui ya no hay vuelta atras";
    document.getElementById('yes-button').innerText = "Si mi amor, sin arrepentimientos";
    document.getElementById('no-button').innerText = "Me arrepiento";
    // If you want a GIF here, uncomment:
    // setGif("gifXYZ.gif");
    state.yes = 3;

  } else if (state.yes === 3) {
    // 4th Yes => Final before "Continuar"
    document.getElementById('main-text').innerText = "Gracias mi amoooorrr";
    removeButtonsForFinalYes();
    // Play gif14 and gif7 simultaneously
    setGifs(["gif14.gif", "gif7.gif"]);
    state.yes = 4;

  } else if (state.yes === 4) {
    // Already at final yes step
  }
}

// =============== NO CLICK LOGIC ===============
function noClick() {
  fadeOutMainGif(); // remove gif6 on the first click
  document.getElementById('gif-container').innerHTML = ""; // clear any existing GIF

  if (state.no < 4) {
    if (state.no === 0) {
      // 1st No
      document.getElementById('main-text').innerText = "Por favor no me hagas esto";
      document.getElementById('yes-button').innerText = "Mentira, si quiero";
      document.getElementById('no-button').innerText = "Es que no quiero";
      document.getElementById('response').innerText = "Cooooomo?";
      setGif("gif18.gif");
      state.no = 1;

    } else if (state.no === 1) {
      // 2nd No
      document.getElementById('main-text').innerText = "Lo estas haciendo a proposito, di que siii";
      document.getElementById('yes-button').innerText = "Esta bien mi amor";
      document.getElementById('no-button').innerText = "No quiero y ya";
      setGif("gif17.gif");
      state.no = 2;

    } else if (state.no === 2) {
      // 3rd No
      document.getElementById('main-text').innerText = "Anda vale";
      document.getElementById('yes-button').innerText = "Pleaseee";
      document.getElementById('no-button').innerText = "Sigo diciendo que no";
      setGif("gif19.gif");
      state.no = 3;

    } else if (state.no === 3) {
      // 4th No
      document.getElementById('main-text').innerText = "Sigue diciendo que no para que tu veas";
      document.getElementById('yes-button').innerText = "Me rindo, si quiero";
      document.getElementById('no-button').innerText = "No";
      setGif("gif20.gif");
      state.no = 4;
      state.noExtra = 0; // reset extra no clicks
    }
  } else if (state.no === 4) {
    // Extra No clicks beyond the 4th
    state.noExtra += 1;
    let yesBtn = document.getElementById('yes-button');
    // Exponential growth: each extra No => 1.5^noExtra
    let newScale = Math.pow(1.5, state.noExtra);
    yesBtn.style.transform = `scale(${newScale})`;
    setGif("gif12.gif");

    // After 5 extra No clicks, remove the No button
    if (state.noExtra >= 5) {
      let noBtn = document.getElementById('no-button');
      if (noBtn) noBtn.style.display = "none";
    }
  }
}

// =============== HELPER FUNCTIONS ===============
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

// Replace the yes/no buttons with a "Continuar" button in the final yes step
function removeButtonsForFinalYes() {
  let buttonsDiv = document.querySelector('.buttons');
  buttonsDiv.innerHTML = `<button id="continue-btn" onclick="continueFinal()">Continuar</button>`;
}

// Final "Continuar" placeholder
function continueFinal() {
  alert("Final continue action placeholder.");
}
