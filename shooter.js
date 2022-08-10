let container = document.querySelector("#container");
let CaptainAmerica = document.querySelector(".CaptainAmerica");
let IronMan = document.querySelector(".IronMan");
let health1 = document.querySelector("#health1");
let health2 = document.querySelector("#health2");
let impact = document.querySelector(".impact");
let bar1 = document.querySelector("#bar1");
let bar2 = document.querySelector("#bar2");
let damage = 5;
let moreDamage = 10;

// --- MUSIC ----------------------------------
let music = new Audio("music/music.m4a");
let gameover = new Audio("music/gameover.m4a");
let capPunch = new Audio("music/cap-punch.m4a");
let ironmanPunch = new Audio("music/iron-punch.m4a");
let capThrowShield = new Audio("music/cap-throw%20shield.m4a");
let ironmanBeam = new Audio("music/iron-beam.m4a");
let ironmanTargetLocked = new Audio("music/iron-targetLocked.m4a");
let ironmanWarning = new Audio("music/iron-warning.m4a");
let capDialogue = new Audio("music/cap-dialogue.m4a");
let ironmanDialogue = new Audio("music/iron-win.m4a");

//--------------- Display function ---------------------
function display() {
    music.loop = true
    music.play();
    play.classList.add("hide");
    CaptainAmerica.classList.remove("hide");
    IronMan.classList.remove("hide");

    // ----- buttons ------------------
    let p1btns = document.querySelectorAll(".p1btns")

    p1btns.forEach(p1btn => {
        p1btn.classList.remove("hide")
    })

    //--- calling main function--------------------
    window.requestAnimationFrame(mainGameFunction);
}

// ------------------- CaptainAmerica CONTROLS - (KEYBOARD) ------------------
document.addEventListener('keydown', (e) => {

    //-- RIGHT MOVE -----------------------------------
    if (e.key == "d") moveRight();

    //-- LEFT MOVE ------------------------------------
    if (e.key == "a") moveLeft();

    //-- JUMP -----------------------------------------
    if (e.key == "w") Jump();

    //-- PUNCH ----------------------------------------
    if (e.key == "s") p1punch();

    // ------- THROW SHIELD ---------------------------
    if (e.key == 'f') throwShield();

})

// ----------- CaptainAmerica CONTROLS -- (SCREEN BUTTONS) ------------------------

// --------------- moveRight() --------------
function moveRight() {

    CaptainAmerica.classList.add("walkAnime");
    let capX = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
    let ironManX = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));

    if (capX < ironManX - 180) {
        CaptainAmerica.style.left = capX + 60 + "px";
    }

    setTimeout(() => {
        CaptainAmerica.classList.remove("walkAnime");
    }, 100);
}

// -------------- moveLeft() -------------------
function moveLeft() {

    CaptainAmerica.classList.add("walkAnime");
    let capX = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
    CaptainAmerica.style.left = capX - 60 + "px";

    if (capX < 30) {
        CaptainAmerica.style.left = capX + "px";
    }

    setTimeout(() => {
        CaptainAmerica.classList.remove("walkAnime");
    }, 100);
}

// -------------- Jump() --------------------
function Jump() {

    CaptainAmerica.classList.add("jump1");

    setTimeout(() => {
        CaptainAmerica.classList.remove("jump1");
    }, 500);
}

// --------------  p1punch() --------------------
function p1punch() {

    CaptainAmerica.classList.add("punchAnime");
    let capX = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
    let capY = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("top"));

    let punch = document.createElement("div");
    container.appendChild(punch);

    punch.style.left = capX + 80 + "px";
    punch.style.top = capY + 30 + "px";
    punch.classList.add("punch");

    setTimeout(() => {
        container.removeChild(punch);
        CaptainAmerica.classList.remove("punchAnime");
    }, 200);
}


//--------------- throwShield() ----------------
function throwShield() {
    if (bar1.value == 50) {
        capThrowShield.play();
        CaptainAmerica.classList.add("shoot1");
        let capX = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
        let capY = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("top"));

        let shield = document.createElement("div");
        container.appendChild(shield);
        shield.classList.add("shield");
        shield.style.left = capX + "px";
        shield.style.top = capY + 50 + "px";

        setInterval(() => {
            shield.style.left = capX + 1000 + "px";
        }, 10);

        setInterval(() => {
            container.removeChild(shield);
        }, 1000);

        bar1.value = 0;
    }
}

