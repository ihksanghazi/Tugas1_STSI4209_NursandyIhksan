var greetingText = document.getElementById("greetingText");
var userInfo = document.getElementById("userInfo");
var reportDropdownButton = document.getElementById("reportDropdownButton");
var reportDropdownMenu = document.getElementById("reportDropdownMenu");
var menuToggle = document.getElementById("menuToggle");
var navMenu = document.getElementById("navMenu");

function getGreeting() {
    var currentHour = new Date().getHours();

    if (currentHour < 12) {
        return "Selamat pagi";
    }

    if (currentHour <= 17) {
        return "Selamat siang";
    }

    return "Selamat sore";
}

function getLoggedInUser() {
    var savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch (error) {
        localStorage.removeItem("loggedInUser");
        return null;
    }
}

var loggedInUser = getLoggedInUser();
var displayName = loggedInUser ? loggedInUser.nama : "Pengguna";

greetingText.textContent = getGreeting() + ", " + displayName;

if (loggedInUser) {
    userInfo.textContent =
        "Anda masuk sebagai " + loggedInUser.role + " - " + loggedInUser.lokasi + ".";
}

reportDropdownButton.addEventListener("click", function () {
    var dropdown = reportDropdownButton.closest(".dropdown");
    var isOpen = dropdown.classList.toggle("open");

    reportDropdownButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
});

document.addEventListener("click", function (event) {
    if (
        !reportDropdownButton.contains(event.target) &&
        !reportDropdownMenu.contains(event.target)
    ) {
        reportDropdownButton.closest(".dropdown").classList.remove("open");
        reportDropdownButton.setAttribute("aria-expanded", "false");
    }
});
