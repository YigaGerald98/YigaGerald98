/* =========================================================
   PROWESS ICT ASSESSMENT ENGINE
   ========================================================= */

const STORAGE_KEY =
  "yg-assessment-progress-v1";


/* =========================================================
   LOCAL PROGRESS
   ========================================================= */

function getProgress() {

  try {

    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || {};

  } catch {

    return {};

  }
}


function saveProgress(data) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}


/* =========================================================
   ASSESSMENT INFORMATION
   ========================================================= */

function assessmentTitle(unitKey) {

  const names = {

    unit1:
      "Unit 1 — Computer Systems & Troubleshooting",

    unit2:
      "Unit 2 — Data, Networks & Security",

    unit3:
      "Unit 3 — Productivity & Digital Communication",

    unit4:
      "Unit 4 — Systems Analysis & Digital Solutions",

    final:
      "Final — Integrated ICT Challenge"

  };

  return names[unitKey] || unitKey;
}


/* =========================================================
   PROFILE UI
   ========================================================= */

function showLearnerProfile() {

  const container =
    document.querySelector(
      "#learner-profile"
    );

  if (!container) {
    return;
  }

  const existing =
    getLearnerProfile();

  container.innerHTML = `
    <div class="profile-card">

      <div class="profile-heading">
        <p class="eyebrow">Learner Profile</p>

        <h2>
          ${existing
            ? "Your learner details"
            : "Set up your learner profile"}
        </h2>

        <p>
          Your details are used to identify your
          assessment progress. They are saved on
          this device and used when synchronising
          results.
        </p>
      </div>

      <div class="profile-form">

        <label>
          <span>Full Name</span>

          <input
            id="learner-name"
            type="text"
            autocomplete="name"
            placeholder="Enter your full name"
            value="${existing?.name || ""}"
          >
        </label>

        <label>
          <span>Learner ID</span>

          <input
            id="learner-id"
            type="text"
            placeholder="e.g. S5-001"
            value="${existing?.learnerId || ""}"
          >
        </label>

        <label>
          <span>Class</span>

          <input
            id="learner-class"
            type="text"
            placeholder="e.g. S.5"
            value="${existing?.className || ""}"
          >
        </label>

        <button
          id="save-profile"
          class="btn btn-primary"
          type="button"
        >
          ${existing
            ? "Update Profile"
            : "Save Profile"}
        </button>

        <div
          id="profile-message"
          class="feedback"
          aria-live="polite"
        ></div>

      </div>

    </div>
  `;

  document
    .querySelector("#save-profile")
    ?.addEventListener(
      "click",
      saveProfileFromForm
    );
}


async function saveProfileFromForm() {

  const name =
    document
      .querySelector("#learner-name")
      ?.value
      .trim();

  const learnerId =
    document
      .querySelector("#learner-id")
      ?.value
      .trim();

  const className =
    document
      .querySelector("#learner-class")
      ?.value
      .trim();

  const message =
    document.querySelector(
      "#profile-message"
    );


  if (!name || !learnerId || !className) {

    message.className =
      "feedback error";

    message.textContent =
      "Please complete all learner details.";

    return;
  }


  const profile = {

    name,

    learnerId,

    className,

    savedAt:
      new Date().toISOString()

  };


  saveLearnerProfile(
    profile
  );


  message.className =
    "feedback success";

  message.textContent =
    "Profile saved successfully.";


  const result =
    await registerLearnerOnline(
      profile
    );


  if (result.offline) {

    message.innerHTML =
      "Profile saved on this device. " +
      "It will be registered online when " +
      "an internet connection is available.";

  } else if (result.success) {

    message.textContent =
      "Profile saved and registered successfully.";

  }
}


