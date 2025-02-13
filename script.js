// Global state variables for the yes and no sequences
let state = {
  yes: 0,    // 0: initial; 1: after first yes; 2: after second yes; 3: final yes state
  no: 0,     // 0 to 4 for the initial no states; then extra no clicks count separately
  noExtra: 0 // counts extra no clicks after state.no reaches 4
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
      // When main content shows, gif6 is already in the HTML (see below)
  }, 800);
}

// Called when the Yes button is clicked
function yesClick() {
  if (state.yes === 0) {
      // First Yes click:
      // Change the main text, response, and update button labels
      document.getElementById('main-text').innerText = "Estas segura mi amor?";
      document.getElementById('response').innerText = "Es que se que es una decicion un poco dificil...";
      document.getElementById('yes-button').innerText = "por supuesto";
      document.getElementById('no-button').innerText = "Mejor no";
      // Show gif16
      setGif("gif16.gif");
      state.yes = 1;
  } else if (state.yes === 1) {
      // Second Yes click:
      document.getElementById('main-text').innerText = "De verdaita?";
      document.getElementById('yes-button').innerText = "Si mi amor, de verdaita";
      // (No button remains as "Mejor no")
      setGif("gif2.gif");
      state.yes = 2;
  } else if (state.yes === 2) {
      // Third Yes click (final):
      document.getElementById('main-text').innerText = "Gracias mi amoooorrr";
      // Remove the yes/no buttons and replace with a "Continuar" button
      removeButtonsForFinalYes();
      // Play gif14 and gif7 at the same time
      setGifs(["gif14.gif", "gif7.gif"]);
      state.yes = 3;
  } else if (state.yes === 3) {
      // Already in final state—do nothing or wait for the continue action.
  }
}

// Called when the No button is clicked
function noClick() {
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
          state.noExtra = 0; // reset extra no clicks counter
      }
  } else if (state.no === 4) {
      // Extra No clicks beyond the fourth
      state.noExtra += 1;
      let yesBtn = document.getElementById('yes-button');
      // Increase the size of the Yes button with each extra No click (e.g., scale by 10% per click)
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

// Helper function to set a single GIF in the gif container
function setGif(filename) {
  let container = document.getElementById('gif-container');
  container.innerHTML = `<img src="gifs/${filename}" style="width:200px; animation: pop 0.5s ease;">`;
}

// Helper function to set multiple GIFs (side by side)
function setGifs(filenames) {
  let container = document.getElementById('gif-container');
  container.innerHTML = "";
  filenames.forEach(function(file) {
      container.innerHTML += `<img src="gifs/${file}" style="width:200px; margin: 5px; animation: pop 0.5s ease;">`;
  });
}

// Replace the yes/no buttons with a "Continuar" button in the final yes state
function removeButtonsForFinalYes() {
  let buttonsDiv = document.querySelector('.buttons');
  buttonsDiv.innerHTML = `<button id="continue-btn" onclick="continueFinal()">Continuar</button>`;
}

// Placeholder for the final continue action (you can update this later)
function continueFinal() {
  alert("Final continue action placeholder.");
}
