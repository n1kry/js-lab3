let transactions = [];
let nextId = 1;

/**
 * Adds a new transaction.
 * @param {Event} event - The form submission event.
 */
function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    if (!date || isNaN(amount) || !category || !description) {
        alert('Please fill out all fields correctly');
        return;
    }

    const transaction = {
        id: nextId++,
        date: new Date(date).toLocaleString(),
        amount: amount,
        category: category,
        description: description
    };

    transactions.push(transaction);
    appendTransactionToTable(transaction);
    calculateTotal();
    document.getElementById('add-transaction-form').reset();
}

/**
 * Appends a transaction to the table.
 * @param {Object} transaction - The transaction to append.
 */
function appendTransactionToTable(transaction) {
    const tableBody = document.getElementById('transaction-table').querySelector('tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', transaction.id);

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="removeTransaction(${transaction.id})">Delete</button></td>
    `;

    row.classList.add(transaction.amount >= 0 ? 'green' : 'red');
    row.addEventListener('click', () => displayTransactionDetails(transaction));
    tableBody.appendChild(row);
}

/**
 * Removes a transaction.
 * @param {number} id - The ID of the transaction to remove.
 */
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const row = document.querySelector(`#transaction-table tr[data-id="${id}"]`);
    row.remove();
    calculateTotal();
}

/**
 * Calculates the total amount.
 */
function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => {
        return transaction.category === 'Income' ? sum + transaction.amount : sum - transaction.amount;
    }, 0);
    document.getElementById('total-amount').textContent = `Total: ${total}`;
}

/**
 * Displays the details of a transaction.
 * @param {Object} transaction - The transaction whose details to display.
 */
function displayTransactionDetails(transaction) {
    const details = document.getElementById('transaction-details');
    details.textContent = `ID: ${transaction.id}, Date: ${transaction.date}, Amount: ${transaction.amount}, Category: ${transaction.category}, Description: ${transaction.description}`;
}

document.getElementById('add-transaction-form').addEventListener('submit', addTransaction);