/* ================================
   PASSWORD SHOW / HIDE
================================ */

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }

});


/* ================================
   LOGIN
================================ */

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const studentId =
        document.getElementById("studentId").value.trim();

    const password =
        document.getElementById("password").value.trim();


    if (studentId === "" || password === "") {

        loginMessage.textContent =
            "Please enter your Student ID and password.";

        loginMessage.style.color = "red";

        return;
    }


    /*
       FOR NOW:

       We are only testing the frontend.

       Later your teammate will connect this
       with the backend login API.
    */

    console.log("Student ID:", studentId);
    console.log("Password:", password);


    loginMessage.textContent =
        "Login request submitted!";

    loginMessage.style.color = "green";

});

/* ================================
   FORGOT PASSWORD
================================ */

const forgotPassword =
    document.getElementById("forgotPassword");

forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    alert(
        "Please contact your school/teacher to reset your password."
    );

});