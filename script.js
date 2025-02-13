// Global state variables for the yes and no sequences
let state = {
  yes: 0,    // 0: initial; 1: after first yes; 2: after second yes; 3: final yes
  no: 0,     // tracks no sequence from 0 to 4
  noExtra: 0 // extra no clicks after state.no reaches 4
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
    // gif6 is already displayed as part of the main content
  }, 800);
}

// Called when the Yes button is clicked
function yesClick() {
  // Force-clear any existing GIF immediately
  clearGif();

  if (state.yes === 0) {
    // First Yes click
    document.getElementById('main-text').innerText = "Estas segura mi amor?";
    document.getElementById('response').innerText = "Es que se que es una decicion un poco dificil...";
    document.getElementById('yes-button').innerText = "por supuesto";
    document.getElementById('no-button').innerText = "Mejor no";
    setGif("gif16.gif");  // This will now play gif16…
    state.yes = 1;
  } else if (state.yes === 1) {
    // Second Yes click: clear out gif16 and replace with gif2
    document.getElementById('main-text').innerText = "De verdaita?";
    document.getElementById('yes-button').innerText = "Si mi amor, de verdaita";
    setGif("gif2.gif");
    state.yes = 2;
  } else if (state.yes === 2) {
    // Third Yes click: clear out previous gif, remove buttons, show gif14 and gif7
    document.getElementById('main-text').innerText = "Gracias mi amoooorrr";
    removeButtonsForFinalYes();
    setGifs(["gif14.gif", "gif7.gif"]);
    state.yes = 3;
  } else if (state.yes === 3) {
    // Final state – waiting for final continue action.
  }
}

// Called when the No button is clicked
function noClick() {
  // Force-clear any existing GIF immediately
  clearGif();

  if (state.no < 4) {
    if (state.no === 0) {
      document.getElementById('main-text').innerText = "Por favor no me hagas esto";
      document.getElementById('yes-button').innerText = "Mentira, si quiero";
      document.getElementById('no-button').innerText = "Es que no quiero";
      document.getElementById('response').innerText = "Cooooomo?";
      setGif("gif18.gif");
      state.no = 1;
    } else if (state.no === 1) {
      document.getElementById('main-text').innerText = "Lo estas haciendo a proposito, di que siii";
      document.getElementById('yes-button').innerText = "Esta bien mi amor";
      document.getElementById('no-button').innerText = "No quiero y ya";
      setGif("gif17.gif");
      state.no = 2;
    } else if (state.no === 2) {
      document.getElementById('main-text').innerText = "Anda vale";
      document.getElementById('yes-button').innerText = "Pleaseee";
      document.getElementById('no-button').innerText = "Sigo diciendo que no";
      setGif("gif19.gif");
      state.no = 3;
    } else if (state.no === 3) {
      document.getElementById('main-text').innerText = "Sigue diciendo que no para que tu veas";
      document.getElementById('yes-button').innerText = "Me rindo, si quiero";
      document.getElementById('no-button').innerText = "No";
      setGif("gif20.gif");
      state.no = 4;
      state.noExtra = 0; // Reset extra no clicks counter
    }
  } else if (state.no === 4) {
    // Extra no clicks beyond the fourth
    state.noExtra += 1;
    let yesBtn = document.getElementById('yes-button');
    // Increase the size of the Yes button with each extra No click
    let newScale = 1 + (state.noExtra * 0.1);
    yesBtn.style.transform = `scale(${newScale})`;
    setGif("gif12.gif");

    // After 5 extra no clicks, remove the No button entirely
    if (state.noExtra >= 5) {
      let noBtn = document.getElementById('no-button');
      if (noBtn) noBtn.style.display = "none";
    }
  }
}

// Helper function: force-remove all children from the gif container
function clearGif() {
  let container = document.getElementById('gif-container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// Helper function: set a single GIF in the gif container
function setGif(filename) {
  let container = document.getElementById('gif-container');
  container.innerHTML = `<img src="gifs/${filename}" alt="gif" style="width:200px; animation: pop 0.5s ease;">`;
}

// Helper function: set multiple GIFs side by side
function setGifs(filenames) {
  let container = document.getElementById('gif-container');
  container.innerHTML = "";
  filenames.forEach(file => {
    container.innerHTML += `<img src="gifs/${file}" alt="gif" style="width:200px; margin:5px; animation: pop 0.5s ease;">`;
  });
}

// Replace the yes/no buttons with a "Continuar" button in the final yes state
function removeButtonsForFinalYes() {
  let buttonsDiv = document.querySelector('.buttons');
  buttonsDiv.innerHTML = `<button id="continue-btn" onclick="continueFinal()">Continuar</button>`;
}

// Final "Continuar" placeholder
function continueFinal() {
  alert("Final continue action placeholder.");
}
