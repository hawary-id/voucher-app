# Aplikasi Manajemen & Distribusi Voucher Karyawan (Voucher App)

Aplikasi internal perusahaan berbasis web untuk manajemen pembuatan, distribusi, validasi penukaran (redeem) kasir toko, hingga alur verifikasi klaim tagihan keuangan voucher belanja karyawan.

## 🚀 Tech Stack

*   **Backend:** Laravel 11.x (PHP 8.3)
*   **Database:** MySQL / MariaDB
*   **Frontend:** React 18 (TypeScript), Inertia.js
*   **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide Icons, Sonner Toast
*   **PDF Engine:** Barryvdh Laravel DomPDF (A4 layout dengan QR Code)

---

## ✨ Fitur Utama & Alur Bisnis

### 1. Manajemen Batch Voucher
*   Pembuatan batch voucher dengan nominal tertentu, departemen, dan karyawan sasaran.
*   Pencetakan fisik voucher otomatis dalam bentuk kertas A4 dengan grid 2x6 (maksimal **12 voucher per lembar**) lengkap dengan **QR Code unik** dan **branding logo dinamis**.
*   Filter pencarian dan filter status (*All, Aktif, Terpakai, Kedaluwarsa, Batal*) sebelum mencetak pilihan voucher secara massal.

### 2. Validasi & Penukaran Kasir (Redeem & Inquiry)
*   Pengecekan keabsahan fisik kupon belanja melalui menu **Inquiry Voucher**.
*   Validasi penukaran langsung di kasir toko rekanan melalui menu **Redeem Voucher**.
*   **Pembatalan Transaksi Kasir (Void Redeem):** Kasir/Admin Toko dapat membatalkan transaksi penukaran jika terjadi kesalahan input atau pembatalan belanja, mengembalikan status kupon menjadi **`ACTIVE`** selama status klaim masih `PENDING`.

### 3. Alur Verifikasi Klaim Keuangan (Pusat)
*   Toko rekanan mengajukan tagihan klaim pencairan dana voucher ke kantor pusat.
*   HRD/Superadmin memverifikasi dokumen klaim (**`PENDING`** ➜ **`CLAIMED`**).
*   Admin Toko/Keuangan/Superadmin melunasi pembayaran klaim (**`CLAIMED`** ➜ **`PAID`**).
*   **Rollback / Pembatalan Klaim (Void Claim & Void Pay):** Kantor pusat dapat membatalkan persetujuan klaim (`CLAIMED` ➜ `PENDING`) atau membatalkan status pembayaran (`PAID` ➜ `CLAIMED`) jika ditemukan ketidaksesuaian data.

### 4. Scheduler & Aturan Kedaluwarsa Presisi
*   Voucher yang berakhir pada tanggal tertentu (misalnya 27 Juni) **tetap aktif dan bisa digunakan sepanjang hari** sampai detik terakhir pukul **`23:59:59`** (*endOfDay*).
*   Scheduler otomatis (`php artisan voucher:expire`) akan berjalan setiap menit untuk mendeteksi dan mengubah status kupon menjadi **`EXPIRED`** secara aman setelah melewati batas pergantian hari berikutnya.

### 5. Konfigurasi Bisnis & Branding Dinamis
*   Pengaturan logo perusahaan dan nama aplikasi secara dinamis dari panel **Business Settings** dengan state *auto-saving* dan unggah gambar interaktif.
*   Nama aplikasi dan logo otomatis terdistribusi secara global ke seluruh modul sidebar, layout login/auth, welcome page, hingga cetak PDF voucher.

---

## 🛠️ Langkah Instalasi Lokal (Laragon / XAMPP)

1.  **Clone Repository:**
    ```bash
    git clone <repository-url>
    cd voucher-app
    ```

2.  **Instalasi Dependensi PHP & JS:**
    ```bash
    composer install
    npm install
    ```

3.  **Pengaturan Environment:**
    Salin file `.env.example` menjadi `.env` dan sesuaikan koneksi database MySQL Anda.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Migrasi Database & Seeder:**
    ```bash
    php artisan migrate --seed
    ```

5.  **Generate Link Storage (Penting untuk Logo Bisnis):**
    ```bash
    php artisan storage:link
    ```

6.  **Kompilasi TypeScript Routes (Wayfinder):**
    ```bash
    php artisan wayfinder:generate --with-form
    ```

7.  **Jalankan Aplikasi:**
    *   Jalankan server development Laravel (jika tidak menggunakan virtual host Laragon):
        ```bash
        php artisan serve
        ```
    *   Jalankan server compiler aset frontend:
        ```bash
        npm run dev
        ```

8.  **Menjalankan Scheduler Pendeteksi Expired:**
    ```bash
    php artisan schedule:work
    ```

---

## 🔒 Hak Akses (RBAC)

Aplikasi memiliki pembatasan ketat untuk 3 level pengguna utama:
1.  **Superadmin / HRD:** Otoritas penuh manajemen batch voucher, verifikasi klaim pusat, audit log, dan pengaturan bisnis global.
2.  **Kasir Toko:** Otoritas cek status kupon dan penukaran belanja (redeem) untuk toko bersangkutan.
3.  **Admin Toko Rekanan:** Otoritas monitoring penukaran kasir dan pencairan dana klaim (pembayaran lunas) toko bersangkutan.
