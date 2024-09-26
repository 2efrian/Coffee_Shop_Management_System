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

window.addEventListener('scroll', function() {
    var section = document.querySelector('section');
    var footer = document.querySelector('footer');
    var sectionBottom = section.getBoundingClientRect().bottom;
    var windowHeight = window.innerHeight;

    if (sectionBottom <= windowHeight) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
});
