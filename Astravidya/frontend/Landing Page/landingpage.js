document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Update the URL to reflect the selected section
            history.replaceState(null, "", targetId);
        }
    });
});

// Make sure the page starts at the top when opened
window.addEventListener("load", function () {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});