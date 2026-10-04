/* =========================================
   GROWING UP: CHARACTER QUEST
   INTERACTION SYSTEM
========================================= */


/* -----------------------------------------
   CHARACTER DATA
----------------------------------------- */

const characterData = {

    hair: null,
    clothes: null,
    personality: null,
    activity: null

};


/* -----------------------------------------
   PAGE NAVIGATION
----------------------------------------- */

const pages = [
    "home",
    "creator",
    "reading",
    "listening",
    "grammar",
    "writing",
    "speaking"
];


const progressValues = {

    home: 0,
    creator: 15,
    reading: 30,
    listening: 45,
    grammar: 60,
    writing: 75,
    speaking: 90

};


function showPage(pageName) {

    document.querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active-page");

        });


    const selectedPage =
        document.getElementById(pageName);


    if (!selectedPage) return;


    selectedPage.classList.add("active-page");


    updateProgress(pageName);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* -----------------------------------------
   PROGRESS BAR
----------------------------------------- */

function updateProgress(pageName) {

    const progress =
        progressValues[pageName] ?? 0;


    document.getElementById(
        "progress-fill"
    ).style.width = `${progress}%`;


    const labels = {

        home: "Quest Start",

        creator: "Mission 1: Character",

        reading: "Mission 2: Reading",

        listening: "Mission 3: Listening",

        grammar: "Mission 4: Grammar",

        writing: "Mission 5: Writing",

        speaking: "Mission 6: Speaking"

    };


    document.getElementById(
        "progress-text"
    ).textContent =
        labels[pageName] || "Character Quest";

}


/* -----------------------------------------
   CHARACTER CREATOR
----------------------------------------- */

function chooseHair(emoji, name) {

    characterData.hair = name;


    document.getElementById(
        "character-hair"
    ).textContent = emoji;


    document.getElementById(
        "selected-hair"
    ).textContent = name;


    playClickSound();

    characterAnimation();

}


function chooseClothes(emoji, name) {

    characterData.clothes = name;


    document.getElementById(
        "character-clothes"
    ).textContent = emoji;


    document.getElementById(
        "selected-clothes"
    ).textContent = name;


    playClickSound();

    characterAnimation();

}


function choosePersonality(name) {

    characterData.personality = name;


    document.getElementById(
        "selected-personality"
    ).textContent = name;


    playClickSound();

}


function chooseActivity(name) {

    characterData.activity = name;


    document.getElementById(
        "selected-activity"
    ).textContent = name;


    playClickSound();

}


/* -----------------------------------------
   CHARACTER ANIMATION
----------------------------------------- */

function characterAnimation() {

    const character =
        document.getElementById("character");


    character.style.animation = "none";


    setTimeout(() => {

        character.style.animation =
            "characterAppear 0.3s ease";

    }, 10);

}


/* -----------------------------------------
   SAVE CHARACTER
----------------------------------------- */

function saveCharacter() {

    const missing = [];


    if (!characterData.hair) {
        missing.push("hair");
    }

    if (!characterData.clothes) {
        missing.push("clothes");
    }

    if (!characterData.personality) {
        missing.push("personality");
    }

    if (!characterData.activity) {
        missing.push("favourite activity");
    }


    if (missing.length > 0) {

        alert(
            "Almost there! Please choose your " +
            missing.join(", ") +
            "."
        );

        return;

    }


    playSuccessSound();


    alert(
        "🎉 CHARACTER READY!\n\n" +
        "Your character is ready for the quest!"
    );


    /*
       For now we return to the Reading page.

       In the next version, this will unlock
       the actual Keyword Detective mission.
    */

    showPage("reading");

}


/* -----------------------------------------
   SOUND SYSTEM
----------------------------------------- */

let soundEnabled = true;


function toggleSound() {

    soundEnabled =
        !soundEnabled;


    const button =
        document.getElementById(
            "sound-button"
        );


    button.textContent =
        soundEnabled
            ? "🔊"
            : "🔇";

}


function playClickSound() {

    if (!soundEnabled) return;

    /*
       Placeholder for the sound system.

       We will replace this with proper
       audio assets later.
    */

}


function playSuccessSound() {

    if (!soundEnabled) return;

    /*
       Placeholder for success sound.
       Proper sound effects will be added
       in a later version.
    */

}


/* -----------------------------------------
   STARTUP
----------------------------------------- */

updateProgress("home");
