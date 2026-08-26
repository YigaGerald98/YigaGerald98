/* =========================================================
   PROWESS ICT ASSESSMENT ENGINE
   LOCAL-FIRST + GOOGLE SHEETS SYNC
   ========================================================= */

const STORAGE_KEY = "yg-assessment-progress-v1";


/* =========================================================
   LOCAL PROGRESS
   ========================================================= */

function getProgress() {

  try {

    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || {};

  } catch (error) {

    console.error(
      "Could not read assessment progress:",
      error
    );

    return {};

  }

}


function saveProgress(data) {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

    return true;

  } catch (error) {

    console.error(
      "Could not save assessment progress:",
      error
    );

    return false;

  }

}


/* =========================================================
   ASSESSMENT LAB
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const unitGrid =
      document.querySelector(
        "#assessment-unit-grid"
      );

    if (
      unitGrid &&
      window.ASSESSMENT_DATA
    ) {

      renderAssessmentUnits(unitGrid);

    }

    const quiz =
      document.querySelector(
        "#quiz-app"
      );

    if (quiz) {

      startQuiz(
        quiz.dataset.unit,
        quiz
      );

    }

  }
);


/* =========================================================
   UNIT GRID
   ========================================================= */

function renderAssessmentUnits(unitGrid) {

  const units = [

    [
      "unit1",
      "01",
      "Computer Systems & Troubleshooting",
      "Identify faults and apply systematic troubleshooting."
    ],

    [
      "unit2",
      "02",
      "Data, Networks & Security",
      "Apply networking, data and security concepts."
    ],

    [
      "unit3",
      "03",
      "Productivity & Digital Communication",
      "Apply office and digital communication skills."
    ],

    [
      "unit4",
      "04",
      "Systems Analysis & Digital Solutions",
      "Analyse requirements and evaluate solutions."
    ],

    [
      "final",
      "FINAL",
      "Integrated ICT Challenge",
      "Combine multiple ICT competencies."
    ]

  ];


  const progress =
    getProgress();


  const allQuestions =
    Object.values(
      ASSESSMENT_DATA
    ).flat();


  const total =
    allQuestions.length;


  const done =
    allQuestions.filter(
      question =>
        progress[question.id]?.completed
    ).length;


  unitGrid.innerHTML =
    units.map(
      ([key, number, title, description]) => {

        const questions =
          ASSESSMENT_DATA[key] || [];


        const completed =
          questions.filter(
            question =>
              progress[question.id]?.completed
          ).length;


        const percent =
          questions.length
            ? Math.round(
                completed /
                questions.length *
                100
              )
            : 0;


        const href =
          key === "final"
            ? "green-valley/final-task.html"
            : `green-valley/unit-${key.replace("unit", "")}.html`;


        return `

<a
  class="unit-card"
  href="${href}"
>

<span class="unit-number">
${number}
</span>

<h3>
${title}
</h3>

<p>
${description}
</p>

<div class="progress-shell">

<div
  class="progress-bar"
  style="width:${percent}%"
></div>

</div>

<small>
${completed}/${questions.length}
completed
</small>

</a>

`;

      }
    ).join("");


  const overall =
    document.querySelector(
      "#overall-progress"
    );


  if (overall) {

    overall.style.width =
      `${total
        ? Math.round(done / total * 100)
        : 0}%`;

  }


  const text =
    document.querySelector(
      "#overall-progress-text"
    );


  if (text) {

    text.textContent =
      `${total
        ? Math.round(done / total * 100)
        : 0}% complete`;

  }

}


/* =========================================================
   QUIZ ENGINE
   ========================================================= */

