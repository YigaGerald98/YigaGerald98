/* =========================================================
   PROWESS ICT ASSESSMENT
   LEARNER PROFILE + LOCAL-FIRST GOOGLE SHEETS SYNC
   ========================================================= */

const PROGRESS_SYNC_CONFIG = {

  API_URL:
    "https://script.google.com/macros/s/AKfycbzlXHjPZA3kibVH3-DmiecS1PW6lCoMIMWk-YtjeELrbWvYLGFBcOm3yVc8cCGBxiN85g/exec",

  PROFILE_KEY:
    "yg-assessment-learner-v1",

  PENDING_KEY:
    "yg-assessment-pending-v1"

};


/* =========================================================
   PROFILE
   ========================================================= */

function getLearnerProfile() {

  try {

    return JSON.parse(
      localStorage.getItem(
        PROGRESS_SYNC_CONFIG.PROFILE_KEY
      )
    ) || null;

  } catch (error) {

    console.error(
      "Could not read learner profile:",
      error
    );

    return null;

  }

}


function saveLearnerProfile(profile) {

  try {

    localStorage.setItem(
      PROGRESS_SYNC_CONFIG.PROFILE_KEY,
      JSON.stringify(profile)
    );

    return true;

  } catch (error) {

    console.error(
      "Could not save learner profile:",
      error
    );

    return false;

  }

}


function clearLearnerProfile() {

  localStorage.removeItem(
    PROGRESS_SYNC_CONFIG.PROFILE_KEY
  );

}


/* =========================================================
   PENDING ATTEMPTS
   ========================================================= */

function getPendingAttempts() {

  try {

    return JSON.parse(
      localStorage.getItem(
        PROGRESS_SYNC_CONFIG.PENDING_KEY
      )
    ) || [];

  } catch (error) {

    console.error(
      "Could not read pending attempts:",
      error
    );

    return [];

  }

}


function savePendingAttempts(attempts) {

  try {

    localStorage.setItem(
      PROGRESS_SYNC_CONFIG.PENDING_KEY,
      JSON.stringify(attempts)
    );

    return true;

  } catch (error) {

    console.error(
      "Could not save pending attempts:",
      error
    );

    return false;

  }

}


function queueAttempt(attempt) {

  const pending =
    getPendingAttempts();


  const exists =
    pending.some(
      item =>
        item.attemptId ===
        attempt.attemptId
    );


  if (!exists) {

    pending.push(attempt);

    savePendingAttempts(
      pending
    );

  }

}


/* =========================================================
   ATTEMPT ID
   ========================================================= */

function generateAttemptId(
  assessment
) {

  const now =
    new Date();


  const date =
    now.getFullYear().toString() +
    String(
      now.getMonth() + 1
    ).padStart(2, "0") +
    String(
      now.getDate()
    ).padStart(2, "0");


  const time =
    String(
      now.getHours()
    ).padStart(2, "0") +
    String(
      now.getMinutes()
    ).padStart(2, "0") +
    String(
      now.getSeconds()
    ).padStart(2, "0");


  const random =
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();


  return (
    `GV-${date}-${time}-${assessment}-${random}`
  );

}


/* =========================================================
   API REQUEST
   ========================================================= */

async function sendToAssessmentAPI(
  action,
  data
) {

  const payload =
    JSON.stringify({

      action,

      ...data

    });


  const body =
    new URLSearchParams();


  body.append(
    "payload",
    payload
  );


  const response =
    await fetch(
      PROGRESS_SYNC_CONFIG.API_URL,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/x-www-form-urlencoded;charset=UTF-8"

        },

        body:
          body.toString()

      }
    );


  if (!response.ok) {

    throw new Error(
      `Server returned HTTP ${response.status}`
    );

  }


  return await response.json();

}


/* =========================================================
   REGISTER LEARNER
   ========================================================= */

async function registerLearnerOnline(
  profile
) {

  try {

    return await sendToAssessmentAPI(
      "registerLearner",
      {

        learnerId:
          profile.learnerId,

        name:
          profile.name,

        className:
          profile.className

      }
    );

  } catch (error) {

    console.warn(
      "Learner registration unavailable:",
      error
    );


    return {

      success:
        false,

      offline:
        true,

      message:
        error.message

    };

  }

}


/* =========================================================
   SUBMIT COMPLETED ATTEMPT
   ========================================================= */

