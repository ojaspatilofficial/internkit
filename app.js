/* ── SVG gradient for readiness ring (injected inline) ── */
document.body.insertAdjacentHTML('beforeend', `
<svg width="0" height="0" style="position:absolute">
  <defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
</svg>`);

/* ══════════════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════════════ */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function getStoredTheme() {
  return localStorage.getItem('siat-theme') || 'dark';
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('siat-theme', theme);
}

applyTheme(getStoredTheme());

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ══════════════════════════════════════════════
   CGPA CONVERTER
══════════════════════════════════════════════ */
function getGradeInfo(pct) {
  if (pct >= 90) return { label: '🏆 Outstanding', bg: 'rgba(16,185,129,0.15)', color: '#10b981' };
  if (pct >= 75) return { label: '🌟 Distinction',  bg: 'rgba(99,102,241,0.15)', color: '#818cf8' };
  if (pct >= 60) return { label: '👍 First Class',  bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' };
  if (pct >= 45) return { label: '✅ Pass',          bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' };
  return                 { label: '⚠️ Below Average', bg: 'rgba(239,68,68,0.12)',  color: '#ef4444' };
}

function convertCGPA() {
  const input     = document.getElementById('cgpaInput');
  const errorEl   = document.getElementById('cgpa-error');
  const resultEl  = document.getElementById('cgpa-result');
  const outputEl  = document.getElementById('percentageOutput');
  const formulaEl = document.getElementById('formulaDisplay');
  const badgeEl   = document.getElementById('gradeBadge');
  const scaleEl   = document.getElementById('scaleFill');

  const raw  = input.value.trim();
  const cgpa = parseFloat(raw);

  errorEl.textContent = '';
  resultEl.classList.add('hidden');

  if (raw === '') {
    errorEl.textContent = '⚠️ Please enter a CGPA value.';
    input.focus();
    return;
  }
  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    errorEl.textContent = '⚠️ CGPA must be a number between 0.00 and 10.00.';
    input.focus();
    return;
  }

  const percentage = (cgpa * 9.5).toFixed(2);
  const grade      = getGradeInfo(parseFloat(percentage));

  outputEl.textContent  = `${percentage}%`;
  formulaEl.textContent = `Percentage = ${cgpa} × 9.5 = ${percentage}%`;

  badgeEl.textContent       = grade.label;
  badgeEl.style.background  = grade.bg;
  badgeEl.style.color       = grade.color;

  scaleEl.style.width = `${(cgpa / 10) * 100}%`;

  resultEl.classList.remove('hidden');
  showToast(`✅ ${cgpa} CGPA → ${percentage}%`);
}

document.getElementById('cgpaInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') convertCGPA();
});

/* ══════════════════════════════════════════════
   CHECKLIST
══════════════════════════════════════════════ */
const CHECKLIST_ITEMS = [
  { id: 'resume',    emoji: '📄', label: 'Resume ready' },
  { id: 'portfolio', emoji: '🌐', label: 'Portfolio link ready' },
  { id: 'linkedin',  emoji: '💼', label: 'LinkedIn profile updated' },
  { id: 'noc',       emoji: '📋', label: 'NOC / college permission available' },
  { id: 'college',   emoji: '🎓', label: 'College details filled correctly' },
  { id: 'email',     emoji: '📧', label: 'Professional email ID created' },
];

let checkState = {};

function loadCheckState() {
  try {
    const stored = localStorage.getItem('siat-checklist');
    checkState = stored ? JSON.parse(stored) : {};
  } catch {
    checkState = {};
  }
}

function saveCheckState() {
  localStorage.setItem('siat-checklist', JSON.stringify(checkState));
}

function renderChecklist() {
  const list = document.getElementById('checklistItems');
  list.innerHTML = '';

  CHECKLIST_ITEMS.forEach(item => {
    const checked = !!checkState[item.id];
    const li = document.createElement('li');
    li.className = `checklist-item${checked ? ' checked' : ''}`;
    li.setAttribute('role', 'checkbox');
    li.setAttribute('aria-checked', checked);
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', item.label);
    li.dataset.id = item.id;

    li.innerHTML = `
      <div class="check-box">
        <svg class="check-icon" width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3.5 3.5L10 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="item-emoji" aria-hidden="true">${item.emoji}</span>
      <span class="item-label">${item.label}</span>`;

    li.addEventListener('click', () => toggleCheck(item.id));
    li.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleCheck(item.id); }
    });

    list.appendChild(li);
  });

  updateProgress();
}

