/* =====================================================
   GROWING UP: CHARACTER QUEST
   VERSION 3
===================================================== */


/* =====================================================
   CHARACTER DATA
===================================================== */

const character = {

  name: "",

  hair: "",

  hairEmoji: "",

  clothes: "",

  clothesEmoji: "",

  personality: "",

  personalityEmoji: "",

  activity: "",

  activityEmoji: ""

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


/* =====================================================
   SOUND
===================================================== */

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


  const progressFill =
    document.getElementById(
      "progressFill"
    );


  const progressText =
    document.getElementById(
      "progressText"
    );


  if (number === 0) {

    progressText.textContent =
      "Quest Start";

    progressFill.style.width =
      "0%";

  }

  else {

    progressText.textContent =
      `Mission ${number} / 6`;

    progressFill.style.width =
      `${number / 6 * 100}%`;

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });


  playSound("click");

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


  const display =
    document.getElementById(
      "displayName"
    );


  display.textContent =
    character.name ||
    "Your Character";


  updateStoryPreview();

}


/* =====================================================
   CHARACTER OPTIONS
===================================================== */

function chooseItem(
  type,
  value,
  emoji,
  button
) {


  character[type] =
    value;


  if (type === "hair") {

    character.hairEmoji =
      emoji;

    document
      .getElementById(
        "characterHair"
      )
      .textContent =
      emoji;

  }


  if (type === "clothes") {

    character.clothesEmoji =
      emoji;

    document
      .getElementById(
        "characterClothes"
      )
      .textContent =
      emoji;

  }


  if (type === "personality") {

    character.personalityEmoji =
      emoji;

  }


  if (type === "activity") {

    character.activityEmoji =
      emoji;

  }


  /* Remove selection from siblings */

  const parent =
    button.parentElement;


  parent
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

function getCharacterName() {

  return character.name ||
    "your character";

}


/* =====================================================
   APPEARANCE SENTENCE
===================================================== */

function getAppearanceSentence() {


  let hair =
    character.hair;


  if (!hair) {

    return "";

  }


  return `When ${getCharacterName()} was seven, ${getCharacterName().toLowerCase() === "your character" ? "they" : "he/she"} had ${hair.toLowerCase()} hair.`;

}


/*
  We use neutral "they" for the generated
  story because the creator does not ask
  pupils to select gender.
*/


function getStoryAppearance() {


  if (!character.hair) {

    return "";

  }


  return `When ${getCharacterName()} was seven, they had ${character.hair.toLowerCase()} hair.`;

}


function getPersonalitySentence() {


  if (!character.personality) {

    return "";

  }


  const personalityMap = {

    friendly:
      "They were friendly.",

    funny:
      "They were funny.",

    brave:
      "They were brave.",

    clever:
      "They were clever."

  };


  return personalityMap[
    character.personality
  ];

}


function getActivitySentence() {


  if (!character.activity) {

    return "";

  }


  const activityMap = {

    football:
      "They played football.",

    badminton:
      "They played badminton.",

    drawing:
      "They liked drawing.",

    reading:
      "They liked reading."

  };


  return activityMap[
    character.activity
  ];

}


/* =====================================================
   STORY
===================================================== */

function generateStory() {


  const parts = [];


  const appearance =
    getStoryAppearance();


  const personality =
    getPersonalitySentence();


  const activity =
    getActivitySentence();


  if (appearance) {

    parts.push(
      appearance
    );

  }


  if (personality) {

    parts.push(
      personality
    );

  }


  if (activity) {

    parts.push(
      activity
    );

  }


  /*
    Keep a negative sentence in every
    generated case so pupils practise
    the target affirmative/negative form.
  */

  if (character.activity) {

    const dislikes = {

      football:
        "They didn't like swimming.",

      badminton:
        "They didn't like swimming.",

      drawing:
        "They didn't like swimming.",

      reading:
        "They didn't like swimming."

    };


    parts.push(
      dislikes[
        character.activity
      ]
    );

  }


  return parts.join(" ");

}


/* =====================================================
   PREVIEW
===================================================== */

function updateStoryPreview() {


  const preview =
    document.getElementById(
      "storyPreview"
    );


  const story =
    generateStory();


  if (!story) {

    preview.textContent =
      "Choose your character's details to build their story.";

    return;

  }


  preview.textContent =
    story;

}


/* =====================================================
   FINISH CHARACTER
===================================================== */

function finishCharacter() {


  if (!character.name) {

    alert(
      "Please give your character a name first."
    );

    return;

  }


  if (!character.hair) {

    alert(
      "Please choose a hairstyle."
    );

    return;

  }


  if (!character.clothes) {

    alert(
      "Please choose some clothes."
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


  /*
    Save the character so the story
    stays available.
  */

  localStorage.setItem(

    "growingUpCharacter",

    JSON.stringify(character)

  );


  playSound("success");


  buildReadingMission();


  showPage("reading");

}


/* =====================================================
   BUILD READING MISSION
===================================================== */

function buildReadingMission() {


  const name =
    getCharacterName();


  /*
    QUESTION
  */

  const question =
    `What did ${name} like?`;


  document.getElementById(
    "dynamicQuestion"
  ).innerHTML = `

    <button
      class="question-word"
      onclick="circleQuestionWord(this)">

      What

    </button>

    did

    ${name}

    like?

  `;


  /*
    STORY
  */

  document.getElementById(
    "storyTitle"
  ).textContent =
    `${name}'s Case File`;


  document.getElementById(
    "dynamicStory"
  ).textContent =
    generateStory();


  /*
    KEYWORDS
  */

  buildKeywordButtons();


  /*
    MATCH INSTRUCTION
  */

  document.getElementById(
    "matchInstruction"
  ).textContent =
    `Find the object that matches what ${name} liked.`;


  /*
    RESET MISSION
  */

  resetDetective();

}


/* =====================================================
   KEYWORD BUTTONS
===================================================== */

function buildKeywordButtons() {


  const area =
    document.getElementById(
      "keywordButtons"
    );


  const name =
    getCharacterName();


  area.innerHTML = "";


  const words = [

    "What",

    "did",

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


    /*
      Only the question word
      is selectable at first.
    */

    if (word === "What") {

      button.onclick =
        () => {

          circleQuestionWord(
            document.querySelector(
              ".question-word"
            )
          );

        };

    }

    else {

      button.disabled =
        true;

      button.style.opacity =
        ".5";

    }


    area.appendChild(
      button
    );

  });

}


/* =====================================================
   STEP 1 — CIRCLE
===================================================== */

function circleQuestionWord(
  element
) {


  if (detective.circle) {

    return;

  }


  detective.circle =
    true;


  element.classList.add(
    "circled"
  );


  completeStep(
    "boardCircle"
  );


  unlockStep(
    "boardUnderline"
  );


  /*
    Enable keyword buttons
  */

  const buttons =
    document.querySelectorAll(
      ".keyword-button"
    );


  buttons.forEach(
    button => {

      button.disabled =
        false;

      button.style.opacity =
        "1";

      button.onclick =
        () => underlineKeyword(
          button
        );

    }
  );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 2: Underline the key words.";


  showFeedback(

    "⭐",

    "Great detective!",

    "You found the question word. Now underline the key words."

  );


  playSound("success");

}


/* =====================================================
   STEP 2 — UNDERLINE
===================================================== */

function underlineKeyword(
  button
) {


  if (!detective.circle) {

    return;

  }


  /*
    We need the character's name
    and the word "like".
  */

  const name =
    getCharacterName();


  const word =
    button.textContent;


  if (
    word !== name &&
    word !== "like"
  ) {

    showFeedback(

      "🔎",

      "Look carefully.",

      "Underline the important words in the question."

    );

    return;

  }


  button.classList.add(
    "selected"
  );


  if (
    !detective.keywords.includes(
      word
    )
  ) {

    detective.keywords.push(
      word
    );

  }


  /*
    Both key words found.
  */

  if (
    detective.keywords.includes(
      name
    ) &&
    detective.keywords.includes(
      "like"
    )
  ) {

    unlockHunt();

  }

}


/* =====================================================
   UNLOCK HUNT
===================================================== */

function unlockHunt() {


  if (
    document
      .getElementById(
        "boardHunt"
      )
      .classList.contains("active")
  ) {

    return;

  }


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


  buildClueButtons();


  document
    .getElementById(
      "huntArea"
    )
    .classList.remove(
      "hidden"
    );


  showFeedback(

    "⭐",

    "Keywords found!",

    "Now hunt through the story for the clue."

  );


  playSound("unlock");

}


/* =====================================================
   STEP 3 — CLUE BUTTONS
===================================================== */

function buildClueButtons() {


  const area =
    document.getElementById(
      "clueButtons"
    );


  area.innerHTML = "";


  const correct =
    getActivitySentence();


  const options = [

    getStoryAppearance(),

    getPersonalitySentence(),

    correct,

    "They didn't like swimming."

  ];


  options.forEach(
    text => {


      const button =
        document.createElement(
          "button"
        );


      button.className =
        "clue-button";


      button.textContent =
        text;


      if (
        text === correct
      ) {

        button.onclick =
          () => findClue(
            button
          );

      }

      else {

        button.onclick =
          () => wrongClue();

      }


      area.appendChild(
        button
      );

    }
  );

}


/* =====================================================
   FIND CLUE
===================================================== */

function findClue(
  button
) {


  if (detective.hunt) {

    return;

  }


  detective.hunt =
    true;


  button.style.outline =
    "4px solid #87c98b";


  completeStep(
    "boardHunt"
  );


  unlockStep(
    "boardMatch"
  );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 4: Find the picture that matches your clue.";


  document
    .getElementById(
      "matchArea"
    )
    .classList.remove(
      "hidden"
    );


  showFeedback(

    "⭐",

    "Clue found!",

    `The clue is: "${button.textContent}" Now find the matching object.`

  );


  playSound("success");

}


/* =====================================================
   WRONG CLUE
===================================================== */

function wrongClue() {


  showFeedback(

    "🔎",

    "Almost!",

    "Read the question again. What did the character like?"

  );


  playSound("wrong");

}


/* =====================================================
   STEP 4 — MATCH
===================================================== */

function findObject() {


  if (!detective.hunt) {

    return;

  }


  detective.match =
    true;


  completeStep(
    "boardMatch"
  );


  document.getElementById(
    "caseComplete"
  )
    .classList.remove(
      "hidden"
    );


  document.getElementById(
    "finalAnswer"
  ).textContent =
    `${getCharacterName()} liked ${character.activity}.`;


  showFeedback(

    "🏆",

    "Case solved!",

    `Excellent! ${getCharacterName()} liked ${character.activity}.`

  );


  playSound("success");


  localStorage.setItem(
    "readingComplete",
    "true"
  );

}


/* =====================================================
   BOARD
===================================================== */

function completeStep(
  id
) {


  const element =
    document.getElementById(
      id
    );


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
    document.getElementById(
      id
    );


  element.classList.remove(
    "locked"
  );


  element.classList.add(
    "active"
  );

}


/* =====================================================
   RESET DETECTIVE
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


      const element =
        document.getElementById(
          id
        );


      element.className =
        "detective-step";


      if (
        index === 0
      ) {

        element.classList.add(
          "active"
        );

      }

      else {

        element.classList.add(
          "locked"
        );

      }


      element.querySelector(
        "b"
      ).textContent =
        index + 1;

    }
  );


  document
    .getElementById(
      "huntArea"
    )
    .classList.add(
      "hidden"
    );


  document
    .getElementById(
      "matchArea"
    )
    .classList.add(
      "hidden"
    );


  document
    .getElementById(
      "caseComplete"
    )
    .classList.add(
      "hidden"
    );


  document.getElementById(
    "detectiveInstruction"
  ).textContent =
    "Step 1: Circle the question word.";


  showFeedback(

    "🔎",

    "Detective mission",

    "Start by circling the question word."

  );

}


/* =====================================================
   FEEDBACK
===================================================== */

function showFeedback(
  icon,
  title,
  message
) {


  const box =
    document.getElementById(
      "detectiveFeedback"
    );


  box.querySelector(
    "span"
  ).textContent =
    icon;


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


    oscillator.connect(
      gain
    );


    gain.connect(
      audioContext.destination
    );


    const tones = {

      click: 520,

      success: 760,

      wrong: 190,

      unlock: 980

    };


    oscillator.frequency.value =
      tones[type] ||
      520;


    oscillator.type =
      type === "wrong"
        ? "sawtooth"
        : "sine";


    gain.gain.setValueAtTime(
      .04,
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
   SOUND TOGGLE
===================================================== */

function toggleSound() {


  soundOn =
    !soundOn;


  document.getElementById(
    "soundButton"
  ).textContent =
    soundOn
      ? "🔊"
      : "🔇";


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

    return;

  }


  try {

    const data =
      JSON.parse(saved);


    Object.assign(
      character,
      data
    );


    document.getElementById(
      "characterName"
    ).value =
      character.name || "";


    document.getElementById(
      "displayName"
    ).textContent =
      character.name ||
      "Your Character";


    if (
      character.hairEmoji
    ) {

      document.getElementById(
        "characterHair"
      ).textContent =
        character.hairEmoji;

    }


    if (
      character.clothesEmoji
    ) {

      document.getElementById(
        "characterClothes"
      ).textContent =
        character.clothesEmoji;

    }


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
