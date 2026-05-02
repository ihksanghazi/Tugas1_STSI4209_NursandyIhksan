var reportDropdownButton = document.getElementById("reportDropdownButton");
var reportDropdownMenu = document.getElementById("reportDropdownMenu");
var menuToggle = document.getElementById("menuToggle");
var navMenu = document.getElementById("navMenu");
var trackingForm = document.getElementById("trackingForm");
var nomorDOInput = document.getElementById("nomorDO");
var trackingButton = document.getElementById("trackingButton");
var trackingResult = document.getElementById("trackingResult");

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

function getProgressValue(data) {
    var totalSteps = 4;
    var perjalananLength = data.perjalanan ? data.perjalanan.length : 0;
    var progress = Math.round((perjalananLength / totalSteps) * 100);

    if (data.status.toLowerCase().includes("selesai") || data.status.toLowerCase().includes("sampai")) {
        return 100;
    }

    return Math.min(progress, 100);
}

function renderTrackingResult(data) {
    var progressValue = getProgressValue(data);
    var timelineItems = data.perjalanan.map(function (item, index) {
        var latestClass = index === data.perjalanan.length - 1 ? " latest" : "";

        return (
            '<li class="timeline-item' + latestClass + '">' +
            '<span class="timeline-dot" aria-hidden="true"></span>' +
            '<time class="timeline-time">' + item.waktu + '</time>' +
            '<p class="timeline-text">' + item.keterangan + '</p>' +
            '</li>'
        );
    }).join("");

    trackingResult.innerHTML =
        '<div class="tracking-summary">' +
        '<article class="tracking-card">' +
        '<span>Nama Mahasiswa</span>' +
        '<strong>' + data.nama + '</strong>' +
        '</article>' +
        '<article class="tracking-card">' +
        '<span>Nomor DO</span>' +
        '<strong>' + data.nomorDO + '</strong>' +
        '</article>' +
        '<article class="tracking-card">' +
        '<span>Tanggal Kirim</span>' +
        '<strong>' + data.tanggalKirim + '</strong>' +
        '</article>' +
        '<article class="tracking-card">' +
        '<span>Status</span>' +
        '<strong class="status-badge">' + data.status + '</strong>' +
        '</article>' +
        '</div>' +
        '<section class="shipping-card">' +
        '<h2 class="section-title">Detail Pengiriman</h2>' +
        '<div class="shipping-grid">' +
        '<div class="shipping-item">' +
        '<span>Ekspedisi</span>' +
        '<strong>' + data.ekspedisi + '</strong>' +
        '</div>' +
        '<div class="shipping-item">' +
        '<span>Jenis Paket</span>' +
        '<strong>' + data.paket + '</strong>' +
        '</div>' +
        '<div class="shipping-item">' +
        '<span>Total Pembayaran</span>' +
        '<strong>' + data.total + '</strong>' +
        '</div>' +
        '</div>' +
        '<div class="progress-wrap">' +
        '<div class="progress-header">' +
        '<span>Progress Pengiriman</span>' +
        '<span>' + progressValue + '%</span>' +
        '</div>' +
        '<div class="progress-track">' +
        '<div class="progress-fill" id="trackingProgress" style="width: 0%;"></div>' +
        '</div>' +
        '</div>' +
        '</section>' +
        '<section class="timeline-card">' +
        '<h2 class="section-title">Riwayat Perjalanan Paket</h2>' +
        '<ul class="timeline-list">' + timelineItems + '</ul>' +
        '</section>';

    trackingResult.classList.remove("show");
    void trackingResult.offsetWidth;
    trackingResult.classList.add("show");

    setTimeout(function () {
        document.getElementById("trackingProgress").style.width = progressValue + "%";
    }, 80);
}

function showTrackingNotFound() {
    trackingResult.innerHTML = '<div class="tracking-empty">Data tidak ditemukan</div>';
    trackingResult.classList.remove("show");
    void trackingResult.offsetWidth;
    trackingResult.classList.add("show");
}

function handleTrackingSearch() {
    var nomorDO = nomorDOInput.value.trim();

    if (nomorDO === "") {
        alert("Nomor Delivery Order wajib diisi");
        return;
    }

    trackingButton.textContent = "Mencari...";
    trackingButton.classList.add("loading");
    trackingResult.innerHTML = "";

    setTimeout(function () {
        var trackingData = dataTracking[nomorDO] || dataTracking[nomorDO.toUpperCase()];

        if (trackingData) {
            renderTrackingResult(trackingData);
        } else {
            showTrackingNotFound();
        }

        trackingButton.textContent = "Cari";
        trackingButton.classList.remove("loading");
    }, 450);
}

trackingButton.addEventListener("click", handleTrackingSearch);

trackingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleTrackingSearch();
});
