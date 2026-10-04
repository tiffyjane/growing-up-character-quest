/* =====================================================
   GROWING UP: CHARACTER QUEST
   VERSION 4
===================================================== */


/* =====================================================
   CHARACTER DATA
===================================================== */

const character = {

  name: "",

  hair: "short",

  clothes: "tshirt",

  personality: "",

  activity: ""

};


/* =====================================================
   DETECTIVE DATA
===================================================== */

const detective = {

  circle: false,

  keywords: [],

  hunt: false,

  match: false

};


let soundOn = true;

let audioContext;


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {


  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove("active");

    });


  const page =
    document.getElementById(pageId);


  if (!page) return;


  page.classList.add("active");


  const progress = {

    home: 0,

    creator: 1,

    reading: 2,

    listening: 3,

    grammar: 4,

    writing: 5,

    speaking: 6

  };


  const number =
    progress[pageId] || 0;


  document.getElementById(
    "progressText"
  ).textContent =
    number === 0
      ? "Quest Start"
      : `Mission ${number} / 6`;


  document.getElementById(
    "progressFill"
  ).style.width =
    `${number / 6 * 100}%`;


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================================
   NAME
===================================================== */

function updateName() {


  const input =
    document.getElementById(
      "characterName"
    );


  character.name =
    input.value.trim();


  document.getElementById(
    "displayName"
  ).textContent =
    character.name ||
    "YOUR CHARACTER";


  updateStoryPreview();

}


/* =====================================================
   HAIR
===================================================== */

function chooseHair(
  type,
  button
) {


  character.hair =
    type;


  document
    .querySelectorAll(
      '[onclick^="chooseHair"]'
    )
    .forEach(btn => {

      btn.classList.remove(
        "selected"
      );

    });


  button.classList.add(
    "selected"
  );


  document
    .querySelectorAll(
      ".hair-layer"
    )
    .forEach(layer => {

      layer.classList.add(
        "hidden-svg"
      );

    });


  /*
    Short hair is the default
    and is positioned in the
    SVG without hidden-svg.
  */

  if (type === "short") {

    document
      .getElementById(
        "hairShort"
      )
      .classList.remove(
        "hidden-svg"
      );

  }

  else {

    document
      .getElementById(
        "hairShort"
      )
      .classList.add(
        "hidden-svg"
      );


    const selected =
      document.getElementById(
        "hair" +
        type.charAt(0).toUpperCase() +
        type.slice(1)
      );


    if (selected) {

      selected.classList.remove(
        "hidden-svg"
      );

    }

  }


  updateStoryPreview();

  playSound("click");

}


/* =====================================================
   CLOTHES
===================================================== */

function chooseClothes(
  type,
  button
) {


  character.clothes =
    type;


  document
    .querySelectorAll(
      '[onclick^="chooseClothes"]'
    )
    .forEach(btn => {

      btn.classList.remove(
        "selected"
      );

    });


  button.classList.add(
    "selected"
  );


  document
    .querySelectorAll(
      ".clothes-layer"
    )
    .forEach(layer => {

      layer.classList.add(
        "hidden-svg"
      );

    });


  const ids = {

    tshirt:
      "clothesTshirt",

    dress:
      "clothesDress",

    jacket:
      "clothesJacket",

    sports:
      "clothesSports"

  };


  document
    .getElementById(
      ids[type]
    )
    .classList.remove(
      "hidden-svg"
    );


  updateStoryPreview();

  playSound("click");

}


/* =====================================================
   PERSONALITY
===================================================== */

function choosePersonality(
  value,
  button
) {


  character.personality =
    value;


  button.parentElement
    .querySelectorAll("button")
    .forEach(btn => {

      btn.classList.remove(
        "selected"
      );

    });


  button.classList.add(
    "selected"
  );


  updateStoryPreview();

  playSound("click");

}


/* =====================================================
   ACTIVITY
===================================================== */

function chooseActivity(
  value,
  button
) {


  character.activity =
    value;


  button.parentElement
    .querySelectorAll("button")
    .forEach(btn => {

      btn.classList.remove(
        "selected"
      );

    });


  button.classList.add(
    "selected"
  );


  updateStoryPreview();

  playSound("click");

}


/* =====================================================
   STORY GENERATION
===================================================== */

function personalitySentence() {


  const map = {

    friendly:
      "They were friendly.",

    funny:
      "They were funny.",

    brave:
      "They were brave.",

    clever:
      "They were clever."

  };


  return map[
    character.personality
  ] || "";

}


function activitySentence() {


  const map = {

    football:
      "They played football.",

    badminton:
      "They played badminton.",

    drawing:
      "They liked drawing.",

    reading:
      "They liked reading."

  };


  return map[
    character.activity
  ] || "";

}


