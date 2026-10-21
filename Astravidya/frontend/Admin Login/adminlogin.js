const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("togglePassword");

// Show or hide password
toggleButton.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    toggleButton.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});

// Login form
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const adminId = document.getElementById("adminId").value.trim();
    const password = passwordInput.value;

    if (!adminId || !password) {
        alert("Please enter Admin ID and password.");
        return;
    }

    alert("Login UI is working. Backend authentication is not connected yet.");
});

// Forgot password
document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();

    alert("Forgot Password functionality will be connected to the backend.");
});