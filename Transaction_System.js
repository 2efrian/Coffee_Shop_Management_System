function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('real-time-clock').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately

document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPrice = parseFloat(document.getElementById('totalPrice').value);
    const cashGiven = parseFloat(document.getElementById('cashGiven').value);
    const changeReturned = parseFloat(document.getElementById('changeReturned').value);

    // Process the transaction
    processTransaction(productId, productName, quantity, unitPrice, totalPrice, cashGiven, changeReturned);
});

document.getElementById('calculateTotal').addEventListener('click', function() {
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPrice = unitPrice * quantity;
    document.getElementById('totalPrice').value = totalPrice;

    const cashGiven = parseFloat(document.getElementById('cashGiven').value);
    const changeReturned = cashGiven - totalPrice;
    document.getElementById('changeReturned').value = changeReturned;
});

function processTransaction(productId, productName, quantity, unitPrice, totalPrice, cashGiven, changeReturned) {
    // Fetch inventory data
    fetch('Product_Inventory.json')
        .then(response => response.json())
        .then(inventory => {
            const product = inventory.products.find(p => p.id === productId);
            
            if (product && product.stock >= quantity) {
                // Update inventory
                product.stock -= quantity;
                updateInventory(inventory);

                // Log sale
                logSale(productId, productName, quantity, unitPrice, totalPrice);

                // Display success message
                document.getElementById('transactionResult').innerText = 
                    `Transaction successful! ${quantity} units of ${productName} sold. Change returned: ${changeReturned}`;

            } else {
                document.getElementById('transactionResult').innerText = 
                    'Transaction failed! Insufficient stock.';
            }
        });
}

function updateInventory(inventory) {
    // Update inventory in Product_Inventory.json
    fetch('Product_Inventory.json', {
        method: 'POST', // or PUT
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventory)
    });
}

function logSale(productId, productName, quantity, unitPrice, totalPrice) {
    // Fetch existing sales data
    fetch('Sold_Products.json')
        .then(response => response.json())
        .then(sales => {
            const sale = {
                productId: productId,
                productName: productName,
                quantity: quantity,
                unitPrice: unitPrice,
                totalPrice: totalPrice,
                date: new Date().toISOString()
            };
            sales.push(sale);

            // Update sales data
            fetch('Sold_Products.json', {
                method: 'POST', // or PUT
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sales)
            });
        });
}

// Reset form and clear results
document.getElementById('resetTransaction').addEventListener('click', function() {
    document.getElementById('transactionResult').innerText = '';
});

// Redirect to sales report page
document.querySelector('.view-sales-report').addEventListener('click', function() {
    window.location.href = 'Sold_Products.html';
});
