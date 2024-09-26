document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const signUpResult = document.getElementById('signUpResult');

    if (newPassword !== confirmPassword) {
        signUpResult.textContent = "Passwords do not match.";
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (existingUsers.some(user => user.username === newUsername)) {
        signUpResult.textContent = "Username already exists.";
        return;
    }

    existingUsers.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    signUpResult.style.color = "green";
    signUpResult.textContent = "Sign up successful! You can now login.";

    // Optionally, redirect to login page
    setTimeout(() => {
        window.location.href = "Login.html";
    }, 2000);
});
