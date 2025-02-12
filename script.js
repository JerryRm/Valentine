const gifs = ['gifs/gif1.gif', 'gifs/gif2.gif', 'gifs/gif3.gif']; // Add your GIFs here

function startValentine() {
    document.getElementById('welcome-screen').style.animation = "fadeOut 1s ease-in-out";
    setTimeout(() => {
        document.getElementById('welcome-screen').style.display = "none";
        document.getElementById('main-content').classList.remove('hidden');
    }, 900); // Hides after fade effect
}

function showMessage(answer) {
    const response = document.getElementById('response');
    const gifContainer = document.getElementById('gif-container');

    if (answer === 'no') {
        response.textContent = "Aww... I'll still love you anyway. 💔";
        response.classList.remove('hidden');

        // Show a random GIF
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        gifContainer.innerHTML = `<img src="${randomGif}" style="width: 200px; height: auto; animation: pop 0.5s ease;">`;
    } else {
        response.textContent = "Yay! I knew you'd say yes! 💖";
        response.classList.remove('hidden');
        gifContainer.innerHTML = ""; // Clear GIFs if she clicks Yes
    }
}
function startValentine() {
    let welcomeScreen = document.getElementById('welcome-screen');
    let mainContent = document.getElementById('main-content');

    // Add fade-out effect
    welcomeScreen.style.opacity = "0";  
    welcomeScreen.style.transition = "opacity 0.8s ease-out";

    setTimeout(() => {
        welcomeScreen.style.display = "none"; // Hide the intro
        mainContent.classList.remove('hidden'); // Show main content
    }, 800); // Wait for fade effect to complete
}
