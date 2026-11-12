// Solver for "Add Missing Word" (Doplň chybějící slovo) Exercise
window.Wocabee = window.Wocabee || {};
window.Wocabee.solvers = window.Wocabee.solvers || {};

window.Wocabee.solvers.addMissingWord = function (words, helpers, isStealth) {
  const container = document.getElementById('addMissingWord');
  if (!container || container.style.display === 'none') return false;

  const submitBtn = container.querySelector('#addMissingWordSubmitBtn');
  if (!submitBtn) return false;

  // The page stores the correct missing word in the hidden #a_word input.
  // #q_sentence shows the question sentence (source language, with blank).
  // #a_sentence shows the target sentence (with the answer embedded, hidden from user).
  const aWordVal = document.getElementById('a_word')?.value?.trim();
  let correctAnswer = aWordVal || null;

  // Fallback: try to extract the missing word from #a_sentence if visible
  if (!correctAnswer) {
    const aSentence = container.querySelector('#a_sentence');
    if (aSentence) {
      const sentenceText = aSentence.textContent.trim();
      // Try matching any known word that appears in the answer sentence
      if (sentenceText && words) {
        for (const item of words) {
          if (sentenceText.toLowerCase().includes(item.word.toLowerCase())) {
            correctAnswer = item.word;
            break;
          }
          if (sentenceText.toLowerCase().includes(item.translation.toLowerCase())) {
            correctAnswer = item.translation;
            break;
          }
        }
      }
    }
  }

  if (!correctAnswer) return false;

  if (isStealth) {
    const hintElement = document.getElementById('wocabee-missing-word-hint');
    if (hintElement) hintElement.style.display = 'none';
    window.Wocabee.stealth?.setSolution(correctAnswer);
    return true;
  }

  let hintElement = document.getElementById('wocabee-missing-word-hint');
  if (!hintElement) {
    hintElement = document.createElement('div');
    hintElement.id = 'wocabee-missing-word-hint';
    hintElement.className = 'wocabee-translate-hint';
    submitBtn.parentNode.insertBefore(hintElement, submitBtn);
  }

  hintElement.textContent = correctAnswer;
  hintElement.style.display = 'block';
  return true;
};

