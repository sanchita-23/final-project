const apiBaseUrl = 'http://localhost:5000/api';  // Backend API base URL

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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'User registered successfully') {
                // Move to the dashboard immediately after successful registration
                moveToDashboard();
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter your name and email');
    }
}

function moveToDashboard() {
    // Hide the registration form
    document.getElementById('register-box').style.display = 'none';
    
    // Show the dashboard
    document.getElementById('dashboard').style.display = 'flex';
}

let totalAmount = 0;

function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const creditDebit = document.getElementById('creditDebit').value;

    if (expenseName && amount && !isNaN(amount)) {
        const history = document.getElementById('history');
        const listItem = document.createElement('li');
        const expenseAmount = creditDebit === 'debit' ? -amount : amount;

        listItem.textContent = `${expenseName} - $${expenseAmount}`;
        history.appendChild(listItem);

        totalAmount += expenseAmount;
        document.getElementById('total').textContent = `Total - $${totalAmount}`;
    } else {
        alert('Please fill out all fields correctly.');
    }
}
