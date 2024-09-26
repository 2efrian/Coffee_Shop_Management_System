// Real-time clock feature similar to Dashboard.js
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

// Additional Settings functionalities
function enableProfileSettings() {
    console.log("Profile Settings enabled");
}

function enableAccountSettings() {
    console.log("Account Settings enabled");
}

function enableSecuritySettings() {
    console.log("Security Settings enabled");
}

function enableNotificationSettings() {
    console.log("Notification Settings enabled");
}

// Event listeners can be added here for interaction
document.querySelector('.nav-grid').addEventListener('click', (event) => {
    if (event.target.closest('.nav-item')) {
        console.log('Navigating to:', event.target.textContent);
    }
});
