const apiBaseUrl = 'http://localhost:5000/api';  // Backend API base URL

// Registration function
function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
        fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                alert(`Registered successfully!`);
                // Move to the dashboard after successful registration
                document.getElementById('register-box').style.display = 'none';
                document.getElementById('dashboard').style.display = 'block';
                loadExpenses();
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter your name and email');
    }
}

// Function to add a new expense
function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (expenseName && !isNaN(amount)) {
        const newExpense = {
            name: expenseName,
            description: description,
            category: category,
            amount: amount
        };

        fetch(`${apiBaseUrl}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExpense)
        })
        .then(response => response.json())
        .then(expense => {
            addExpenseToHistory(expense);
            updateTotal();
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please fill out the expense name and amount');
    }
}

// Function to load and display expenses from the backend
function loadExpenses() {
    fetch(`${apiBaseUrl}/expenses`)
    .then(response => response.json())
    .then(expenses => {
        expenses.forEach(expense => addExpenseToHistory(expense));
        updateTotal();
    })
    .catch(error => console.error('Error:', error));
}

// Function to add an expense to the history list in the UI
function addExpenseToHistory(expense) {
    const history = document.getElementById('history');
    const listItem = document.createElement('li');
    listItem.textContent = `${expense.name} - $${expense.amount}`;
    listItem.setAttribute('data-id', expense._id);
    listItem.onclick = () => deleteExpense(expense._id);
    history.appendChild(listItem);
}

// Function to delete an expense
function deleteExpense(id) {
    fetch(`${apiBaseUrl}/expenses/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        const itemToRemove = document.querySelector(`li[data-id='${id}']`);
        itemToRemove.remove();
        updateTotal();
    })
    .catch(error => console.error('Error:', error));
}

// Function to update the total expenses for the current month
function updateTotal() {
    fetch(`${apiBaseUrl}/expenses`)
    .then(response => response.json())
    .then(expenses => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        document.getElementById('total').textContent = `Total for this month: $${total}`;
    })
    .catch(error => console.error('Error:', error));
}