function toggleCheck(id) {
  checkState[id] = !checkState[id];
  saveCheckState();
  renderChecklist();
}

function updateProgress() {
  const total     = CHECKLIST_ITEMS.length;
  const completed = Object.values(checkState).filter(Boolean).length;
  const pct       = Math.round((completed / total) * 100);

  document.getElementById('progressText').textContent = `${completed} / ${total} completed`;
  document.getElementById('progressPct').textContent  = `${pct}%`;

  const fill = document.getElementById('progressFill');
  fill.style.width = `${pct}%`;

  const bar = document.querySelector('.progress-bar');
  if (bar) {
    bar.setAttribute('aria-valuenow', pct);
  }

  updateReadinessScore(pct);
}

function resetChecklist() {
  checkState = {};
  saveCheckState();
  renderChecklist();
  showToast('🔄 Checklist reset');
}

function copyChecklist() {
  const lines = CHECKLIST_ITEMS.map(item => {
    const done = checkState[item.id] ? '[✓]' : '[ ]';
    return `${done} ${item.label}`;
  });
  const text = `Internship Application Checklist\n${'─'.repeat(35)}\n` + lines.join('\n');

  navigator.clipboard.writeText(text)
    .then(() => showToast('📋 Checklist copied to clipboard!'))
    .catch(() => showToast('❌ Could not copy. Try manually.'));
}

/* ══════════════════════════════════════════════
   READINESS SCORE RING
══════════════════════════════════════════════ */
function updateReadinessScore(pct) {
  const circumference = 2 * Math.PI * 24; // r=24 → ~150.8
  const offset = circumference - (pct / 100) * circumference;

  const ring   = document.getElementById('ringFill');
  const number = document.getElementById('scoreNumber');

  if (ring)   ring.style.strokeDashoffset = offset;
  if (number) number.textContent = `${pct}%`;
}

/* ══════════════════════════════════════════════
   NOTES / DEADLINE REMINDERS
══════════════════════════════════════════════ */
let notes = [];

function loadNotes() {
  try {
    const stored = localStorage.getItem('siat-notes');
    notes = stored ? JSON.parse(stored) : [];
  } catch {
    notes = [];
  }
}

function saveNotes() {
  localStorage.setItem('siat-notes', JSON.stringify(notes));
}

function renderNotes() {
  const list  = document.getElementById('notesList');
  const empty = document.getElementById('notes-empty');
  list.innerHTML = '';

  if (notes.length === 0) {
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.className = 'note-item';
    li.innerHTML = `
      <div class="note-dot"></div>
      <span class="note-text">${escapeHTML(note.text)}</span>
      <button class="note-delete" onclick="deleteNote(${index})" aria-label="Delete note: ${escapeHTML(note.text)}" title="Delete note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;
    list.appendChild(li);
  });
}

function addNote() {
  const input = document.getElementById('noteInput');
  const text  = input.value.trim();

  if (!text) {
    input.focus();
    showToast('⚠️ Please type a reminder first.');
    return;
  }
  if (text.length > 120) {
    showToast('⚠️ Note too long (max 120 characters).');
    return;
  }

  notes.unshift({ text, createdAt: Date.now() });
  saveNotes();
  renderNotes();
  input.value = '';
  input.focus();
  showToast('📝 Reminder added!');
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
  showToast('🗑️ Note removed');
}

function clearAllNotes() {
  if (notes.length === 0) { showToast('No notes to clear.'); return; }
  notes = [];
  saveNotes();
  renderNotes();
  showToast('🗑️ All notes cleared');
}

function handleNoteKeydown(e) {
  if (e.key === 'Enter') addNote();
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

/* ══════════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════════ */
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
(function init() {
  loadCheckState();
  renderChecklist();
  loadNotes();
  renderNotes();
  updateReadinessScore(0);
})();
