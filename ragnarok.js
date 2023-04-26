// Characters And Objects
const gameAreaContainer = document.querySelector(".game-area-container")
const space = document.querySelector(".space")
const playBtn = document.querySelector(".play-btn")
const thor = document.querySelector("#thor")
const mjolnir = document.querySelector("#mjolnir")
const thorNavigator = document.querySelector(".navigator")
const lastVideo = document.querySelector(".last-video");
const earth = document.querySelector(".earth")

// Scores
const scoreBox = document.querySelector("#score-box")
const highScoreBox = document.querySelector("#high-score-box")
let score = 0

// about ufo
let speedOfUfo = 1

// Offsets
let gameAreaOffset
let thorOffsets
let thorNewCoords
let ufoOffsets
let scoreBoxOffsets
let gameAreaContainerOffsets = gameAreaContainer.getBoundingClientRect()
scoreBox.style.width = gameAreaContainerOffsets.width - 140 + "px"

// let shoot variable
let letShoot = true
let uCanTouch = false

// Intervals
let DetectTheCollison
let createUFOsInterval

// Music & Audios
const metalEffect = new Audio('music/metal hit.mp3')
const mjolnirAudio = new Audio('music/mjoinir audio.m4a')
const shockEffect = new Audio('music/shock.wav')
const explodeEffect = new Audio('music/explosion.m4a')
const gameAudio = new Audio('music/thor_ragnarok_theme_song(128k).m4a')
const gameover = new Audio('music/gameover.m4a')

let ufos

/* ======= Events ====== */
/* ======= Events ====== */
// For Phones ----- touch
window.addEventListener("touchstart", e => {
    if (uCanTouch === true && e.target === space || e.target === thor) readyToShoot()
})

// For PC ------ KeyBoard
window.addEventListener("keydown", e => {
    if (e.code == "Space") readyToShoot()
})

// For Moving Thor ----- Input
thorNavigator.addEventListener('input', e => {
    thorNewCoords = parseInt(e.target.value) - 175 + "px"
    thor.style.left = thorNewCoords
    earth.style.transform = `rotate(${parseInt(- e.target.value/8)}deg)`
})

// For Starting Game ----- Click
window.addEventListener("click", (e) => {
    if (e.target.className.includes('start-game')) startTheGame()
})

/* ======= Functions ====== */
/* ======= Functions ====== */
const startTheGame = () => {
    uCanTouch = true
    gameAudio.play()
    playBtn.classList.add("hide")
    document.querySelector(".tut").classList.add("hide")
    scoreBox.innerText = "score" + " " + score

    if (localStorage.getItem("topScores")) highScoreBox.innerText = "highScore" + " " + localStorage.getItem("topScores")
    else highScoreBox.innerText = "highScore" + " " + score;

    ufosMoveAnime()
    DetectTheCollison = setInterval(CollisonDetector, 100);
    createUFOsInterval = setInterval(createUfos, 1200);
}

// Ready To Shoot
const readyToShoot = () => {
    if (letShoot === true) shoot()
}

// Shoot
const shoot = () => {
    letShoot = false
    thorOffsets = thor.getBoundingClientRect()

    mjolnirAudio.play()
    thor.classList.replace("thor-levitating", "thor-shooting")
    mjolnir.classList.remove("hide")
    mjolnirAnime(thorOffsets);
}

// mjolnir/Thor's hammer Animation
const mjolnirAnime = (thorOffsets) => {
    mjolnir.style.top = thorOffsets.top + "px"
    mjolnirMoveUp()
}

// mjolnir/Thor's hammer Move --- Up
const mjolnirMoveUp = () => {
    thorOffsets = thor.getBoundingClientRect()
    mjolnirOffsets = mjolnir.getBoundingClientRect()

    mjolnir.style.left = thorOffsets.left + 50 + "px"
    mjolnir.style.top = mjolnirOffsets.top - 15 + "px"

    if (mjolnirOffsets.bottom < 50) {
        metalEffect.play()
        mjolnir.classList.add("rotatedMjolnir")
        cancelAnimationFrame(mjolnirMoveUp)
        mjolnirMoveDown()
    }

    else requestAnimationFrame(mjolnirMoveUp)
}

