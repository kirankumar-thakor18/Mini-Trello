const API_BASE = '/api/tasks';

const STATUS_ORDER = ['todo', 'in_progress', 'done'];
const STATUS_LABELS = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

const els = {
  board: document.getElementById('board'),
  columns: {
    todo: document.getElementById('col-todo'),
    in_progress: document.getElementById('col-in_progress'),
    done: document.getElementById('col-done'),
  },
  counts: {
    todo: document.getElementById('count-todo'),
    in_progress: document.getElementById('count-in_progress'),
    done: document.getElementById('count-done'),
  },
  openCreateModal: document.getElementById('open-create-modal'),
  themeToggle: document.getElementById('theme-toggle'),
  searchInput: document.getElementById('search-input'),
  filterStatus: document.getElementById('filter-status'),
  stats: {
    total: document.getElementById('stat-total'),
    todo: document.getElementById('stat-todo'),
    inprogress: document.getElementById('stat-inprogress'),
    done: document.getElementById('stat-done'),
    overdue: document.getElementById('stat-overdue'),
  },
  modalOverlay: document.getElementById('modal-overlay'),
  modalTitle: document.getElementById('modal-title'),
  taskForm: document.getElementById('task-form'),
  taskTitle: document.getElementById('task-title'),
  taskDescription: document.getElementById('task-description'),
  modalError: document.getElementById('modal-error'),
  taskPriority: document.getElementById('task-priority'),
  taskDueDate: document.getElementById('task-due-date'),
  cancelCreate: document.getElementById('cancel-create'),
  submitBtn: document.getElementById('submit-btn'),
  toastContainer: document.getElementById('toast-container'),
  progressFill: document.getElementById('progress-fill'),
  connBanner: document.getElementById('conn-banner'),
  connRetry: document.getElementById('conn-retry'),
};

let tasks = [];
let editingId = null;
let dragTaskId = null;
let searchQuery = '';
let statusFilter = 'all';

async function api(url, options) {
  let res;
  try {
    res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch (err) {
    throw new Error(
      'Cannot reach server. Open the app at http://localhost:3000 (do not double-click index.html).'
    );
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Request failed');
  }
  return res.status === 204 ? null : res.json();
}

function toast(message, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = message;
  els.toastContainer.appendChild(el);
  requestAnimationFrame(() => el.classList.add('toast--show'));
  setTimeout(() => {
    el.classList.remove('toast--show');
    setTimeout(() => el.remove(), 300);
  }, 2500);
}

async function loadTasks() {
  try {
    tasks = await api(API_BASE);
    els.connBanner.hidden = true;
    render();
  } catch (err) {
    els.connBanner.hidden = false;
    toast(err.message, 'error');
  }
}

function cardTemplate(task) {
  const idx = STATUS_ORDER.indexOf(task.status);
  const hasPrev = idx > 0;
  const hasNext = idx < STATUS_ORDER.length - 1;
  const priority = PRIORITY_LABELS[task.priority] || 'Medium';
  const overdue = isOverdue(task);

  return `
    <div class="card" data-id="${task.id}" draggable="true">
      <div class="card__title">${escapeHtml(task.title)}</div>
      ${
        task.description
          ? `<div class="card__description">${escapeHtml(task.description)}</div>`
          : ''
      }
      <div class="card__meta">
        <span class="card__priority card__priority--${
          task.priority || 'medium'
        }">${priority}</span>
        ${
          task.due_date
            ? `<span class="card__due${
                overdue ? ' card__due--overdue' : ''
              }">📅 ${overdue ? 'Overdue: ' : ''}${formatDue(task.due_date)}</span>`
            : ''
        }
      </div>
      <div class="card__actions">
        <button class="btn btn--sm btn--ghost" data-action="prev" title="Move left" ${
          hasPrev ? '' : 'disabled'
        }>←</button>
        <button class="btn btn--sm btn--ghost" data-action="next" title="Move right" ${
          hasNext ? '' : 'disabled'
        }>→</button>
        <button class="btn btn--sm btn--ghost" data-action="edit" title="Edit task">✎</button>
        <span class="spacer"></span>
        <button class="btn btn--sm btn--danger" data-action="delete" title="Delete task">🗑</button>
      </div>
    </div>
  `;
}

function visibleTasks() {
  const q = searchQuery.trim().toLowerCase();
  return tasks.filter((t) => {
    const matchesSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
}

function isOverdue(task) {
  if (task.status === 'done' || !task.due_date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${task.due_date}T00:00:00`);
  return !Number.isNaN(due.getTime()) && due < today;
}