/* =========================================================
   PAGE INITIALISATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    showLearnerProfile();

    const unitGrid =
      document.querySelector(
        "#assessment-unit-grid"
      );

    if (
      unitGrid &&
      window.ASSESSMENT_DATA
    ) {

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


      const total =
        Object.values(
          ASSESSMENT_DATA
        )
        .flat()
        .length;


      const done =
        Object.values(progress)
          .filter(
            x => x?.completed
          )
          .length;


      unitGrid.innerHTML =
        units.map(
          ([
            key,
            num,
            title,
            desc
          ]) => {

            const qs =
              ASSESSMENT_DATA[key] || [];


            const completed =
              qs.filter(
                q =>
                  progress[q.id]
                    ?.completed
              ).length;


            const percent =
              qs.length
                ? Math.round(
                    completed /
                    qs.length *
                    100
                  )
                : 0;


            return `
              <a
                class="unit-card"
                href="green-valley/${
                  key === "final"
                    ? "final-task"
                    : key.replace(
                        "unit",
                        "unit-"
                      )
                }.html"
              >

                <span class="unit-number">
                  ${num}
                </span>

                <h3>
                  ${title}
                </h3>

                <p>
                  ${desc}
                </p>

                <div class="progress-shell">
                  <div
                    class="progress-bar"
                    style="width:${percent}%"
                  ></div>
                </div>

                <small>
                  ${completed}/${qs.length}
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
          `${
            total
              ? Math.round(
                  done /
                  total *
                  100
                )
              : 0
          }%`;

      }


      const txt =
        document.querySelector(
          "#overall-progress-text"
        );


      if (txt) {

        txt.textContent =
          `${
            total
              ? Math.round(
                  done /
                  total *
                  100
                )
              : 0
          }% complete`;

      }

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
   QUIZ ENGINE
   ========================================================= */