function appearanceSentence() {


  const map = {

    long:
      "They had long hair.",

    short:
      "They had short hair.",

    curly:
      "They had curly hair.",

    brownCurly:
      "They had brown curly hair."

  };


  return map[
    character.hair
  ] || "";

}


function generateStory() {


  const name =
    character.name ||
    "Your character";


  const first =
    `When ${name} was seven, ${appearanceSentence().replace(
      "They",
      "they"
    )}`;


  const parts = [

    first,

    personalitySentence(),

    activitySentence(),

    "They didn't like swimming."

  ];


  return parts
    .filter(Boolean)
    .join(" ");

}


/* =====================================================
   STORY PREVIEW
===================================================== */

function updateStoryPreview() {


  const preview =
    document.getElementById(
      "storyPreview"
    );


  preview.textContent =
    generateStory();

}


/* =====================================================
   FINISH CHARACTER
===================================================== */

function finishCharacter() {


  if (!character.name) {

    alert(
      "Please enter a name for your character."
    );

    return;

  }


  if (!character.personality) {

    alert(
      "Please choose a personality."
    );

    return;

  }


  if (!character.activity) {

    alert(
      "Please choose a favourite activity."
    );

    return;

  }


  localStorage.setItem(

    "growingUpCharacter",

    JSON.stringify(character)

  );


  buildReadingMission();

  playSound("success");

  showPage("reading");

}


/* =====================================================
   BUILD READING
===================================================== */

function buildReadingMission() {


  const name =
    character.name;


  document.getElementById(
    "caseName"
  ).textContent =
    name.toUpperCase();


  document.getElementById(
    "storyTitle"
  ).textContent =
    `${name}'s Story`;


  document.getElementById(
    "dynamicQuestion"
  ).innerHTML = `

    <button
      class="question-word"
      onclick="circleQuestion(this)">

      What

    </button>

    did ${name} like?

  `;


  document.getElementById(
    "dynamicStory"
  ).textContent =
    generateStory();


  document.getElementById(
    "matchInstruction"
  ).textContent =
    `Find the picture that matches what ${name} liked.`;


  resetDetective();

}


/* =====================================================
   STEP 1 — CIRCLE
===================================================== */

function circleQuestion(
  button
) {


  if (detective.circle) return;


  detective.circle =
    true;


  button.style.border =
    "4px solid #9c72d2";


  button.style.borderRadius =
    "50%";


  button.style.padding =
    "3px 8px";


  completeStep(
    "boardCircle"
  );


  unlockStep(
    "boardUnderline"
  );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 2: Underline the key words.";


  buildKeywords();


  document.getElementById(
    "keywordArea"
  ).classList.remove(
    "hidden"
  );


  showFeedback(

    "Great detective!",

    "You found the question word. Now underline the key words."

  );


  playSound("success");

}


/* =====================================================
   STEP 2 — KEYWORDS
===================================================== */

function buildKeywords() {


  const area =
    document.getElementById(
      "keywordButtons"
    );


  area.innerHTML = "";


  const name =
    character.name;


  const words = [

    "What",

    name,

    "like"

  ];


  words.forEach(word => {


    const button =
      document.createElement(
        "button"
      );


    button.className =
      "keyword-button";


    button.textContent =
      word;


    button.onclick =
      () => selectKeyword(
        word,
        button
      );


    area.appendChild(
      button
    );

  });

}


function selectKeyword(
  word,
  button
) {


  if (!detective.keywords.includes(word)) {

    detective.keywords.push(word);

  }


  button.classList.add(
    "selected"
  );


  const name =
    character.name;


  if (

    detective.keywords.includes(name) &&

    detective.keywords.includes("like")

  ) {

    unlockHunt();

  }

}


/* =====================================================
   STEP 3 — HUNT
===================================================== */

function unlockHunt() {


  if (detective.hunt) return;


  completeStep(
    "boardUnderline"
  );


  unlockStep(
    "boardHunt"
  );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 3: Hunt for the clue in the story.";


  buildClues();


  document.getElementById(
    "huntArea"
  ).classList.remove(
    "hidden"
  );


  showFeedback(

    "Keywords found!",

    "Now hunt through the story for the clue."

  );


  playSound("unlock");

}


/* =====================================================
   CLUES
===================================================== */

function buildClues() {


  const area =
    document.getElementById(
      "clueButtons"
    );


  area.innerHTML = "";


  const correct =
    activitySentence();


  const options = [

    appearanceSentence(),

    personalitySentence(),

    correct,

    "They didn't like swimming."

  ];


  options.forEach(text => {


    const button =
      document.createElement(
        "button"
      );


    button.className =
      "clue-button";


    button.textContent =
      text;


    button.onclick =
      () => {

        if (
          text === correct
        ) {

          findClue(button);

        }

        else {

          wrongClue();

        }

      };


    area.appendChild(
      button
    );

  });

}