// ------------- THE MAIN FUNCTION -----------------------------------------
function mainGameFunction() {

    // =============== IronMan(IRONMAN) AUTOMATIC CONTROLS ==========================
    let intrvl = setInterval(() => {
        let a = Math.ceil(5 * Math.random());
        // console.log(a);

        //-- IronMan RIGHT MOVE -----------------------------------------
        if (a == 1) {

            let ironManX = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
            IronMan.style.left = ironManX + 60 + "px";

            if (ironManX > 820) {
                IronMan.style.left = ironManX + "px";
            }
        }

        //-- IronMan LEFT MOVE -----------------------------------------
        else if (a == 2) {

            let ironManX = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
            let capX = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
            IronMan.classList.add("ironAnime");

            if (ironManX > capX + 170) {
                IronMan.style.left = ironManX - 60 + "px";
            }
        }

        //-- IronMan LEFT PUNCH -----------------------------------------
        else if (a == 3) {

            IronMan.classList.add("ironPunch");
            let ironManX = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
            let ironManY = parseInt(window.getComputedStyle(IronMan).getPropertyValue("top"));

            let punch2 = document.createElement("div");
            container.appendChild(punch2);
            IronMan.style.left = ironManX - 20 + "px";
            punch2.style.left = ironManX - 120 + "px";
            punch2.style.top = ironManY + 10 + "px";
            punch2.classList.add("punch2");

            setTimeout(() => {
                container.removeChild(punch2);
                IronMan.classList.remove("ironPunch");
            }, 200);
        }

        //--- IronMan shootBeam ----------------------------------------------
        if (bar2.value == 50) {
            ironmanTargetLocked.play();
            if (a == 4) {
                ironmanBeam.play();
                IronMan.classList.add("shoot2");
                let ironManX = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
                let ironManY = parseInt(window.getComputedStyle(IronMan).getPropertyValue("top"));
                let ironmanLaser = document.createElement("div");
                container.appendChild(ironmanLaser);
                ironmanLaser.classList.add("ironmanLaser");

                ironmanLaser.style.left = ironManX + "px";
                ironmanLaser.style.top = ironManY + 50 + "px";

                setInterval(() => {
                    ironmanLaser.style.left = ironManX - 1050 + "px";
                }, 10);

                setInterval(() => {
                    container.removeChild(ironmanLaser);
                }, 1000);

                bar2.value = 0
            }
        }

        //---- IronMan JUMP ----------------------------------------
        if (a == 5) {
            IronMan.classList.add("jump2");

            setTimeout(() => {
                IronMan.classList.remove("jump2");
            }, 800);
        }
    }, 300);

    //=============================== PUNcH COLLLISON ==========================
    //------------------ WHEN IronMan GET PUNCHED ----------------------------------------
    setInterval(() => {

        let punch = document.querySelector(".punch");

        let ironManX = parseInt(window.getComputedStyle(IronMan, null).getPropertyValue('left'));
        let ironManY = parseInt(window.getComputedStyle(IronMan, null).getPropertyValue('top'));
        let capPunchX = parseInt(window.getComputedStyle(punch, null).getPropertyValue('left'));
        let capPunchY = parseInt(window.getComputedStyle(punch, null).getPropertyValue('top'));

        offsetX = Math.abs(ironManX - capPunchX);
        offsetY = Math.abs(ironManY - capPunchY);

        if (offsetX < 170 && offsetX > 30 && offsetY < 100) {

            capPunch.play()
            impact.classList.remove("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);

            IronMan.style.left = ironManX + 20 + "px";
            health2.value -= damage;
            punch.play()
        }
    }, 100);


    // ---------- WHEN CaptainAmerica GET PUNCHED ----------------------------------------
    setInterval(() => {
        let punch2 = document.querySelector(".punch2");

        let capX = parseInt(window.getComputedStyle(CaptainAmerica, null).getPropertyValue('left'));
        let capY = parseInt(window.getComputedStyle(CaptainAmerica, null).getPropertyValue('top'));
        let ironmanPunchX = parseInt(window.getComputedStyle(punch2, null).getPropertyValue('left'));
        let ironmanPunchY = parseInt(window.getComputedStyle(punch2, null).getPropertyValue('top'));

        offsetX = Math.abs(capX - ironmanPunchX);
        offsetY = Math.abs(capY - ironmanPunchY);

        // console.log(offsetX, offsetY)
        if (offsetX < 100 && offsetY < 100) {

            if (health1.value <= 30 && health1.value >= 25) {
                ironmanWarning.play();

                setTimeout(() => {
                    ironmanWarning.pause();
                }, 2000);
            }

            ironmanPunch.play();
            impact.classList.remove("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);

            CaptainAmerica.style.left = capX - 20 + "px";
            health1.value -= damage;
            punch.play();
        }
    }, 100);


    /// -------SHIELD COLLISON ------------------------------------------------
    setInterval(() => {
        let shield = document.querySelector(".shield");

        let shieldX = parseInt(window.getComputedStyle(shield).getPropertyValue("left"));
        let shieldY = parseInt(window.getComputedStyle(shield).getPropertyValue("top"));

        let ironManX = parseInt(window.getComputedStyle(IronMan).getPropertyValue("left"));
        let ironManY = parseInt(window.getComputedStyle(IronMan).getPropertyValue("top"));

        offsetX = Math.abs(shieldX - ironManX);
        offsetY = Math.abs(shieldY - ironManY);

        if (offsetX < 50 && offsetY < 100) {
            ironmanPunch.play();

            setTimeout(() => {
                health2.value -= moreDamage;
            }, 10);

            shield.classList.add("hide");
            impact.classList.remove("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);
        }
    }, 10);


    /// ------- IRONMAN LASER COLLISON ------------------------------------------------
    setInterval(() => {
        let ironmanLaser = document.querySelector(".ironmanLaser");

        let laserX = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("left"));
        let laserY = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("top"));

        let capX = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("left"));
        let capY = parseInt(window.getComputedStyle(CaptainAmerica).getPropertyValue("top"));

        offsetX = Math.abs(laserX - capX);
        offsetY = Math.abs(laserY - capY);

        if (offsetX < 50 && offsetY < 80) {

            capPunch.play();

            setTimeout(() => {
                health1.value -= moreDamage;
            }, 10);

            ironmanLaser.classList.add("hide");
            impact.classList.remove("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);
        }
    }, 10);

    /// ------- PROJECTILES COLLISONS(SHIELD & LASER) ------------------------------------------------
    setInterval(() => {
        let shield = document.querySelector(".shield");
        let ironmanLaser = document.querySelector(".ironmanLaser");

        let shieldX = parseInt(window.getComputedStyle(shield).getPropertyValue("left"));
        let shieldY = parseInt(window.getComputedStyle(shield).getPropertyValue("top"));

        let laserX = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("left"));
        let laserY = parseInt(window.getComputedStyle(ironmanLaser).getPropertyValue("top"));

        offsetX = Math.abs(shieldX - laserX);
        offsetY = Math.abs(shieldY - laserY);

        if (offsetX < 100 && offsetY < 100) {
            capThrowShield.play();
            ironmanPunch.play();
            impact.classList.remove("hide");
            shield.classList.add("hide");
            ironmanLaser.classList.add("hide");

            setTimeout(() => {
                impact.classList.add("hide");
            }, 100);
        }
    }, 10);


    //------------ WIN & LOSE ---------------------------------
    setInterval(() => {

        //---------- CaptainAmerica WIN (CAPTAIN AMERICA)--------------------------
        if (health2.value == 0) {
            IronMan.classList.add("hide");
            music.pause();
            gameover.play();
            capDialogue.play();
            clearInterval(intrvl);
            win = "cap"
        }

        //---------- IronMan WIN (IRON-MAN)--------------------------
        if (health1.value == 0) {
            CaptainAmerica.classList.add("hide");
            gameover.play();
            music.pause();
            ironmanDialogue.play();
            clearInterval(intrvl);

            setTimeout(() => {
                gameover.pause();
            }, 1200);

            win = "ironman"
        }
    }, 100);

    // ---------------------- TIMEOUTS ---------------------------------------------
    setInterval(() => {
        CaptainAmerica.classList.remove("shoot1");
        IronMan.classList.remove("shoot2");
    }, 1000);

    // ---- TIMEOUTS ---------------------------------------
    setInterval(() => {
        CaptainAmerica.classList.remove("jump");
        IronMan.classList.remove("jump");
    }, 1000);

    // ---- full weapon bar ---------------------------------
    setInterval(() => {
        bar1.value += 5;
        bar2.value += 5;
    }, 700);

}//--- Main Function Ends ----------------------------

//------------ Window Reload -----------------------
setInterval(() => {
    if (win == "cap") {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    if (win == "ironman") {
        setTimeout(() => {
            window.location.reload();
        }, 3300);
    }
}, 100);
