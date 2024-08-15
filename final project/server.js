const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];

app.post('/api/register', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        const user = { id: users.length + 1, name, email };
        users.push(user);
        res.status(201).json({ message: 'User registered successfully', user });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
