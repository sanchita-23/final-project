const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (assuming  use MongoDB for data storage)
mongoose.connect('mongodb://localhost:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// expense schema and model
const expenseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});
const Expense = mongoose.model('Expense', expenseSchema);

// User Registration API
app.post('/api/register', (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  newUser.save((err, user) => {
    if (err) return res.status(500).send('Error registering new user.');
    res.status(201).json({ message: 'User registered successfully', user });
  });
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send('Error fetching users.');
    res.status(200).json(users);
  });
});

// CRUD APIs for Expenses
app.post('/api/expenses', (req, res) => {
  const newExpense = new Expense(req.body);
  newExpense.save((err, expense) => {
    if (err) return res.status(500).send('Error adding expense.');
    res.status(201).json(expense);
  });
});

app.get('/api/expenses', (req, res) => {
  Expense.find({}, (err, expenses) => {
    if (err) return res.status(500).send('Error fetching expenses.');
    res.status(200).json(expenses);
  });
});

app.delete('/api/expenses/:id', (req, res) => {
  Expense.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.status(500).send('Error deleting expense.');
    res.status(200).send('Expense deleted successfully.');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

