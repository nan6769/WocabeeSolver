// Solver for "Transcribe" (Listen & Write) Exercise
window.Wocabee = window.Wocabee || {};
window.Wocabee.solvers = window.Wocabee.solvers || {};

window.Wocabee.solvers.transcribe = function (words, helpers, isStealth) {
  const container = document.getElementById('transcribe');
  if (!container || container.style.display === 'none') return false;

  const submitBtn = container.querySelector('#transcribeSubmitBtn');
  if (!submitBtn) return false;

  // The answer is the foreign-language word being dictated.
  // The hidden #a_word input holds the correct answer supplied by the page.
  const aWordVal = document.getElementById('a_word')?.value?.trim();
  const correctAnswer = aWordVal || null;

  if (!correctAnswer) return false;

  if (isStealth) {
    const hintElement = document.getElementById('wocabee-transcribe-hint');
    if (hintElement) hintElement.style.display = 'none';
    window.Wocabee.stealth?.setSolution(correctAnswer);
    return true;
  }

  let hintElement = document.getElementById('wocabee-transcribe-hint');
  if (!hintElement) {
    hintElement = document.createElement('div');
    hintElement.id = 'wocabee-transcribe-hint';
    hintElement.className = 'wocabee-translate-hint';
    submitBtn.parentNode.insertBefore(hintElement, submitBtn);
  }

  hintElement.textContent = correctAnswer;
  hintElement.style.display = 'block';
  return true;
};

