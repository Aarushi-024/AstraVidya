document.addEventListener("DOMContentLoaded", () => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const sidebar = $("#sidebar");
    const overlay = $("#sidebarOverlay");
    const toast = $("#toast");

    let toastTimer;
    let completedLessons = Number(
        localStorage.getItem("astraCompletedLessons") || 0
    );

    const assignments = [
        {
            title: "Mathematics practice",
            subject: "Mathematics",
            description: "Complete the practice questions",
            status: "Pending"
        },
        {
            title: "English reading",
            subject: "English",
            description: "Read and answer the questions",
            status: "Pending"
        }
    ];

    const quizzes = {
        math: [
            {
                question: "What is 5 + 3?",
                options: ["6", "8", "10"],
                answer: 1
            },
            {
                question: "What is 10 - 4?",
                options: ["5", "6", "7"],
                answer: 1
            },
            {
                question: "Which number comes after 19?",
                options: ["18", "20", "21"],
                answer: 1
            }
        ],
        english: [
            {
                question: "What is the opposite of 'happy'?",
                options: ["Sad", "Glad", "Cheerful"],
                answer: 0
            },
            {
                question: "Choose the correct spelling.",
                options: ["Frend", "Freind", "Friend"],
                answer: 2
            },
            {
                question: "Which word is a noun?",
                options: ["Quickly", "Book", "Run"],
                answer: 1
            }
        ]
    };

    // Student details for the frontend demonstration.
    // These can later be loaded from the backend.
    const student = {
        name: localStorage.getItem("astraStudentName") || "Student",
        studentClass: localStorage.getItem("astraStudentClass") || "My learning account"
    };

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    function getInitial(name) {
        return name.trim().charAt(0).toUpperCase() || "S";
    }

    function loadStudent() {
        const firstName = student.name.trim().split(/\s+/)[0] || "Student";

        $("#welcomeName").textContent = firstName;
        $("#headerStudentName").textContent = student.name;
        $("#headerStudentClass").textContent = student.studentClass;

        $("#profileName").textContent = student.name;
        $("#profileClass").textContent = student.studentClass;
        $("#profileFieldName").textContent = student.name;
        $("#profileFieldClass").textContent = student.studentClass;

        $("#profileAvatar").textContent = getInitial(student.name);
        $(".avatar").textContent = getInitial(student.name);

        const today = new Date();

        $("#currentDate").textContent = today.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        $("#currentYear").textContent = today.getFullYear();
    }

    function updateProgress() {
        const totalLessons = 12;
        const progress = Math.min(
            Math.round((completedLessons / totalLessons) * 100),
            100
        );

        $("#completedCount").textContent = completedLessons;
        $("#progressValue").textContent = progress + "%";
        $("#progressFill").style.width = progress + "%";
        $("#circleValue").textContent = progress + "%";

        $("#progressCircle").style.background =
            `conic-gradient(#6254d9 ${progress * 3.6}deg, #efedf8 0deg)`;

        $("#subjectCount").textContent = 4;

        if (completedLessons === 0) {
            $(".milestone-row p").textContent =
                "Complete your first lesson.";
        } else if (completedLessons < totalLessons) {
            $(".milestone-row p").textContent =
                `${totalLessons - completedLessons} lessons to reach your next goal.`;
        } else {
            $(".milestone-row p").textContent =
                "Amazing! You completed your learning goal.";
        }
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("visible");
    }

    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("visible");
    }

    function navigate(sectionName) {
        const section = document.getElementById(sectionName + "-section");

        if (!section) {
            showToast("This section is not available.");
            return;
        }

        $$(".page-section").forEach((page) => {
            page.classList.add("hidden");
        });

        section.classList.remove("hidden");

        $$(".nav-link").forEach((link) => {
            link.classList.toggle(
                "active",
                link.dataset.section === sectionName
            );
        });

        const selectedLink = document.querySelector(
            `.nav-link[data-section="${sectionName}"]`
        );

        $("#pageTitle").textContent = selectedLink
            ? selectedLink.querySelector("span:nth-child(2)").textContent
            : sectionName.charAt(0).toUpperCase() + sectionName.slice(1);

        closeSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Sidebar navigation.
    $$(".nav-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const sectionName = link.dataset.section;

            if (sectionName === "subjects") {
                navigate("dashboard");

                setTimeout(() => {
                    $("#subjects").scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 50);

                return;
            }

            navigate(sectionName);
        });
    });

    // Buttons that lead to a dashboard section.
    $$("[data-go]").forEach((button) => {
        button.addEventListener("click", () => {
            const destination = button.dataset.go;

            if (destination === "subjects") {
                navigate("dashboard");

                setTimeout(() => {
                    $("#subjects").scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 50);
            } else {
                navigate(destination);
            }
        });
    });

    // Mobile navigation.
    $("#menuButton").addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    overlay.addEventListener("click", closeSidebar);

    // Open announcements.
    $("#notificationButton").addEventListener("click", () => {
        navigate("dashboard");

        setTimeout(() => {
            $("#announcements").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 50);
    });

    // Open profile.
    $("#profileButton").addEventListener("click", () => {
        navigate("profile");
    });

    // Open a subject.
    $$("[data-subject]").forEach((button) => {
        button.addEventListener("click", () => {
            const subject = button.dataset.subject;

            showToast(`${subject} selected. Learning content will appear here.`);

            // Placeholder until subject lessons are connected.
        });
    });

    // Assignment interactions.
    $$("[data-assignment]").forEach((button) => {
        button.addEventListener("click", () => {
            const title = button.dataset.assignment;

            showToast(`Opening "${title}" — assignment content is not connected yet.`);
        });
    });

    function renderAssignments() {
        $("#pendingCount").textContent = assignments.filter(
            (item) => item.status === "Pending"
        ).length;

        $("#allAssignments").innerHTML = "";

        assignments.forEach((assignment) => {
            const card = document.createElement("article");
            card.className = "panel";

            const row = document.createElement("div");
            row.className = "assignment-item";

            const icon = document.createElement("div");
            icon.className = "assignment-icon assignment-purple";
            icon.textContent = assignment.subject === "Mathematics" ? "∑" : "Aa";

            const details = document.createElement("div");
            details.className = "assignment-details";

            const title = document.createElement("strong");
            title.textContent = assignment.title;

            const description = document.createElement("span");
            description.textContent = assignment.description;

            const status = document.createElement("small");
            status.textContent = `Status: ${assignment.status}`;

            details.append(title, description, status);

            const action = document.createElement("button");
            action.className = "small-action";
            action.textContent =
                assignment.status === "Pending" ? "Complete" : "Completed";

            action.disabled = assignment.status === "Completed";

            action.addEventListener("click", () => {
                assignment.status = "Completed";
                renderAssignments();
                showToast("Assignment marked complete in this demo.");
            });

            row.append(icon, details, action);
            card.append(row);
            $("#allAssignments").append(card);
        });

        $("#pendingCount").textContent = assignments.filter(
            (item) => item.status === "Pending"
        ).length;
    }

    // A simple, interactive sample quiz.
    function startQuiz(type) {
        const questions = quizzes[type];

        if (!questions) return;

        let questionIndex = 0;
        let score = 0;

        function displayQuestion() {
            const question = questions[questionIndex];

            const container = document.createElement("div");
            container.className = "panel quiz-question-panel";

            const heading = document.createElement("h2");
            heading.textContent =
                `Question ${questionIndex + 1} of ${questions.length}`;

            const prompt = document.createElement("p");
            prompt.textContent = question.question;
            prompt.style.margin = "15px 0";

            const options = document.createElement("div");
            options.style.display = "grid";
            options.style.gap = "10px";

            question.options.forEach((option, index) => {
                const choice = document.createElement("button");
                choice.className = "subject-button";
                choice.textContent = option;

                choice.addEventListener("click", () => {
                    if (index === question.answer) {
                        score++;
                    }

                    questionIndex++;

                    if (questionIndex < questions.length) {
                        displayQuestion();
                    } else {
                        displayResult();
                    }
                });

                options.append(choice);
            });

            container.append(heading, prompt, options);

            const quizSection = $("#quizzes-section");
            const oldQuiz = quizSection.querySelector(".quiz-question-panel");

            if (oldQuiz) oldQuiz.remove();

            quizSection.append(container);
            container.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        function displayResult() {
            const container = document.createElement("div");
            container.className = "panel quiz-question-panel";

            const heading = document.createElement("h2");
            heading.textContent = "Practice complete!";

            const result = document.createElement("p");
            result.textContent = `You scored ${score} out of ${questions.length}.`;
            result.style.margin = "15px 0";

            const retry = document.createElement("button");
            retry.className = "primary-button";
            retry.textContent = "Try again";

            retry.addEventListener("click", () => startQuiz(type));

            container.append(heading, result, retry);

            const quizSection = $("#quizzes-section");
            const oldQuiz = quizSection.querySelector(".quiz-question-panel");

            if (oldQuiz) oldQuiz.remove();

            quizSection.append(container);
            container.scrollIntoView({ behavior: "smooth", block: "center" });

            showToast("Your practice score is ready.");

            // Scores are not sent to a server in this frontend demo.
        }

        displayQuestion();
    }

    $$("[data-quiz]").forEach((button) => {
        button.addEventListener("click", () => {
            startQuiz(button.dataset.quiz);
        });
    });

    // Logout demonstration.
    $("#logoutButton").addEventListener("click", () => {
        const shouldLogout = window.confirm("Do you want to log out?");

        if (shouldLogout) {
            // Replace this path if your login page is elsewhere.
            window.location.href = "../Student%20Login/studentlogin.html";
        }
    });

    loadStudent();
    updateProgress();
    renderAssignments();
});