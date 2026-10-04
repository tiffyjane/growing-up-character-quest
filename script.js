/* =====================================================
   GROWING UP: CHARACTER QUEST
   VERSION 2
===================================================== */


/* =====================================================
   SOUND
===================================================== */

let soundOn = true;

let audioCtx;


/* =====================================================
   CHARACTER DATA
===================================================== */

const character = {

  hair: null,

  clothes: null,

  personality: null,

  activity: null

};


/* =====================================================
   KEYWORD DETECTIVE STATE
===================================================== */

const detective = {

  circle: false,

  underline: false,

  hunt: false,

  match: false

};


/* =====================================================
   CHARACTER CREATOR
===================================================== */

function choose(type, value, emoji, button) {

  character[type] = value;


  /* Remove previous selection */

  document
    .querySelectorAll(
      `[onclick^="choose('${type}'"]`
    )
    .forEach(function(btn) {

      btn.classList.remove("selected");

    });


  /* Highlight selected button */

  button.classList.add("selected");


  /* Update character card */

  document.getElementById(
    type + "Text"
  ).textContent = value;


  /* Change character */

  if (type === "hair") {

    document.getElementById(
      "characterAvatar"
    ).textContent = emoji;

  }


  playTone("click");

}


/* =====================================================
   SAVE CHARACTER
===================================================== */

