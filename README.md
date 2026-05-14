# SITTA - Tugas 1 Pemrograman Berbasis Web

## Identitas Mahasiswa

| Keterangan  | Data                     |
| ----------- | ------------------------ |
| Nama        | Nursandy Ihksan          |
| NIM         | 053521504                |
| UPBJJ       | Jakarta                  |
| Mata Kuliah | Pemrograman Berbasis Web |
| Tugas       | Tugas 1                  |

## Deskripsi Proyek

Proyek ini merupakan aplikasi web statis bernama **SITTA** atau Sistem Informasi Pemesanan Bahan Ajar. Aplikasi dibuat untuk menampilkan simulasi proses login, dashboard, informasi stok bahan ajar, dan tracking pengiriman Delivery Order bahan ajar Universitas Terbuka.

## Fitur Aplikasi

- Login pengguna dengan validasi email dan password.
- Tombol tampil/sembunyikan password pada halaman login.
- Popup informasi untuk menu lupa password dan daftar akun.
- Dashboard dengan sapaan pengguna sesuai waktu.
- Navigasi responsif dengan menu dropdown laporan.
- Halaman informasi bahan ajar berisi daftar stok, pencarian data, tambah data, dan hapus data.
- Halaman tracking pengiriman berdasarkan nomor Delivery Order.
- Tampilan status pengiriman, detail paket, progress, dan riwayat perjalanan paket.

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript
- LocalStorage browser

## Struktur Folder

```text
sitta-praktik/
|-- assets/
|   `-- logo-ut.png
|-- css/
|   `-- style.css
|-- img/
|   `-- gambar cover bahan ajar
|-- js/
|   |-- dashboard.js
|   |-- data.js
|   |-- index.js
|   |-- stok.js
|   `-- tracking.js
|-- dashboard.html
|-- index.html
|-- stok.html
|-- tracking.html
`-- README.md
```

## Cara Menjalankan

1. Buka folder proyek `sitta-praktik`.
2. Buka file `index.html` menggunakan browser.
3. Login menggunakan salah satu akun yang tersedia.
4. Setelah login berhasil, aplikasi akan masuk ke halaman dashboard.

## Akun Login Contoh

| Email          | Password | Role          |
| -------------- | -------- | ------------- |
| rina@ut.ac.id  | rina123  | UPBJJ-UT      |
| agus@ut.ac.id  | agus123  | UPBJJ-UT      |
| siti@ut.ac.id  | siti123  | Puslaba       |
| doni@ut.ac.id  | doni123  | Fakultas      |
| admin@ut.ac.id | admin123 | Administrator |

## Contoh Nomor Delivery Order

| Nomor DO   | Status           |
| ---------- | ---------------- |
| DO123      | Sampai Tujuan    |
| 2023001234 | Dalam Perjalanan |
| 2023005678 | Dikirim          |

## Halaman Aplikasi

- `index.html`: halaman login SITTA.
- `dashboard.html`: halaman utama setelah login.
- `stok.html`: halaman informasi dan pengelolaan stok bahan ajar.
- `tracking.html`: halaman tracking pengiriman bahan ajar.

## Catatan

Aplikasi ini menggunakan data dummy dari file `js/data.js`. Data yang ditambahkan melalui halaman stok hanya tersimpan selama halaman masih aktif dan belum di-refresh.
