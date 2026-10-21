function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const adminId = document.getElementById("loginId").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!adminId || !password) {
        alert("Please enter Admin ID and password.");
        return;
    }

    alert("Login UI is working. Backend authentication is not connected yet.");
});