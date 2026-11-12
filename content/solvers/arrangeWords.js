// Solver for "Arrange Words" (Uspořádej slova) Sentence Sorting Exercise
window.Wocabee = window.Wocabee || {};
window.Wocabee.solvers = window.Wocabee.solvers || {};

window.Wocabee.solvers.arrangeWords = function (words, helpers, isStealth) {
  const container = document.getElementById('arrangeWords');
  if (!container || container.style.display === 'none') return false;

  const submitBtn = container.querySelector('#arrangeWordsSubmitBtn');
  if (!submitBtn) return false;

  // #def-lang-sentence shows the source-language sentence to translate/arrange
  const sentenceBtn = container.querySelector('#def-lang-sentence');
  if (!sentenceBtn) return false;

  // The draggable word tokens are inside #sortableWords
  const wordTokens = Array.from(container.querySelectorAll('#sortableWords .word, #sortableWords [class*="word"], #sortableWords li, #sortableWords span, #sortableWords button'));
  if (wordTokens.length === 0) return false;

  // The correct order is determined by the hidden a_word input or by the
  // sequence the page originally rendered the tokens (data-index / data-order attribute).
  // We highlight the token that has the lowest remaining index (i.e. should be placed first).
  wordTokens.forEach(t => t.classList.remove('wocabee-correct-answer'));

  // Try to find any token that has a data-index / data-order = "0" (the first correct word)
  // The page may store the correct position in a data attribute.
  const correctFirst = wordTokens.find(t =>
    t.getAttribute('data-index') === '0' ||
    t.getAttribute('data-order') === '0' ||
    t.getAttribute('data-pos') === '0'
  );

  if (correctFirst) {
    if (!isStealth) {
      correctFirst.classList.add('wocabee-correct-answer');
    } else {
      window.Wocabee.stealth?.setSolution(`Prvé slovo: "${correctFirst.textContent.trim()}"`);
    }
    return true;
  }

  // Fallback: if the hidden a_word contains the full correct answer sentence,
  // show it as a hint.
  const aWordVal = document.getElementById('a_word')?.value?.trim();
  if (aWordVal) {
    if (isStealth) {
      window.Wocabee.stealth?.setSolution(aWordVal);
      return true;
    }

    let hintElement = document.getElementById('wocabee-arrange-hint');
    if (!hintElement) {
      hintElement = document.createElement('div');
      hintElement.id = 'wocabee-arrange-hint';
      hintElement.className = 'wocabee-translate-hint';
      submitBtn.parentNode.insertBefore(hintElement, submitBtn);
    }
    hintElement.textContent = aWordVal;
    hintElement.style.display = 'block';
    return true;
  }

  return false;
};