async function submitAssessmentAttempt(
  attempt
) {

  queueAttempt(
    attempt
  );


  if (!navigator.onLine) {

    updateSyncStatus();

    return {

      success:
        false,

      offline:
        true,

      queued:
        true

    };

  }


  try {

    const result =
      await sendToAssessmentAPI(
        "saveAttempt",
        {

          attemptId:
            attempt.attemptId,

          learnerId:
            attempt.learnerId,

          name:
            attempt.name,

          className:
            attempt.className,

          assessment:
            attempt.assessment,

          score:
            attempt.score,

          maxMarks:
            attempt.maxMarks,

          percentage:
            attempt.percentage,

          duration:
            attempt.duration

        }
      );


    if (!result.success) {

      throw new Error(
        result.message ||
        "Attempt could not be saved."
      );

    }


    await submitQuestionResults(
      attempt
    );


    removePendingAttempt(
      attempt.attemptId
    );


    updateSyncStatus();


    return result;

  } catch (error) {

    console.warn(
      "Assessment queued:",
      error
    );


    updateSyncStatus();


    return {

      success:
        false,

      offline:
        true,

      queued:
        true,

      message:
        error.message

    };

  }

}


/* =========================================================
   QUESTION RESULTS
   ========================================================= */

async function submitQuestionResults(
  attempt
) {

  if (
    !attempt.results ||
    !Array.isArray(
      attempt.results
    ) ||
    !attempt.results.length
  ) {

    return {

      success:
        true,

      count:
        0

    };

  }


  const result =
    await sendToAssessmentAPI(
      "saveQuestionResults",
      {

        attemptId:
          attempt.attemptId,

        learnerId:
          attempt.learnerId,

        results:
          attempt.results

      }
    );


  if (!result.success) {

    throw new Error(
      result.message ||
      "Question results could not be saved."
    );

  }


  return result;

}


/* =========================================================
   REMOVE PENDING
   ========================================================= */

function removePendingAttempt(
  attemptId
) {

  const remaining =
    getPendingAttempts()
      .filter(
        attempt =>
          attempt.attemptId !==
          attemptId
      );


  savePendingAttempts(
    remaining
  );

}


/* =========================================================
   SYNCHRONISE
   ========================================================= */

async function syncPendingAttempts() {

  const pending =
    getPendingAttempts();


  if (
    !pending.length ||
    !navigator.onLine
  ) {

    updateSyncStatus();

    return;

  }


  for (
    const attempt
    of [...pending]
  ) {

    try {

      const result =
        await sendToAssessmentAPI(
          "saveAttempt",
          {

            attemptId:
              attempt.attemptId,

            learnerId:
              attempt.learnerId,

            name:
              attempt.name,

            className:
              attempt.className,

            assessment:
              attempt.assessment,

            score:
              attempt.score,

            maxMarks:
              attempt.maxMarks,

            percentage:
              attempt.percentage,

            duration:
              attempt.duration

          }
        );


      if (
        !result.success
      ) {

        continue;

      }


      if (
        attempt.results?.length
      ) {

        const questionResult =
          await submitQuestionResults(
            attempt
          );


        if (
          !questionResult.success
        ) {

          continue;

        }

      }


      removePendingAttempt(
        attempt.attemptId
      );

    } catch (error) {

      console.warn(
        "Pending attempt still waiting:",
        attempt.attemptId,
        error
      );

    }

  }


  updateSyncStatus();

}


/* =========================================================
   STATUS
   ========================================================= */

function getSyncStatus() {

  return {

    pending:
      getPendingAttempts()
        .length,

    online:
      navigator.onLine

  };

}


function updateSyncStatus() {

  const status =
    document.querySelector(
      "#sync-status"
    );


  if (!status) {

    return;

  }


  const info =
    getSyncStatus();


  if (!info.online) {

    status.textContent =
      "Offline — progress saved on this device.";

    status.className =
      "sync-status offline";

  }

  else if (
    info.pending > 0
  ) {

    status.textContent =
      `Online — ${info.pending} assessment(s) waiting to sync.`;

    status.className =
      "sync-status pending";

  }

  else {

    status.textContent =
      "Online — progress synchronised.";

    status.className =
      "sync-status online";

  }

}


/* =========================================================
   NETWORK EVENTS
   ========================================================= */

window.addEventListener(
  "online",
  () => {

    updateSyncStatus();

    syncPendingAttempts();

  }
);


window.addEventListener(
  "offline",
  () => {

    updateSyncStatus();

  }
);


document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateSyncStatus();


    if (
      navigator.onLine
    ) {

      syncPendingAttempts();

    }

  }
);