function startQuiz(unitKey, mount) {

  if (
    !window.ASSESSMENT_DATA
  ) {

    mount.innerHTML = `
      <div class="empty-state">
        Assessment data could not be loaded.
      </div>
    `;

    console.error(
      "ASSESSMENT_DATA is unavailable."
    );

    return;

  }


  const questions =
    ASSESSMENT_DATA[unitKey] || [];


  if (!questions.length) {

    mount.innerHTML = `
      <div class="empty-state">
        No questions have been added to this unit yet.
      </div>
    `;

    return;

  }


  const progress =
    getProgress();


  let index = 0;

  let score = 0;

  let submitted = false;

  const results = [];

  const startTime =
    Date.now();


  function render() {

    const question =
      questions[index];


    submitted = false;


    mount.innerHTML = `

<div class="quiz-top">

<span>
Question ${index + 1}
of
${questions.length}
</span>

<span>
${question.marks} marks
</span>

</div>


<div class="progress-shell">

<div
  class="progress-bar"
  style="width:${(index / questions.length) * 100}%"
></div>

</div>


<article class="quiz-card">


<div class="question-meta">

<span class="badge">
${question.topic}
</span>

<span class="muted">
${question.level}
</span>

</div>


<div class="scenario">

<strong>
Scenario
</strong>

<p>
${question.scenario}
</p>

</div>


<h2>
${question.question}
</h2>


<div class="options">

${question.options.map(
  (option, i) => `

<label class="option">

<input
  type="radio"
  name="answer"
  value="${i}"
>

<span>
${option}
</span>

</label>

`
).join("")}

</div>


<button
  id="submit-answer"
  class="btn btn-primary"
>

Check answer

</button>


<div
  id="feedback"
  class="feedback"
  aria-live="polite"
></div>


</article>

`;


    const submit =
      document.querySelector(
        "#submit-answer"
      );


    submit?.addEventListener(
      "click",
      check
    );

  }


  function check() {

    if (submitted) {
      return;
    }


    const selected =
      document.querySelector(
        'input[name="answer"]:checked'
      );


    const feedback =
      document.querySelector(
        "#feedback"
      );


    if (!selected) {

      feedback.className =
        "feedback error";

      feedback.innerHTML =
        "Choose an answer first.";

      return;

    }


    submitted = true;


    const question =
      questions[index];


    const chosen =
      Number(selected.value);


    const correct =
      chosen === question.answer;


    if (correct) {

      score += question.marks;

    }


    results.push({

      questionId:
        question.id,

      unit:
        unitKey,

      topic:
        question.topic,

      correct:
        correct,

      marks:
        correct
          ? question.marks
          : 0,

      maxMarks:
        question.marks

    });


    progress[question.id] = {

      completed: true,

      correct: correct,

      score:
        correct
          ? question.marks
          : 0,

      date:
        new Date().toISOString()

    };


    saveProgress(progress);


    document
      .querySelectorAll(".option")
      .forEach(
        (element, i) => {

          if (
            i === question.answer
          ) {

            element.classList.add(
              "correct"
            );

          }


          if (
            i === chosen &&
            !correct
          ) {

            element.classList.add(
              "wrong"
            );

          }

        }
      );


    feedback.className =
      `feedback ${
        correct
          ? "success"
          : "error"
      }`;


    feedback.innerHTML = `

<strong>
${correct ? "Correct!" : "Not quite."}
</strong>

<p>
${question.explanation}
</p>

<div class="model-answer">

<strong>
Model response:
</strong>

${question.model}

</div>

<button
  id="next-question"
  class="btn btn-secondary"
>

${
  index === questions.length - 1
    ? "Finish unit"
    : "Next question →"
}

</button>

`;


    document
      .querySelector(
        "#next-question"
      )
      ?.addEventListener(
        "click",
        next
      );

  }


  function next() {

    index++;


    if (
      index >= questions.length
    ) {

      finish();

    } else {

      render();

    }

  }


  async function finish() {

    const max =
      questions.reduce(
        (sum, question) =>
          sum + question.marks,
        0
      );


    const percentage =
      max
        ? Math.round(
            score / max * 100
          )
        : 0;


    const profile =
      typeof getLearnerProfile === "function"
        ? getLearnerProfile()
        : null;


    const attemptId =
      typeof generateAttemptId === "function"
        ? generateAttemptId(unitKey)
        : `LOCAL-${Date.now()}`;


    const duration =
      Math.round(
        (Date.now() - startTime) /
        1000
      );


    const attempt = {

      attemptId:

        attemptId,


      learnerId:

        profile?.learnerId ||
        "LOCAL-LEARNER",


      name:

        profile?.name ||
        "Local Learner",


      className:

        profile?.className ||
        "",


      assessment:

        unitKey,


      score:

        score,


      maxMarks:

        max,


      percentage:

        percentage,


      duration:

        duration,


      results:

        results

    };


    let syncMessage =
      "Progress saved on this device.";


    if (
      typeof submitAssessmentAttempt ===
      "function"
    ) {

      try {

        const response =
          await submitAssessmentAttempt(
            attempt
          );


        if (
          response?.success
        ) {

          syncMessage =
            "Assessment saved and synchronised.";

        } else {

          syncMessage =
            "Assessment saved locally and queued for synchronisation.";

        }

      } catch (error) {

        console.warn(
          "Could not synchronise attempt:",
          error
        );

      }

    }


    mount.innerHTML = `

<div class="result-card">

<p class="eyebrow">
Unit complete
</p>

<h1>
${score}/${max}
</h1>

<h2>
${percentage}%
</h2>

<p>
${
  percentage >= 80
    ? "Excellent work. Keep stretching your application and analysis skills."
    : percentage >= 50
      ? "Good foundation. Review the feedback and attempt the unit again."
      : "Keep practising. Review the model responses and retry the unit."
}
</p>


<div
  class="sync-status"
  id="result-sync-status"
>

${syncMessage}

</div>


<div class="button-row">

<button
  id="retry"
  class="btn btn-primary"
>

Retry unit

</button>


<a
  class="btn btn-secondary"
  href="../../assessments/index.html"
>

Assessment Lab

</a>

</div>

</div>

`;


    document
      .querySelector("#retry")
      ?.addEventListener(
        "click",
        () => {

          index = 0;

          score = 0;

          results.length = 0;

          render();

        }
      );

  }


  render();

}
