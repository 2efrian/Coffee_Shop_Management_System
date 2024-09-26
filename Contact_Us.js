document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    let result = `Message sent by ${name} (${email}): ${message}`;
    
    document.getElementById("contactResult").innerText = result;
});
