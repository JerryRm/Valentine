const gifs = ['gifs/gif1.gif', 'gifs/gif2.gif', 'gifs/gif3.gif']; // Add your GIFs here

function showMessage(answer) {
    const response = document.getElementById('response');
    const gifContainer = document.getElementById('gif-container');

    if (answer === 'no') {
        response.textContent = "Aww... I'll still love you anyway. 💔";
        response.classList.remove('hidden');

        // Show a random GIF
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        gifContainer.innerHTML = `<img src="${randomGif}">`;
    } else {
        response.textContent = "Yay! I knew you'd say yes! 💖";
        response.classList.remove('hidden');
        gifContainer.innerHTML = ""; // Clear GIFs if she clicks Yes
    }
}