// mjolnir/Thor's hammer Move --- Down
const mjolnirMoveDown = () => {
    thorOffsets = thor.getBoundingClientRect()
    mjolnirOffsets = mjolnir.getBoundingClientRect()

    mjolnir.style.left = thorOffsets.left + 50 + "px"
    mjolnir.style.top = mjolnirOffsets.top + 15 + "px"

    if (mjolnirOffsets.top > thorOffsets.top) {
        cancelAnimationFrame(mjolnirMoveDown)
        thor.classList.replace("thor-shooting", "thor-levitating")
        mjolnir.classList.replace("rotatedMjolnir", "hide")
        letShoot = true
    }

    else requestAnimationFrame(mjolnirMoveDown)
}

// ufo Creating 
const createUfos = () => {
    scoreBoxOffsets = scoreBox.getBoundingClientRect()

    const ufo = document.createElement("div")
    const min = scoreBoxOffsets.left - 10
    const max = scoreBoxOffsets.right + 50

    ufo.id = "ufo"
    ufo.className = "ufos"
    ufo.classList.add("flexer")
    ufo.innerHTML = `<div id="ufo-top" class="flexer">👾</div> <div id="ufo-bottom"></div>`
    ufo.style.left = Math.floor(Math.random() * (max - min + 1)) + min + "px";
    ufo.style.top = -100 + "px"
    gameAreaContainer.appendChild(ufo)
}


// ufo Moving
const ufosMoveAnime = () => {
    ufos = document.querySelectorAll(".ufos")
    let uTop

    ufos.forEach(u => {
        uTop = parseInt(getComputedStyle(u).getPropertyValue("top"))
        u.style.top = uTop + speedOfUfo + "px"

        if (uTop > 680) gameAreaContainer.removeChild(u)
    })

    requestAnimationFrame(ufosMoveAnime);
}


// Detecting Collison
const CollisonDetector = () => {
    ufos = document.querySelectorAll(".ufos")

    ufos.forEach(u => {
        let uOffset = u.getBoundingClientRect();
        let mjolnirOffset = mjolnir.getBoundingClientRect();

        if (mjolnirOffset.x < uOffset.x + uOffset.width &&
            mjolnirOffset.x + mjolnirOffset.width > uOffset.x &&
            mjolnirOffset.y < uOffset.y + uOffset.height &&
            mjolnirOffset.height + mjolnirOffset.y > uOffset.y && uOffset.top < 550) {
            score = score + 1
            scoreBox.innerText = "score" + " " + score
            shockEffect.currentTime = 0
            explodeEffect.currentTime = 0
            shockEffect.play()
            explodeEffect.play()
            mjolnir.classList.add("mjolnirAnime")
            gameAreaContainer.removeChild(u)

            if (localStorage.getItem("topScores")) {
                if (score > parseInt(localStorage.getItem("topScores"))) localStorage.setItem("topScores", score)
                highScoreBox.innerText = "highScore" + " " + localStorage.getItem("topScores")
            }
            else highScoreBox.innerText = "highScore" + " " + score;

            // making game hard
            if (score > 20) speedOfUfo = 5

            setTimeout(() => mjolnir.classList.remove("mjolnirAnime"), 200);
        }

        else if (gameAudio.currentTime >= 140) {
            gameAudio.currentTime = 0
            gameAudio.play()
        }

        // Game Over
        else if (uOffset.top > 650) {
            localStorage.setItem("topScores", score)
            gameAreaContainer.removeChild(u)
            cancelAnimationFrame(ufosMoveAnime);
            lastVideo.classList.remove("hide")
            gameAudio.pause()
            explodeEffect.play()

            clearInterval(DetectTheCollison)
            clearInterval(createUFOsInterval)
            setTimeout(() => gameover.play(), 4000);
            setTimeout(() => window.location.reload(), 5500);
        }
    })
}
