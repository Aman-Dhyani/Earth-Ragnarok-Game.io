let container = document.getElementById("container");
let thor = document.getElementById("thor");

// ------ IMPACT --------------------------------------
let impact = document.querySelector(".impact");
let impact2 = document.querySelector(".impact2");

// ------ EARTH MATERIAL --------------------------------------
let earth = document.querySelector("#earth");
let health = document.querySelector("#health");
let damage = 10;

//-------VIDEO -----------------------------------------------
let vid = document.querySelector(".vid");

//-------MUSIC -----------------------------------------------
let gameover = new Audio("music/gameover.m4a");
let theme = new Audio("music/thor_ragnarok_theme_song(128k).m4a");
let hammerSound = new Audio("music/mjoinir%20audio.m4a");
let explosion = new Audio("music/explosion.m4a");

//-------PLAY -----------------------------------------------
let play = document.querySelector("#play");

//------ display function()--------------------
function display() {
  play.classList.add("hide");
  theme.loop = true;
  theme.play();
  thor.classList.remove("hide");

  //--- calling main function--------------------
  mainGameFunction();
}

// ------------- THE MAIN FUNCTION -----------------------------------------
function mainGameFunction() {

  // -------- SCORE --------------------------------------------
  let highscore = localStorage.getItem("highscore")
  let scr = 0;

  let intrvl = setInterval(() => {
    scr = scr += 1
    score = document.querySelector("#score").innerHTML = "score:-" + scr

    if (scr > highscore) localStorage.setItem("highscore", scr)

  }, 1500);

  score = document.querySelector("#score").innerHTML = "score:-" + scr
  let HighScore = document.querySelector("#HighScore")
  HighScore.innerHTML = "highscore:- " + localStorage.getItem("highscore", scr)


  // ------------ GENERATE INVADERS ----------------------------------------------
  let generateinvaders = setInterval(() => {
    let btnRight = document.querySelector("#btnRight");
    let btnRightx = parseInt(getComputedStyle(btnRight).getPropertyValue("left"))
    let invader = document.createElement("div");
    invader.classList.add("invaders");
    invader.style.left = Math.floor(40 + (btnRightx + 20 - 40) * Math.random()) + "px";
    container.appendChild(invader);
  }, 1150);


  // --------- MOVING INVADERS DOWN------------------------------------------------
  let moveinvaders = setInterval(() => {
    let invaders = document.querySelectorAll(".invaders");

    invaders.forEach(invader => {
      let invaderbottom = parseInt(getComputedStyle(invader).getPropertyValue("bottom"));

      //------ CRASH EARTH GAMEOVER ----------------------------------------------
      if (invaderbottom < -90) {
        invader.classList.add("hide")
        health.value -= damage
        impact2.classList.remove("hide")

        setTimeout(() => impact2.classList.add("hide"), 50);
      }

      if (health.value == 0) {
        explosion.play();
        theme.pause();
        hammerSound.pause();
        vid.classList.remove("hide")

        setTimeout(() => clearInterval(generateinvaders), 1000);

        setTimeout(() => explosion = "null", 1500);

        setTimeout(() => gameover.play(), 4500);

        setTimeout(() => location.reload(), 6000);
      }
      invader.style.bottom = invaderbottom - 30 + "px";
    })
  }, 450);

  //--------------- mainGameFunction Over ------------------------------------
}

// ----- SHOOT Function Enable by Keyboard "w" And Screen Button "w" ----------------------
function shoot() {

  hammerSound.play();
  thor.style.animation = "throw 1s linear 1";

  setTimeout(() => thor.style.animation = "anime 0.2s linear infinite", 100);

  let thorx = parseInt(getComputedStyle(thor).getPropertyValue("left"));

  let hammer = document.createElement("div");
  container.appendChild(hammer);
  hammer.style.left = thorx + 50 + "px";
  hammer.classList.add("mjionir")

  setTimeout(() => container.removeChild(hammer), 850);

  setInterval(() => {

    let invaders = document.querySelectorAll(".invaders");
    invaders.forEach(invader => {

      let invaderProp = invader.getBoundingClientRect();
      let hammerProp = hammer.getBoundingClientRect();

      // -------- HAMMER & INVADERS COLLISONS -----------------------------------------
      if (hammerProp.left >= invaderProp.left &&
        hammerProp.right <= invaderProp.right &&
        hammerProp.top <= invaderProp.top &&
        hammerProp.bottom <= invaderProp.bottom) {

        explosion.play();
        impact.classList.remove("hide")

        setTimeout(() => {
          impact.classList.add("hide")
          container.removeChild(invader);
          hammer.classList.add("boom")
        }, 50);

        setTimeout(() => {
          hammer.classList.remove("boom")
          hammer.classList.add("boom2")
        }, 80);

        setTimeout(() => hammer.classList.add("hide"), 400);
      }
    })
  });
}

// ----- Going LeftMOVE FOR SMALL DEVICE'S --------------------------- 
function leftMove() {
  let thorx = parseInt(getComputedStyle(thor).getPropertyValue("left"));
  thor.style.left = thorx - 30 + "px";

  if (thorx < 10) thor.style.left = thorx + "px";
}

// ----- Going RightMOVE FOR SMALL DEVICE'S --------------------------- 
function rightMove() {
  let thorx = parseInt(getComputedStyle(thor).getPropertyValue("left"));
  thor.style.left = thorx + 30 + "px";

  if (thorx > 300) thor.style.left = thorx + "px";
}

// ----- Going Left By Keyboard "a" And Screen Button "a" --------------------------- 
function left() {
  let thorx = parseInt(getComputedStyle(thor).getPropertyValue("left"));
  thor.style.left = thorx - 110 + "px";

  if (thorx < 10) thor.style.left = thorx + "px";
}

// ----- Going Right By Keyboard "w" And Screen Button "w" --------------------------- 
function right() {
  let thorx = parseInt(getComputedStyle(thor).getPropertyValue("left"));
  thor.style.left = thorx + 110 + "px";

  if (thorx > 1100) thor.style.left = thorx + "px";
}

//-- thor CONTROLS------------------------------------------------
addEventListener("keydown", (e) => {

  //-- thor LEFT MOVE --------------------------------------------
  if (e.key == "a") left();

  //-- thor RIGHT MOVE -------------------------------------------
  if (e.key == "d") right();

  // --------- CREATING HAMMER WHEN 'W' IS PRESSED------------------------------------------
  if (e.key == "w") shoot();

});