function saveCharacter() {

  const missing =
    Object.keys(character)
      .filter(function(key) {

        return !character[key];

      });


  if (missing.length > 0) {

    alert(
      "Choose one option from each category first."
    );

    return;

  }


  /* Save character */

  localStorage.setItem(
    "growingUpCharacter",
    JSON.stringify(character)
  );


  playTone("success");


  /* Move to Reading */

  showSection("reading");


  resetDetective();


  setTimeout(function() {

    showFeedback(
      "success",
      "Character ready!",
      "Your detective case is waiting. Start with the question word."
    );

  }, 250);

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showSection(id) {

  document
    .querySelectorAll(".page")
    .forEach(function(page) {

      page.classList.remove(
        "active-page"
      );

    });


  const selected =
    document.getElementById(id);


  if (selected) {

    selected.classList.add(
      "active-page"
    );

  }


  const missionNumbers = {

    home: 0,

    creator: 1,

    reading: 2,

    listening: 3,

    grammar: 4,

    writing: 5,

    speaking: 6

  };


  const mission =
    missionNumbers[id] ?? 0;


  const progressText =
    document.getElementById(
      "progressText"
    );


  const progressFill =
    document.getElementById(
      "progressFill"
    );


  if (mission === 0) {

    progressText.textContent =
      "Quest Start";

    progressFill.style.width =
      "0%";

  }

  else {

    progressText.textContent =
      `Mission ${mission} / 6`;

    progressFill.style.width =
      `${(mission / 6) * 100}%`;

  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================================
   KEYWORD DETECTIVE
   STEP 1 — CIRCLE
===================================================== */

function circleWord(element) {

  if (detective.circle) {

    return;

  }


  detective.circle = true;


  element.classList.add(
    "circled"
  );


  /* Update detective board */

  markStep(
    "stepCircle"
  );


  unlockStep(
    "stepUnderline"
  );


  /* Update instruction */

  document.getElementById(
    "questionHint"
  ).textContent =
    "Step 2 unlocked: underline the key words.";


  playTone("success");


  showFeedback(

    "success",

    "Great detective!",

    "You found the question word: WHAT. Now underline the key words."

  );


  /* Replace question with the next interaction */

  unlockKeywords();

}


/* =====================================================
   WRONG CIRCLE
===================================================== */

function wrongCircle(element) {

  if (detective.circle) {

    return;

  }


  element.classList.add(
    "wrong"
  );


  setTimeout(function() {

    element.classList.remove(
      "wrong"
    );

  }, 300);


  playTone("wrong");


  showFeedback(

    "wrong",

    "Almost!",

    "Look for the word that asks for information."

  );

}


/* =====================================================
   STEP 2 — UNDERLINE
===================================================== */

function unlockKeywords() {

  const question =
    document.getElementById(
      "questionText"
    );


  question.innerHTML = `

    <button
      class="question-word circled">

      What

    </button>

    did

    <button
      class="question-word keyword"
      onclick="underlineWord(this)">

      Adam

    </button>

    <button
      class="question-word keyword"
      onclick="underlineWord(this)">

      like

    </button>?

  `;

}


/* =====================================================
   UNDERLINE WORD
===================================================== */

function underlineWord(element) {

  if (!detective.circle) {

    return;

  }


  element.classList.add(
    "underlined"
  );


  const selected =
    document.querySelectorAll(
      ".question-word.underlined"
    ).length;


  /* Both key words selected */

  if (
    selected >= 2 &&
    !detective.underline
  ) {

    detective.underline = true;


    markStep(
      "stepUnderline"
    );


    unlockStep(
      "stepHunt"
    );


    document.getElementById(
      "questionHint"
    ).textContent =
      "Step 3 unlocked: hunt for the clue in the passage.";


    /* Unlock clue buttons */

    document
      .querySelectorAll(".clue-word")
      .forEach(function(clue) {

        clue.classList.remove(
          "locked-clue"
        );

      });


    playTone("unlock");


    showFeedback(

      "success",

      "Keywords found!",

      "You underlined ADAM and LIKE. Now hunt for the clue."

    );

  }

  else {

    playTone("click");


    showFeedback(

      "info",

      "Good!",

      "Find and underline the other key word too."

    );

  }

}


/* =====================================================
   STEP 3 — HUNT
===================================================== */

function huntClue(element) {

  if (!detective.underline) {

    playTone("wrong");

    return;

  }


  if (detective.hunt) {

    return;

  }


  detective.hunt = true;


  element.classList.add(
    "hunted"
  );


  markStep(
    "stepHunt"
  );


  unlockStep(
    "stepMatch"
  );


  document.getElementById(
    "questionHint"
  ).textContent =
    "Step 4 unlocked: match the clue to the hidden picture.";


  /* Reveal hidden-object activity */

  document
    .getElementById("matchCard")
    .classList.remove("hidden");


  playTone("success");


  showFeedback(

    "success",

    "Clue found!",

    "The passage says “liked drawing”. Now find the matching picture."

  );

}


/* =====================================================
   WRONG HUNT
===================================================== */

function huntWrong(element) {

  if (!detective.underline) {

    showFeedback(

      "info",

      "Finish the steps first.",

      "Complete CIRCLE and UNDERLINE before hunting."

    );

    return;

  }


  element.animate(

    [

      {
        transform:
          "translateX(-4px)"
      },

      {
        transform:
          "translateX(4px)"
      },

      {
        transform:
          "translateX(0)"
      }

    ],

    {

      duration: 220

    }

  );


  playTone("wrong");


  showFeedback(

    "wrong",

    "Not this clue.",

    "Read the question again: What did Adam like?"

  );

}


/* =====================================================
   STEP 4 — MATCH
===================================================== */

function matchObject(objectName) {

  if (!detective.hunt) {

    return;

  }


  if (objectName === "drawing") {

    detective.match = true;


    markStep(
      "stepMatch"
    );


    playTone("success");


    /* Show completion */

    document
      .getElementById(
        "missionComplete"
      )
      .classList.remove(
        "hidden"
      );


    showFeedback(

      "success",

      "You found the answer!",

      "Excellent detective work. Adam liked drawing."

    );


    /* Save progress */

    localStorage.setItem(
      "readingComplete",
      "true"
    );

  }

}


/* =====================================================
   DETECTIVE BOARD
===================================================== */

function markStep(id) {

  const step =
    document.getElementById(id);


  step.classList.remove(
    "active"
  );


  step.classList.add(
    "done"
  );


  step.querySelector(
    "span"
  ).textContent = "✓";

}


/* =====================================================
   UNLOCK NEXT STEP
===================================================== */

function unlockStep(id) {

  const step =
    document.getElementById(id);


  step.classList.remove(
    "locked"
  );


  step.classList.add(
    "active"
  );

}


/* =====================================================
   RESET READING MISSION
===================================================== */

function resetDetective() {

  Object.assign(

    detective,

    {

      circle: false,

      underline: false,

      hunt: false,

      match: false

    }

  );


  /* Reset step 1 */

  const circleStep =
    document.getElementById(
      "stepCircle"
    );


  circleStep.className =
    "step active";


  circleStep.querySelector(
    "span"
  ).textContent = "1";


  /* Reset remaining steps */

  [
    "stepUnderline",
    "stepHunt",
    "stepMatch"

  ].forEach(function(id, index) {

    const step =
      document.getElementById(id);


    step.className =
      "step locked";


    step.querySelector(
      "span"
    ).textContent =
      index + 2;

  });


  /* Reset question */

  document.getElementById(
    "questionText"
  ).innerHTML = `

    <button
      class="question-word"
      onclick="circleWord(this)">

      What

    </button>

    did

    <button
      class="question-word other"
      onclick="wrongCircle(this)">

      Adam

    </button>

    <button
      class="question-word other"
      onclick="wrongCircle(this)">

      like

    </button>?

  `;


  document.getElementById(
    "questionHint"
  ).textContent =
    "Step 1: Circle the question word.";


  /* Hide final sections */

  document
    .getElementById("matchCard")
    .classList.add("hidden");


  document
    .getElementById("missionComplete")
    .classList.add("hidden");


  /* Lock clues */

  document
    .querySelectorAll(".clue-word")
    .forEach(function(clue) {

      clue.classList.add(
        "locked-clue"
      );

      clue.classList.remove(
        "hunted"
      );

    });


  showFeedback(

    "info",

    "Detective mission",

    "Start with the question word."

  );

}


/* =====================================================
   FEEDBACK
===================================================== */

function showFeedback(
  type,
  title,
  message
) {

  const feedback =
    document.getElementById(
      "feedback"
    );


  const icons = {

    success: "⭐",

    wrong: "🔍",

    info: "🔎"

  };


  feedback.querySelector(
    "span"
  ).textContent =
    icons[type] || "🔎";


  feedback.querySelector(
    "b"
  ).textContent =
    title;


  feedback.querySelector(
    "p"
  ).textContent =
    message;

}


/* =====================================================
   SOUND EFFECTS
   Uses Web Audio API
===================================================== */

function playTone(type) {

  if (!soundOn) {

    return;

  }


  try {

    audioCtx =
      audioCtx ||
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();


    const oscillator =
      audioCtx.createOscillator();


    const gain =
      audioCtx.createGain();


    oscillator.connect(
      gain
    );


    gain.connect(
      audioCtx.destination
    );


    const sounds = {

      click: [520, 0.06],

      success: [760, 0.13],

      wrong: [180, 0.10],

      unlock: [980, 0.16]

    };


    const [
      frequency,
      duration
    ] =
      sounds[type] ||
      sounds.click;


    oscillator.frequency.value =
      frequency;


    oscillator.type =
      type === "wrong"
        ? "sawtooth"
        : "sine";


    gain.gain.setValueAtTime(

      0.045,

      audioCtx.currentTime

    );


    gain.gain.exponentialRampToValueAtTime(

      0.001,

      audioCtx.currentTime +
      duration

    );


    oscillator.start();


    oscillator.stop(

      audioCtx.currentTime +
      duration

    );

  }

  catch (error) {

    /*

      Audio is optional.
      The website continues
      working if the browser
      blocks Web Audio.

    */

  }

}


/* =====================================================
   SOUND BUTTON
===================================================== */

function toggleSound() {

  soundOn =
    !soundOn;


  document.getElementById(
    "soundBtn"
  ).textContent =
    soundOn
      ? "🔊"
      : "🔇";


  if (soundOn) {

    playTone("click");

  }

}


/* =====================================================
   START WEBSITE
===================================================== */

showSection("home");
