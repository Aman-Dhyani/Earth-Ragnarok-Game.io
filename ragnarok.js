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
let scoreCount = 0;
let score = document.querySelector(".scores")
score.innerHTML = "score:- " + scoreCount
let HighScore = document.querySelector(".high-scores")
let savedScores = localStorage.getItem("savedScores")
let scoresCont = document.querySelector(".scores-cont")

// about ufo
let speedOfUfo = 1

// Offsets
let gameAreaOffset
let thorOffsets
let thorNewCoords
let ufoOffsets

// let scoreBoxOffsets
let gameAreaContainerOffsets = gameAreaContainer.getBoundingClientRect()
scoresCont.style.width = gameAreaContainerOffsets.width + "px"

// let shoot variable
let letShoot = true

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

// obstacles
let ufos

// onload
window.onload = () => {
    /* ---- Events ---- */
    // For shooting hammer  --- key
    window.addEventListener("keydown", handleShoot, true);

    // For Moving Thor  ------- input
    thorNavigator.addEventListener('input', e => {
        earth.style.transform = `rotate(${parseInt(- e.target.value / 8)}deg)`
        thorNewCoords = parseInt(e.target.value) - 175 + "px"
        thor.style.left = thorNewCoords
    })

    // For Starting Game ------ click
    window.addEventListener("click", (e) => {
        if (e.target.className.includes('start-game')) startTheGame()
    })

    /* ---- Functions ---- */
    function handleShoot(e) {
        if (e.code == "Space") readyToShoot();
    }

    // Ready To Shoot
    const readyToShoot = () => {
        if (letShoot === true) shoot()
    }

    // statr game
    const startTheGame = () => {
        gameAudio.play()
        playBtn.classList.add("hide")
        document.querySelector(".tut").classList.add("hide")

        // ufo move
        ufosMoveAnime()
        DetectTheCollison = setInterval(CollisonDetector, 100);
        createUFOsInterval = setInterval(createUfos, 1200);
    }

    // Shoot
    const shoot = () => {
        letShoot = false

        mjolnirAudio.play()
        thor.classList.replace("thor-levitating", "thor-shooting")
        mjolnir.classList.remove("hide")

        thorOffsets = thor.getBoundingClientRect()
        mjolnirAnime(thorOffsets);
    }

    // mjolnir/Thor's hammer Move --- Up
    const mjolnirAnime = (thorOffsets) => {
        mjolnir.style.top = thorOffsets.top + "px"
        thorOffsets = thor.getBoundingClientRect()
        mjolnirOffsets = mjolnir.getBoundingClientRect()

        mjolnir.style.left = thorOffsets.left + 50 + "px"
        mjolnir.style.top = mjolnirOffsets.top - 10 + "px"

        if (mjolnirOffsets.bottom < 50) {
            metalEffect.play()
            mjolnir.classList.add("rotatedMjolnir")
            cancelAnimationFrame(mjolnirAnime)
            mjolnirMoveDown()
        }

        else requestAnimationFrame(mjolnirAnime)
    }

    // mjolnir/Thor's hammer Move --- Down
    const mjolnirMoveDown = () => {
        thorOffsets = thor.getBoundingClientRect()
        mjolnirOffsets = mjolnir.getBoundingClientRect()

        mjolnir.style.left = thorOffsets.left + 50 + "px"
        mjolnir.style.top = mjolnirOffsets.top + 9 + "px"

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
        scoreBoxOffsets = scoresCont.getBoundingClientRect()
        const ufo = document.createElement("div")
        const min = scoreBoxOffsets.left - 10
        const max = scoreBoxOffsets.right - 85

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
                shockEffect.currentTime = 0
                explodeEffect.currentTime = 0
                shockEffect.play()
                explodeEffect.play()
                mjolnir.classList.add("mjolnirAnime")
                gameAreaContainer.removeChild(u)
                countingScores();

                // making game hard
                if (score > 20) speedOfUfo = 5;
                setTimeout(() => mjolnir.classList.remove("mjolnirAnime"), 200);
            }

            else if (gameAudio.currentTime >= 140) {
                gameAudio.currentTime = 0
                gameAudio.play()
            }

            // Game Over
            else if (uOffset.top > 650) {
                window.removeEventListener("keydown", handleShoot, true);
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

    // count scores for a second
    function countingScores() {
        scoreCount = scoreCount += 1
        score.innerHTML = "score:- " + scoreCount

        if (scoreCount > savedScores) {
            localStorage.setItem("savedScores", scoreCount)
            HighScore.innerHTML = "highscore:- " + localStorage.getItem("savedScores")
        }
    }

    // SCORES
    if (localStorage.getItem("savedScores"))
        HighScore.innerHTML = "highscore:- " + localStorage.getItem("savedScores")
    else HighScore.innerHTML = "highscore:- " + 0
}
