let size = 0;
let numberOfTiles = 0;
let highlighted = 0;
let level = 2;
let category = "";
let shuffled = false;
const removeText = "remove";
let timeToDisplay = "";
let buttonContainer = document.getElementById('tiles');
let hasJustWon = false;
let categoryContainer = document.getElementsByClassName("category-container")[0];
let levelContainer = document.getElementsByClassName("lvl-container")[0];

document.getElementById("go-back-btn").addEventListener("click", () => {
    document.location.reload();
});

document.getElementById("logout-btn").addEventListener("click", () => {
      document.location.replace("/login.html");
});

document.getElementById("rank-btn").addEventListener("click", () => {
    document.location.replace("/ranks.html");
});

document.getElementById("play-again-btn").addEventListener("click", () => {
    document.body.classList.remove("active-popup");
    restart();
});

document.getElementById("main-page-btn").addEventListener("click", () => {
    document.location.reload();
});

function toggleThemesAndLevels() {
    categoryContainer.classList.add(removeText);
    levelContainer.classList.remove(removeText);
}

document.getElementById("cats-btn").addEventListener("click", () => {
 toggleThemesAndLevels();
   category = "cats";
});

document.getElementById("cartoon-btn").addEventListener("click", () => {
    toggleThemesAndLevels();
    category = "cartoon";
 });

 document.getElementById("princess-btn").addEventListener("click", () => {
    toggleThemesAndLevels();
    category = "princess";
 });

 document.getElementById("book-couples-btn").addEventListener("click", () => {
    toggleThemesAndLevels();
    category = "book-couple";
 });

 document.getElementById("city-btn").addEventListener("click", () => {
    toggleThemesAndLevels();
    category = "city";
 });

document.getElementById("easy").addEventListener("click", () => {
    size = 3;
    level = 1;
    start();
});

document.getElementById("medium").addEventListener("click", () => {
    size = 4;
    level = 2;
    start();
});

document.getElementById("hard").addEventListener("click", () => {
    size = 5;
    level = 3;
    start();
});

document.getElementById("hint").addEventListener("click", () => {
   document.getElementById("hint-popup").classList.remove(removeText);
    document.getElementById("solved-popup").classList.add(removeText);
    document.getElementById("hint-img").src =  `/img/level${level}/${category}.jpg`;;
    document.body.classList.add("active-popup");
    seconds += 3;
});

document.getElementsByClassName("close-popup-btn")[0].addEventListener("click", () => {
    document.body.classList.remove("active-popup");
    document.getElementById("hint-popup").classList.add(removeText);
    document.getElementById("solved-popup").classList.remove(removeText);
});

function start() {
    numberOfTiles = size ** 2;
    highlighted = numberOfTiles;
    document.getElementsByClassName("lvl-container")[0].classList.add(removeText);
    buttonContainer.style.width = `${size * 100}px`;
    document.getElementById(`${category}-level${level}`).classList.remove(removeText);
    document.getElementsByClassName("game-board")[0].classList.remove(removeText);
    newGame();
}

function newGame() {
    loadTiles();
    setTimeout(() => {
        shuffle();
    }, 500);
}

function loadTiles() {
    for (let i = 1; i <= numberOfTiles; i++) {
        var newTile = document.createElement('div');
        newTile.id = `tile${i}`;
        newTile.setAttribute('index', i);
        newTile.innerHTML = i;
        newTile.style.backgroundImage = `url(/img/level${level}/${category}/${i}.jpg)`;
        newTile.classList.add('tile');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
            startTimer();
        });
        buttonContainer.append(newTile);
    }
    selectedTileId = 'tile' + highlighted;
    selectedTile = document.getElementById(selectedTileId);
    selectedTile.classList.add("selected");
}

function shuffle() {
    let minShuffles = 100;
    let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 6);
            let direction = 0;
            if (x == 0) {
                direction = highlighted + 1;
            } else if (x == 1) {
                direction = highlighted - 1;
            } else if (x == 2) {
                direction = highlighted + size;
            } else if (x == 3) {
                direction = highlighted - size;
            }
            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
        hasJustWon = false;
}

// Swap tiles 
function swap(clicked) {
    if (clicked < 1 || clicked > (numberOfTiles)) {
        return;
    }

    // Checking if we are trying to swap right
    if (clicked == highlighted + 1) {
        if (clicked % size != 1) {
            setSelected(clicked);
        }
        // Checking if we are trying to swap left
    } else if (clicked == highlighted - 1) {
        if (clicked % size != 0) {
            setSelected(clicked);
        }
        // Checking if we are trying to swap up
    } else if (clicked == highlighted + size) {
        setSelected(clicked);
        // Checking if we are trying to swap down 
    } else if (clicked == highlighted - size) {
        setSelected(clicked);
    }

    if (shuffled && !hasJustWon) {
        if (checkHasWon()) {
            document.body.classList.add("active-popup");
            timerElement.innerText = timeToDisplay;
            document.getElementById("player-time").innerHTML = timeToDisplay;
            hasJustWon = true;
            stop();
            shuffled = false;
        }
    }
}

function checkHasWon() {
    for (let i = 1; i <= numberOfTiles; i++) {
        currentTile = document.getElementById(`tile${i}`);
        currentTileIndex = currentTile.getAttribute('index');
        currentTileValue = currentTile.innerHTML;
        if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
            return false;
        }
    }
    return true;
}

// Applies stylings to the selected tile
function setSelected(index) {
    currentTile = document.getElementById(`tile${highlighted}`);
    currentTileText = currentTile.innerHTML;
    currentTile.classList.remove('selected');
    newTile = document.getElementById(`tile${index}`);
    currentTile.innerHTML = newTile.innerHTML;
    currentTile.style.backgroundImage = `url(/img/level${level}/${category}/${newTile.innerHTML}.jpg)`;
    newTile.innerHTML = currentTileText;
    newTile.style.backgroundImage = `url(/img/level${level}/${category}/${currentTile}.jpg)`;
    newTile.classList.add("selected");
    highlighted = index;
}

let showNumbersButton = document.getElementById("show-nums");
let areShown = false;
showNumbersButton.addEventListener("click", showNumbers);

function showNumbers() {
    let text = "";
    let color = "";
    if (areShown) {
        text = "Show";
        color = "transparent";
        areShown = false;
    }
    else {
        text = "Hide";
        color = "white"
        areShown = true;
    }
    showNumbersButton.innerHTML = `<span class="btn">${text} tile numbers</span>`;
    for (let i = 1; i <= numberOfTiles; i++) {
        document.getElementById(`tile${i}`).style.color = color;
    }
}

document.getElementById("restart-btn").addEventListener("click", restart);

function restart() {
    reset();
    shuffle();
}

// For the timer

const timerElement = document.querySelector('.timer .time');

let seconds = 0;
let interval = null;

// Update the timer
function timer() {
    seconds++;

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if (secs < 10) {
        secs = "0" + secs;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (hrs < 10) {
        hrs = "0" + hrs;
    }
    timeToDisplay = `${hrs}:${mins}:${secs}`;
    timerElement.innerText = timeToDisplay;
}

function startTimer() {
    if (interval) {
        return;
    }

    interval = setInterval(timer, 1000);
}

function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    seconds = 0;
    timeToDisplay = '00:00:00';
    timerElement.innerText = timeToDisplay;
    console.log("hj");
}