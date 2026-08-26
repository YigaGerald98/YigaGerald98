const STORAGE_KEY = "yg-assessment-progress-v1";

function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

document.addEventListener("DOMContentLoaded", () => {
  const unitGrid = document.querySelector("#assessment-unit-grid");
  if (unitGrid && window.ASSESSMENT_DATA) {
    const units = [
      ["unit1","01","Computer Systems & Troubleshooting","Identify faults and apply systematic troubleshooting."],
      ["unit2","02","Data, Networks & Security","Apply networking, data and security concepts."],
      ["unit3","03","Productivity & Digital Communication","Apply office and digital communication skills."],
      ["unit4","04","Systems Analysis & Digital Solutions","Analyse requirements and evaluate solutions."],
      ["final","FINAL","Integrated ICT Challenge","Combine multiple ICT competencies."]
    ];
    const progress = getProgress();
    const total = Object.values(ASSESSMENT_DATA).flat().length;
    const done = Object.values(progress).filter(x => x?.completed).length;
    unitGrid.innerHTML = units.map(([key,num,title,desc]) => {
      const qs = ASSESSMENT_DATA[key] || [];
      const completed = qs.filter(q => progress[q.id]?.completed).length;
      const percent = qs.length ? Math.round(completed / qs.length * 100) : 0;
      return `<a class="unit-card" href="green-valley/${key === "final" ? "final-task" : key.replace("unit","unit-")}.html">
        <span class="unit-number">${num}</span><h3>${title}</h3><p>${desc}</p>
        <div class="progress-shell"><div class="progress-bar" style="width:${percent}%"></div></div><small>${completed}/${qs.length} completed</small>
      </a>`;
    }).join("");
    const overall = document.querySelector("#overall-progress");
    if (overall) overall.style.width = `${total ? Math.round(done/total*100) : 0}%`;
    const txt = document.querySelector("#overall-progress-text");
    if (txt) txt.textContent = `${total ? Math.round(done/total*100) : 0}% complete`;
  }

  const quiz = document.querySelector("#quiz-app");
  if (quiz) startQuiz(quiz.dataset.unit, quiz);
});

function startQuiz(unitKey, mount) {
  const questions = ASSESSMENT_DATA[unitKey] || [];
  if (!questions.length) { mount.innerHTML = `<div class="empty-state">No questions have been added to this unit yet.</div>`; return; }
  const progress = getProgress();
  let index = 0, score = 0, submitted = false;

  function render() {
    const q = questions[index];
    submitted = false;
    const previous = progress[q.id];
    mount.innerHTML = `
      <div class="quiz-top"><span>Question ${index+1} of ${questions.length}</span><span>${q.marks} marks</span></div>
      <div class="progress-shell"><div class="progress-bar" style="width:${(index/questions.length)*100}%"></div></div>
      <article class="quiz-card">
        <div class="question-meta"><span class="badge">${q.topic}</span><span class="muted">${q.level}</span></div>
        <div class="scenario"><strong>Scenario</strong><p>${q.scenario}</p></div>
        <h2>${q.question}</h2>
        <div class="options">${q.options.map((o,i)=>`<label class="option"><input type="radio" name="answer" value="${i}"><span>${o}</span></label>`).join("")}</div>
        <button id="submit-answer" class="btn btn-primary">Check answer</button>
        <div id="feedback" class="feedback" aria-live="polite"></div>
      </article>`;
    document.querySelector("#submit-answer").addEventListener("click", check);
    if (previous?.completed) {
      // Do not automatically reveal old answers; learner may practise again.
    }
  }

  function check() {
    if (submitted) return;
    const selected = document.querySelector('input[name="answer"]:checked');
    const feedback = document.querySelector("#feedback");
    if (!selected) { feedback.className = "feedback error"; feedback.innerHTML = "Choose an answer first."; return; }
    submitted = true;
    const q = questions[index], chosen = Number(selected.value), correct = chosen === q.answer;
    if (correct) score += q.marks;
    progress[q.id] = {completed:true, correct, score:correct ? q.marks : 0, date:new Date().toISOString()};
    saveProgress(progress);
    document.querySelectorAll(".option").forEach((el,i)=> {
      if (i === q.answer) el.classList.add("correct");
      if (i === chosen && !correct) el.classList.add("wrong");
    });
    feedback.className = `feedback ${correct ? "success" : "error"}`;
    feedback.innerHTML = `<strong>${correct ? "Correct!" : "Not quite."}</strong><p>${q.explanation}</p><div class="model-answer"><strong>Model response:</strong> ${q.model}</div>
      <button id="next-question" class="btn btn-secondary">${index === questions.length-1 ? "Finish unit" : "Next question →"}</button>`;
    document.querySelector("#next-question").addEventListener("click", next);
  }

  function next() {
    index++;
    if (index >= questions.length) finish();
    else render();
  }

  function finish() {
    const max = questions.reduce((sum,q)=>sum+q.marks,0);
    const pct = Math.round(score/max*100);
    mount.innerHTML = `<div class="result-card">
      <p class="eyebrow">Unit complete</p><h1>${score}/${max}</h1><h2>${pct}%</h2>
      <p>${pct >= 80 ? "Excellent work. Keep stretching your application and analysis skills." : pct >= 50 ? "Good foundation. Review the feedback and attempt the unit again." : "Keep practising. Review the model responses and retry the unit."}</p>
      <div class="button-row"><button id="retry" class="btn btn-primary">Retry unit</button><a class="btn btn-secondary" href="../../assessments/index.html">Assessment Lab</a></div>
    </div>`;
    document.querySelector("#retry").addEventListener("click", ()=>{index=0;score=0;render();});
  }
  render();
  }