function startQuiz(
  unitKey,
  mount
) {

  const questions =
    ASSESSMENT_DATA[unitKey] || [];


  if (!questions.length) {

    mount.innerHTML =
      `<div class="empty-state">
        No questions have been added to this unit yet.
      </div>`;

    return;

  }


  const profile =
    getLearnerProfile();


  if (!profile) {

    mount.innerHTML = `
      <div class="info-card">

        <p class="eyebrow">
          Learner profile required
        </p>

        <h2>
          Please return to the Assessment Lab
        </h2>

        <p>
          Save your learner profile before
          starting an assessment.
        </p>

        <a
          class="btn btn-primary"
          href="../assessments/index.html"
        >
          Assessment Lab
        </a>

      </div>
    `;

    return;

  }


  let index = 0;

  let score = 0;

  let submitted = false;

  let questionResults = [];

  let startTime =
    Date.now();


  function render() {

    const q =
      questions[index];

    submitted =
      false;


    mount.innerHTML = `

      <div class="quiz-top">

        <span>
          Question ${index + 1}
          of ${questions.length}
        </span>

        <span>
          ${q.marks} marks
        </span>

      </div>


      <div class="progress-shell">

        <div
          class="progress-bar"
          style="
            width:${
              index /
              questions.length *
              100
            }%
          "
        ></div>

      </div>


      <article class="quiz-card">

        <div class="question-meta">

          <span class="badge">
            ${q.topic}
          </span>

          <span class="muted">
            ${q.level}
          </span>

        </div>


        <div class="scenario">

          <strong>
            Scenario
          </strong>

          <p>
            ${q.scenario}
          </p>

        </div>


        <h2>
          ${q.question}
        </h2>


        <div class="options">

          ${q.options.map(
            (o, i) => `
              <label class="option">

                <input
                  type="radio"
                  name="answer"
                  value="${i}"
                >

                <span>
                  ${o}
                </span>

              </label>
            `
          ).join("")}

        </div>


        <button
          id="submit-answer"
          class="btn btn-primary"
          type="button"
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


    document
      .querySelector(
        "#submit-answer"
      )
      ?.addEventListener(
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


    submitted =
      true;


    const q =
      questions[index];


    const chosen =
      Number(
        selected.value
      );


    const correct =
      chosen === q.answer;


    const marks =
      correct
        ? q.marks
        : 0;


    if (correct) {

      score += q.marks;

    }


    /* -----------------------------------------------------
       Store question result for this attempt
       ----------------------------------------------------- */

    questionResults.push({

      questionId:
        q.id,

      unit:
        unitKey,

      topic:
        q.topic,

      level:
        q.level,

      correct,

      marks,

      maxMarks:
        q.marks

    });


    /* -----------------------------------------------------
       Preserve existing local progress
       ----------------------------------------------------- */

    const progress =
      getProgress();


    progress[q.id] = {

      completed:
        true,

      correct,

      score:
        marks,

      date:
        new Date().toISOString()

    };


    saveProgress(
      progress
    );


    document
      .querySelectorAll(
        ".option"
      )
      .forEach(
        (el, i) => {

          if (
            i === q.answer
          ) {

            el.classList.add(
              "correct"
            );

          }


          if (
            i === chosen &&
            !correct
          ) {

            el.classList.add(
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
        ${
          correct
            ? "Correct!"
            : "Not quite."
        }
      </strong>

      <p>
        ${q.explanation}
      </p>

      <div class="model-answer">

        <strong>
          Model response:
        </strong>

        ${q.model}

      </div>

      <button
        id="next-question"
        class="btn btn-secondary"
        type="button"
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
      index >=
      questions.length
    ) {

      finish();

    } else {

      render();

    }

  }


  async function finish() {

    const max =
      questions.reduce(
        (sum, q) =>
          sum + q.marks,
        0
      );


    const pct =
      max
        ? Math.round(
            score /
            max *
            100
          )
        : 0;


    const durationSeconds =
      Math.max(
        0,
        Math.round(
          (
            Date.now() -
            startTime
          ) / 1000
        )
      );


    const duration =
      formatDuration(
        durationSeconds
      );


    const attempt = {

      attemptId:
        generateAttemptId(
          unitKey
        ),

      learnerId:
        profile.learnerId,

      name:
        profile.name,

      className:
        profile.className,

      assessment:
        assessmentTitle(
          unitKey
        ),

      score,

      maxMarks:
        max,

      percentage:
        pct,

      duration,

      results:
        questionResults,

      completedAt:
        new Date().toISOString()

    };


    /* -----------------------------------------------------
       Send to Google Sheets
       ----------------------------------------------------- */

    const syncResult =
      await submitAssessmentAttempt(
        attempt
      );


    let syncMessage;


    if (
      syncResult.success
    ) {

      syncMessage =
        `
          <div class="sync-success">
            ✓ Your result has been
            synchronised successfully.
          </div>
        `;

    } else {

      syncMessage =
        `
          <div class="sync-pending">
            ✓ Your result is saved on this
            device and will be synchronised
            when an internet connection is
            available.
          </div>
        `;

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
          ${pct}%
        </h2>


        <p>

          ${
            pct >= 80
              ? "Excellent work. Keep stretching your application and analysis skills."
              : pct >= 50
                ? "Good foundation. Review the feedback and attempt the unit again."
                : "Keep practising. Review the model responses and retry the unit."
          }

        </p>


        ${syncMessage}


        <div class="button-row">

          <button
            id="retry"
            class="btn btn-primary"
            type="button"
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
      .querySelector(
        "#retry"
      )
      ?.addEventListener(
        "click",
        () => {

          index = 0;

          score = 0;

          questionResults = [];

          startTime =
            Date.now();

          render();

        }
      );

  }


  render();

}


/* =========================================================
   DURATION
   ========================================================= */

function formatDuration(
  seconds
) {

  const minutes =
    Math.floor(
      seconds / 60
    );


  const remaining =
    seconds % 60;


  if (!minutes) {

    return `${remaining}s`;

  }


  return `${minutes}m ${String(
    remaining
  ).padStart(2, "0")}s`;

    }