function findClue(
  button
) {


  if (detective.hunt) return;


  detective.hunt =
    true;


  button.style.outline =
    "4px solid #88c98c";


  completeStep(
    "boardHunt"
  );


  unlockStep(
    "boardMatch"
  );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 4: Find the matching picture.";


  document.getElementById(
    "matchArea"
  ).classList.remove(
    "hidden"
  );


  showFeedback(

    "Clue found!",

    `You found the clue: ${activitySentence()} Now match it to the picture.`

  );


  playSound("success");

}


function wrongClue() {


  showFeedback(

    "Almost!",

    "Read the question again. What did the character like?"

  );


  playSound("wrong");

}


/* =====================================================
   STEP 4 — MATCH
===================================================== */

function findObject() {


  if (!detective.hunt) return;


  detective.match =
    true;


  completeStep(
    "boardMatch"
  );


  document.getElementById(
    "caseComplete"
  ).classList.remove(
    "hidden"
  );


  document.getElementById(
    "finalAnswer"
  ).textContent =
    `${character.name} liked ${character.activity}.`;


  showFeedback(

    "Case solved!",

    `Excellent! ${character.name} liked ${character.activity}.`

  );


  playSound("success");


  localStorage.setItem(
    "readingComplete",
    "true"
  );

}


/* =====================================================
   DETECTIVE BOARD
===================================================== */

function completeStep(
  id
) {


  const element =
    document.getElementById(id);


  element.classList.remove(
    "active"
  );


  element.classList.add(
    "done"
  );


  element.querySelector(
    "b"
  ).textContent =
    "✓";

}


function unlockStep(
  id
) {


  const element =
    document.getElementById(id);


  element.classList.remove(
    "locked"
  );


  element.classList.add(
    "active"
  );

}


/* =====================================================
   FEEDBACK
===================================================== */

function showFeedback(
  title,
  message
) {


  const box =
    document.getElementById(
      "detectiveFeedback"
    );


  box.querySelector(
    "strong"
  ).textContent =
    title;


  box.querySelector(
    "p"
  ).textContent =
    message;

}


/* =====================================================
   RESET
===================================================== */

function resetDetective() {


  detective.circle =
    false;


  detective.keywords =
    [];


  detective.hunt =
    false;


  detective.match =
    false;


  [
    "boardCircle",
    "boardUnderline",
    "boardHunt",
    "boardMatch"

  ].forEach(
    (id,index) => {


      const step =
        document.getElementById(id);


      step.className =
        "detective-step";


      if (index === 0) {

        step.classList.add(
          "active"
        );

      }

      else {

        step.classList.add(
          "locked"
        );

      }


      step.querySelector(
        "b"
      ).textContent =
        index + 1;

    }
  );


  document.getElementById(
    "keywordArea"
  ).classList.add(
    "hidden"
  );


  document.getElementById(
    "huntArea"
  ).classList.add(
    "hidden"
  );


  document.getElementById(
    "matchArea"
  ).classList.add(
    "hidden"
  );


  document.getElementById(
    "caseComplete"
  ).classList.add(
    "hidden"
  );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 1: Circle the question word.";


  showFeedback(

    "Detective mission",

    "Start by circling the question word."

  );

}


/* =====================================================
   SOUND
===================================================== */

function playSound(
  type
) {


  if (!soundOn) return;


  try {


    audioContext =
      audioContext ||
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    const oscillator =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    oscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );


    const tones = {

      click: 520,

      success: 760,

      unlock: 980,

      wrong: 180

    };


    oscillator.frequency.value =
      tones[type] || 520;


    oscillator.type =
      type === "wrong"
        ? "sawtooth"
        : "sine";


    gain.gain.setValueAtTime(
      .035,
      audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      .001,
      audioContext.currentTime + .12
    );


    oscillator.start();


    oscillator.stop(
      audioContext.currentTime + .12
    );


  }

  catch(error) {

    /* Audio is optional. */

  }

}


/* =====================================================
   SOUND BUTTON
===================================================== */

function toggleSound() {


  soundOn =
    !soundOn;


  document.getElementById(
    "soundButton"
  ).textContent =
    soundOn
      ? "SOUND"
      : "MUTED";


  if (soundOn) {

    playSound("click");

  }

}


/* =====================================================
   LOAD SAVED CHARACTER
===================================================== */

function loadCharacter() {


  const saved =
    localStorage.getItem(
      "growingUpCharacter"
    );


  if (!saved) {

    updateStoryPreview();

    return;

  }


  try {


    const savedData =
      JSON.parse(saved);


    Object.assign(
      character,
      savedData
    );


    document.getElementById(
      "characterName"
    ).value =
      character.name || "";


    document.getElementById(
      "displayName"
    ).textContent =
      character.name ||
      "YOUR CHARACTER";


    updateStoryPreview();


  }

  catch(error) {

    console.log(
      "No saved character."
    );

  }

}


/* =====================================================
   START
===================================================== */

loadCharacter();

showPage("home");
