function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

document.getElementById("studentLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("studentPassword").value;

    if (!studentId || !password) {
        alert("Please enter your Student ID and password.");
        return;
    }

    alert("Student login UI is working. Backend authentication is not connected yet.");
});