function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Simple login (modify username/password here)
    if (user === "admin" && pass === "1234") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMsg").innerText =
            "Invalid username or password!";
    }
}
