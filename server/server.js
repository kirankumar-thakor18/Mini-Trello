const express = require('express');
const path = require('path');
const { connectDB, getDB, ObjectId } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const VALID_STATUSES = ['todo', 'in_progress', 'done'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(express.static(path.join(__dirname, '..', 'public')));

const toTask = ({ _id, title, description, status, priority, due_date }) => ({
  id: _id.toString(),
  title,
  description,
  status,
  priority: priority || 'medium',
  due_date: due_date || null,
});

const toObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
};

const collection = () => getDB().collection('tasks');

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err && err.message });
  });

app.get(
  '/api/tasks',
  asyncHandler(async (req, res) => {
    const rows = await collection().find().sort({ _id: 1 }).toArray();
    res.json(rows.map(toTask));
  })
);

app.post(
  '/api/tasks',
  asyncHandler(async (req, res) => {
    const { title, description = '', priority, due_date } = req.body || {};

    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newPriority = priority !== undefined ? String(priority) : 'medium';
    if (!VALID_PRIORITIES.includes(newPriority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }

    const newDueDate =
      due_date !== undefined && String(due_date).trim() ? String(due_date).trim() : null;

    const result = await collection().insertOne({
      title: String(title).trim(),
      description: String(description).trim(),
      status: 'todo',
      priority: newPriority,
      due_date: newDueDate,
      created_at: new Date().toISOString(),
    });

    const row = await collection().findOne({ _id: result.insertedId });
    res.status(201).json(toTask(row));
  })
);

const updateTask = asyncHandler(async (req, res) => {
  const oid = toObjectId(req.params.id);
  if (!oid) {
    return res.status(400).json({ error: 'Invalid task id' });
  }

  const { status, title, description, priority, due_date } = req.body || {};

  const task = await collection().findOne({ _id: oid });
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const newStatus = status !== undefined ? String(status) : task.status;
  if (!VALID_STATUSES.includes(newStatus)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const newPriority = priority !== undefined ? String(priority) : task.priority || 'medium';
  if (!VALID_PRIORITIES.includes(newPriority)) {
    return res.status(400).json({ error: 'Invalid priority' });
  }

  const newDueDate =
    due_date !== undefined
      ? String(due_date).trim()
        ? String(due_date).trim()
        : null
      : task.due_date || null;

  const newTitle =
    title !== undefined && String(title).trim() ? String(title).trim() : task.title;
  const newDescription =
    description !== undefined ? String(description).trim() : task.description;

  await collection().updateOne(
    { _id: oid },
    {
      $set: {
        status: newStatus,
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        due_date: newDueDate,
      },
    }
  );

  const updated = await collection().findOne({ _id: oid });
  res.json(toTask(updated));
});

app.patch('/api/tasks/:id', updateTask);
app.put('/api/tasks/:id', updateTask);

app.delete(
  '/api/tasks/:id',
  asyncHandler(async (req, res) => {
    const oid = toObjectId(req.params.id);
    if (!oid) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    const task = await collection().findOne({ _id: oid });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await collection().deleteOne({ _id: oid });
    res.status(204).end();
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Mini-Trello server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error(
      'On Render: make sure MONGODB_URI is set in the dashboard, and that your ' +
        'Atlas cluster allows connections from anywhere (IP Access List: 0.0.0.0/0).'
    );
    process.exit(1);
  });