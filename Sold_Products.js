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

window.onload = function() {
    fetch('Sold_Products.json')
        .then(response => response.json())
        .then(sales => {
            const tbody = document.getElementById('salesReportBody');
            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.productId}</td>
                    <td>${sale.quantity}</td>
                    <td>${sale.totalPrice}</td>
                    <td>${sale.date}</td>
                `;
                tbody.appendChild(row);
            });
        });
}
