// Solver for "Describe Picture" Exercise
window.Wocabee = window.Wocabee || {};
window.Wocabee.solvers = window.Wocabee.solvers || {};

window.Wocabee.solvers.describePicture = function (words, helpers, isStealth) {
  const container = document.getElementById('describePicture');
  if (!container || container.style.display === 'none') return false;

  const img = container.querySelector('#describePictureImg');
  const submitBtn = container.querySelector('#describePictureSubmitBtn');
  if (!img || !submitBtn) return false;

  let correctAnswer = null;

  // Try the legacy 'word' attribute directly on the image element
  const imgWord = img.getAttribute('word');
  if (imgWord) {
    correctAnswer = helpers.findTranslation(words, imgWord)
                 || imgWord; // use it as the answer itself if it matches directly
  }

  // New layout: image has no 'word' attribute — match by src against the hidden #pictures catalogue
  if (!correctAnswer) {
    const imgSrc = img.getAttribute('src');
    if (imgSrc) {
      // Normalise to just the filename for a robust comparison
      const imgFile = imgSrc.split('/').pop();
      const pictureCatalogue = document.querySelectorAll('#pictures .picture');
      for (const pic of pictureCatalogue) {
        const picSrc = pic.getAttribute('src') || '';
        if (picSrc.split('/').pop() === imgFile) {
          const picWord = pic.getAttribute('word');
          if (picWord) {
            correctAnswer = helpers.findTranslation(words, picWord) || picWord;
            break;
          }
        }
      }
    }
  }

  // Also try #a_word hidden input as a last resort
  if (!correctAnswer) {
    const aWordVal = document.getElementById('a_word')?.value?.trim();
    if (aWordVal) correctAnswer = aWordVal;
  }

  if (!correctAnswer) return false;

  if (isStealth) {
    const hintElement = document.getElementById('describePictureHint');
    if (hintElement) hintElement.style.display = 'none';
    window.Wocabee.stealth?.setSolution(correctAnswer);
    return true;
  }

  let hintElement = document.getElementById('describePictureHint');
  if (!hintElement) {
    hintElement = document.createElement('div');
    hintElement.id = 'describePictureHint';
    submitBtn.parentNode.insertBefore(hintElement, submitBtn.nextSibling);
  }

  hintElement.textContent = correctAnswer;
  hintElement.style.display = 'block';
  return true;
};
