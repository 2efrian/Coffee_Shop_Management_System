document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // Example: Function to load products from the server
    async function loadProducts() {
        const response = await fetch('/api/products');
        const products = await response.json();
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.type}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>${product.price}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Example: Function to add a new product
    async function addProduct(product) {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            loadProducts(); // Reload products after adding
        } else {
            console.error('Error adding product');
        }
    }

    // Example: Call addProduct with some data
    // addProduct({
    //     productId: '016',
    //     productName: 'New Coffee',
    //     type: 'Coffee',
    //     description: 'A new type of coffee.',
    //     stock: 30,
    //     price: 'Rp. 20.000'
    // });

    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    setInterval(updateClock, 1000); // Update the clock every second
    updateClock(); // Initial call to display clock immediately
    
});
