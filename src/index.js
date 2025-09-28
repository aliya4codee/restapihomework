const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory user storage
let users = [];

// Create a User
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get all Users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a User by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Update a User by ID
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
    user.email = email;
    res.json(user);
});

// Delete a User by ID
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(index, 1);
    res.status(204).send();
});

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;