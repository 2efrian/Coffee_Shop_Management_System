document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginResult = document.getElementById('loginResult');

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = existingUsers.find(user => user.username === username && user.password === password);

    if (user) {
        loginResult.style.color = "green";
        loginResult.textContent = "Login successful!";
        // Redirect to the dashboard or another page
        setTimeout(() => {
            window.location.href = "Dashboard.html";
        }, 2000);
    } else {
        loginResult.style.color = "red";
        loginResult.textContent = "Invalid username or password.";
    }
});
