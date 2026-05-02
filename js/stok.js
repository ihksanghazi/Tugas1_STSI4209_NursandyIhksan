var reportDropdownButton = document.getElementById("reportDropdownButton");
var reportDropdownMenu = document.getElementById("reportDropdownMenu");
var menuToggle = document.getElementById("menuToggle");
var navMenu = document.getElementById("navMenu");
var stockList = document.getElementById("stockList");
var stockCount = document.getElementById("stockCount");
var stockForm = document.getElementById("stockForm");
var searchStock = document.getElementById("searchStock");
var defaultCover = "assets/logo-ut.png";

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

function getFieldValue(data, camelKey, snakeKey) {
    return data[camelKey] || data[snakeKey] || "";
}

function createMetaItem(label, value) {
    var wrapper = document.createElement("div");
    var term = document.createElement("dt");
    var description = document.createElement("dd");

    term.textContent = label;
    description.textContent = value;

    wrapper.appendChild(term);
    wrapper.appendChild(description);

    return wrapper;
}

function createStockCard(item, index) {
    var card = document.createElement("article");
    var image = document.createElement("img");
    var content = document.createElement("div");
    var title = document.createElement("h2");
    var meta = document.createElement("dl");
    var badge = document.createElement("span");
    var deleteButton = document.createElement("button");

    var kodeLokasi = getFieldValue(item, "kodeLokasi", "kode_lokasi");
    var kodeBarang = getFieldValue(item, "kodeBarang", "kode_barang");
    var namaBarang = getFieldValue(item, "namaBarang", "nama_barang");
    var jenisBarang = getFieldValue(item, "jenisBarang", "jenis_barang");
    var cover = item.cover || item.gambar || defaultCover;
    var stok = Number(item.stok);

    card.className = "stock-card";
    image.className = "stock-image";
    image.src = cover;
    image.alt = "Cover " + namaBarang;

    content.className = "stock-content";
    title.className = "stock-title";
    title.textContent = namaBarang;

    meta.className = "stock-meta";
    meta.appendChild(createMetaItem("Kode Lokasi", kodeLokasi));
    meta.appendChild(createMetaItem("Kode Barang", kodeBarang));
    meta.appendChild(createMetaItem("Jenis Barang", jenisBarang));
    meta.appendChild(createMetaItem("Edisi", item.edisi));

    badge.className = stok < 50 ? "stock-badge low-stock" : "stock-badge";
    badge.textContent = stok < 50 ? "Stok rendah: " + stok : "Stok: " + stok;

    deleteButton.type = "button";
    deleteButton.className = "stock-delete";
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
        dataBahanAjar.splice(index, 1);
        renderStockCards();
    });

    content.appendChild(title);
    content.appendChild(meta);
    content.appendChild(badge);
    content.appendChild(deleteButton);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

function renderStockCards() {
    var keyword = searchStock.value.trim().toLowerCase();
    var filteredData = dataBahanAjar.filter(function (item) {
        var kodeBarang = getFieldValue(item, "kodeBarang", "kode_barang").toLowerCase();
        var kodeLokasi = getFieldValue(item, "kodeLokasi", "kode_lokasi").toLowerCase();
        var namaBarang = getFieldValue(item, "namaBarang", "nama_barang").toLowerCase();

        return (
            kodeBarang.includes(keyword) ||
            kodeLokasi.includes(keyword) ||
            namaBarang.includes(keyword)
        );
    });

    stockList.innerHTML = "";
    stockCount.textContent = filteredData.length + " data";

    if (filteredData.length === 0) {
        var emptyMessage = document.createElement("p");
        emptyMessage.className = "stock-empty";
        emptyMessage.textContent = "Data bahan ajar tidak ditemukan";
        stockList.appendChild(emptyMessage);
        return;
    }

    filteredData.forEach(function (item) {
        var originalIndex = dataBahanAjar.indexOf(item);
        var card = createStockCard(item, originalIndex);
        stockList.appendChild(card);
    });
}

stockForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var kodeLokasi = document.getElementById("kodeLokasi").value.trim();
    var kodeBarang = document.getElementById("kodeBarang").value.trim();
    var namaBarang = document.getElementById("namaBarang").value.trim();
    var jenisBarang = document.getElementById("jenisBarang").value.trim();
    var edisi = document.getElementById("edisi").value.trim();
    var stok = document.getElementById("stok").value.trim();

    if (
        kodeLokasi === "" ||
        kodeBarang === "" ||
        namaBarang === "" ||
        jenisBarang === "" ||
        edisi === "" ||
        stok === ""
    ) {
        alert("Semua data wajib diisi");
        return;
    }

    if (isNaN(stok)) {
        alert("Stok harus berupa angka");
        return;
    }

    dataBahanAjar.push({
        kodeLokasi: kodeLokasi,
        kodeBarang: kodeBarang,
        namaBarang: namaBarang,
        jenisBarang: jenisBarang,
        edisi: edisi,
        stok: Number(stok),
        cover: defaultCover
    });

    stockForm.reset();
    searchStock.value = "";
    renderStockCards();
});

searchStock.addEventListener("input", renderStockCards);

renderStockCards();