function formatDue(due) {
  const d = new Date(`${due}T00:00:00`);
  if (Number.isNaN(d.getTime())) return due;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function render() {
  const visible = visibleTasks();

  STATUS_ORDER.forEach((status) => {
    const container = els.columns[status];
    const columnTasks = visible.filter((t) => t.status === status);
    els.counts[status].textContent = columnTasks.length;

    if (columnTasks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-state__icon">📋</span>
          <span>No tasks here yet</span>
        </div>`;
    } else {
      container.innerHTML = columnTasks.map(cardTemplate).join('');
    }
  });

  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  els.progressFill.style.width = `${pct}%`;
  els.progressFill.textContent = `${pct}%`;

  els.stats.total.textContent = tasks.length;
  els.stats.todo.textContent = tasks.filter((t) => t.status === 'todo').length;
  els.stats.inprogress.textContent = tasks.filter((t) => t.status === 'in_progress').length;
  els.stats.done.textContent = doneCount;
  els.stats.overdue.textContent = tasks.filter(isOverdue).length;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function openModal(task = null) {
  editingId = task ? String(task.id) : null;
  els.modalTitle.textContent = task ? 'Edit Task' : 'Create New Task';
  els.submitBtn.textContent = task ? 'Save Changes' : 'Add Task';
  els.taskForm.reset();
  if (task) {
    els.taskTitle.value = task.title;
    els.taskDescription.value = task.description || '';
    els.taskPriority.value = task.priority || 'medium';
    els.taskDueDate.value = task.due_date || '';
  }
  els.modalError.hidden = true;
  els.modalOverlay.hidden = false;
  requestAnimationFrame(() => els.modalOverlay.classList.add('modal-overlay--show'));
  els.taskTitle.focus();
}

function closeModal() {
  els.modalOverlay.classList.remove('modal-overlay--show');
  setTimeout(() => {
    els.modalOverlay.hidden = true;
  }, 200);
}

async function handleSubmit(e) {
  e.preventDefault();
  const title = els.taskTitle.value.trim();
  const description = els.taskDescription.value.trim();

  if (!title) {
    showError('Title is required.');
    return;
  }

  hideError();
  els.submitBtn.disabled = true;
  els.submitBtn.textContent = editingId ? 'Saving…' : 'Adding…';

  try {
    const payload = {
      title,
      description,
      priority: els.taskPriority.value,
      due_date: els.taskDueDate.value || null,
    };

    if (editingId) {
      await api(`${API_BASE}/${editingId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
    } else {
      await api(API_BASE, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
    closeModal();
    toast(editingId ? 'Task updated' : 'Task created');
    await loadTasks();
  } catch (err) {
    showError(err.message);
  } finally {
    els.submitBtn.disabled = false;
    els.submitBtn.textContent = editingId ? 'Save Changes' : 'Add Task';
  }
}

function showError(message) {
  els.modalError.textContent = message;
  els.modalError.hidden = false;
}

function hideError() {
  els.modalError.hidden = true;
}

async function moveTask(id, direction) {
  const task = tasks.find((t) => t.id === String(id));
  if (!task) return;
  const idx = STATUS_ORDER.indexOf(task.status);
  const nextIdx = idx + direction;
  if (nextIdx < 0 || nextIdx >= STATUS_ORDER.length) return;

  try {
    await api(`${API_BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: STATUS_ORDER[nextIdx] }),
    });
    await loadTasks();
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  try {
    await api(`${API_BASE}/${id}`, { method: 'DELETE' });
    toast('Task deleted');
    await loadTasks();
  } catch (err) {
    toast(err.message, 'error');
  }
}

async function moveToColumn(id, newStatus) {
  const task = tasks.find((t) => t.id === String(id));
  if (!task || task.status === newStatus) return;

  try {
    await api(`${API_BASE}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
    toast(`Moved to "${STATUS_LABELS[newStatus]}"`);
    await loadTasks();
  } catch (err) {
    toast(err.message, 'error');
  }
}

els.board.addEventListener('click', async (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const card = btn.closest('.card');
  const id = card && card.getAttribute('data-id');
  if (!id) return;

  const action = btn.getAttribute('data-action');
  if (action === 'prev') await moveTask(id, -1);
  else if (action === 'next') await moveTask(id, 1);
  else if (action === 'edit') {
    const task = tasks.find((t) => t.id === String(id));
    if (task) openModal(task);
  } else if (action === 'delete') await deleteTask(id);
});

els.board.addEventListener('dragstart', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  dragTaskId = card.getAttribute('data-id');
  card.classList.add('card--dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', dragTaskId);
});

els.board.addEventListener('dragend', () => {
  dragTaskId = null;
  els.board.querySelectorAll('.card--dragging, .column--drop-target').forEach((el) =>
    el.classList.remove('card--dragging', 'column--drop-target')
  );
});

els.board.addEventListener('dragover', (e) => {
  const column = e.target.closest('.column');
  if (!column || !dragTaskId) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  els.board
    .querySelectorAll('.column--drop-target')
    .forEach((c) => c !== column && c.classList.remove('column--drop-target'));
  column.classList.add('column--drop-target');
});

els.board.addEventListener('drop', (e) => {
  e.preventDefault();
  const column = e.target.closest('.column');
  els.board
    .querySelectorAll('.column--drop-target')
    .forEach((c) => c.classList.remove('column--drop-target'));
  if (!column || !dragTaskId) return;
  moveToColumn(dragTaskId, column.getAttribute('data-status'));
});

els.openCreateModal.addEventListener('click', () => openModal());
els.connRetry.addEventListener('click', () => {
  els.connBanner.hidden = true;
  loadTasks();
});
els.searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  render();
});
els.filterStatus.addEventListener('change', (e) => {
  statusFilter = e.target.value;
  render();
});
els.cancelCreate.addEventListener('click', closeModal);
els.modalOverlay.addEventListener('click', (e) => {
  if (e.target === els.modalOverlay) closeModal();
});
els.taskForm.addEventListener('submit', handleSubmit);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !els.modalOverlay.hidden) closeModal();
});

/* ---------- Theme toggle ---------- */

const THEME_KEY = 'mini-trello-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  els.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

els.themeToggle.addEventListener('click', () => {
  const next =
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

loadTasks();