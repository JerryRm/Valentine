document.addEventListener("DOMContentLoaded", function () {
    let welcomeScreen = document.getElementById('welcome-screen');
    let mainContent = document.getElementById('main-content');
    let noButton = document.getElementById('no-button');
    let gifContainer = document.getElementById('gif-container');
    let gifs = ["gif1.gif", "gif2.gif", "gif3.gif"]; // Add all your GIF names here
    let gifIndex = 0;

    // Function to start the main page
    window.startValentine = function () {
        welcomeScreen.style.opacity = "0";  
        welcomeScreen.style.transition = "opacity 0.8s ease-out";

        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContent.classList.remove('hidden');
        }, 800);
    };

    // Function to show a GIF when clicking "No"
    noButton.addEventListener("click", function () {
        if (gifIndex < gifs.length) {
            let gif = document.createElement("img");
            gif.src = `gifs/${gifs[gifIndex]}`;
            gif.classList.add("gif-animation"); // Add a class for styling
            gifContainer.appendChild(gif);
            gifIndex++;
        }
    });
});
