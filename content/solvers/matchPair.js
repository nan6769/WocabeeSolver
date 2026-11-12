// Solver for "Match Pair" Exercise (Označ správné dvojice)
window.Wocabee = window.Wocabee || {};
window.Wocabee.solvers = window.Wocabee.solvers || {};

window.Wocabee.solvers.matchPair = function (words, helpers, isStealth) {
  const container = document.getElementById('matchPair');
  if (!container || container.style.display === 'none') return false;

  // matchPairWords contains buttons that form pairs; each button has a w_id attribute
  // Buttons appear as a flat list; word-side and translation-side buttons share the same w_id
  const allButtons = Array.from(container.querySelectorAll('#matchPairWords button, #matchPairWords .matchPairWord'));
  if (allButtons.length === 0) return false;

  allButtons.forEach(btn => btn.classList.remove('wocabee-correct-answer'));

  // Build a map from w_id to [buttons]
  const byId = new Map();
  allButtons.forEach(btn => {
    const wId = btn.getAttribute('w_id');
    if (!wId) return;
    if (!byId.has(wId)) byId.set(wId, []);
    byId.get(wId).push(btn);
  });

  // For each id group, if the pair matches the word list, highlight both
  let matched = false;
  const stealthPairs = [];

  byId.forEach((btnGroup, wId) => {
    if (btnGroup.length < 2) return;
    const texts = btnGroup.map(b => b.textContent.trim()).filter(Boolean);
    if (texts.length < 2) return;

    // Check if any two texts in this group form a known pair
    let pairFound = false;
    for (let i = 0; i < texts.length && !pairFound; i++) {
      for (let j = i + 1; j < texts.length && !pairFound; j++) {
        if (helpers.isPairMatch(words, texts[i], texts[j])) {
          pairFound = true;
        }
      }
    }

    if (pairFound || byId.size > 0) {
      // Always highlight same-w_id pairs as correct (they are matched by the game)
      matched = true;
      if (!isStealth) {
        btnGroup.forEach(btn => btn.classList.add('wocabee-correct-answer'));
      } else {
        stealthPairs.push(`[${texts.join(' = ')}]`);
      }
    }
  });

  if (isStealth && stealthPairs.length > 0) {
    window.Wocabee.stealth?.setSolution(`Dvojice: ${stealthPairs.join(', ')}`);
  }

  return matched;
};

