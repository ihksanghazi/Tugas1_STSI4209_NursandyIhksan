var loginForm = document.getElementById("loginForm");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginButton");
var togglePassword = document.getElementById("togglePassword");
var forgotPasswordButton = document.getElementById("forgotPasswordButton");
var registerButton = document.getElementById("registerButton");
var modalOverlay = document.getElementById("modalOverlay");
var modalTitle = document.getElementById("modalTitle");
var modalMessage = document.getElementById("modalMessage");
var closeModalButton = document.getElementById("closeModalButton");
var modalOkButton = document.getElementById("modalOkButton");

function isEmailValid(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function findUser(email, password) {
    return dataPengguna.find(function (pengguna) {
        return pengguna.email === email && pengguna.password === password;
    });
}

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.classList.add("show");
    modalOverlay.setAttribute("aria-hidden", "false");
}

function closeModal() {
    modalOverlay.classList.remove("show");
    modalOverlay.setAttribute("aria-hidden", "true");
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();

    if (email === "" || password === "") {
        alert("Email dan password wajib diisi");
        return;
    }

    if (!isEmailValid(email)) {
        alert("Format email tidak valid");
        return;
    }

    var loggedInUser = findUser(email, password);

    if (!loggedInUser) {
        alert("email/password yang anda masukkan salah");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    loginButton.textContent = "Memproses...";
    loginButton.classList.add("loading");

    setTimeout(function () {
        window.location.href = "dashboard.html";
    }, 450);
});

togglePassword.addEventListener("click", function () {
    var isPasswordHidden = passwordInput.type === "password";

    passwordInput.type = isPasswordHidden ? "text" : "password";
    togglePassword.textContent = isPasswordHidden ? "Hide" : "Show";
    togglePassword.setAttribute(
        "aria-label",
        isPasswordHidden ? "Sembunyikan password" : "Tampilkan password"
    );
});

forgotPasswordButton.addEventListener("click", function () {
    showModal(
        "Lupa Password",
        "Silakan hubungi administrator SITTA untuk melakukan reset password akun Anda."
    );
});

registerButton.addEventListener("click", function () {
    showModal(
        "Daftar Akun",
        "Pendaftaran akun baru SITTA dilakukan melalui petugas atau administrator yang berwenang."
    );
});

closeModalButton.addEventListener("click", closeModal);
modalOkButton.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        closeModal();
    }
});
