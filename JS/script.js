function validateForm(event) {
    event.preventDefault();


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validate inputs
    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    var hashedPassword = sha256(password);

    // Store username
    sessionStorage.setItem("username", username);
    window.location.href = "dashboard.html";
}

// Check if the user is logged in on the dashboard page
if (window.location.href.includes("dashboard.html")) {
    var username = sessionStorage.getItem("username");
    if (username) {
        document.getElementById("userData").innerHTML = "Logged in as: " + username;
    } else {
        window.location.href = "Login.html";
    }
}

async function sha256(plainText) {
    var encoder = new TextEncoder();
    var data = encoder.encode(plainText);
    var buffer = await crypto.subtle.digest("SHA-256", data);
    var hexCodes = Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
        return byte.toString(16).padStart(2, "0");
    });
    return hexCodes.join("");
}

