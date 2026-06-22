# Telekung Premium Eksklusif Landing Page

Satu halaman jualan (landing page) e-dagang premium, responsif, dan mobile-first untuk produk Telekung Premium. Landing page ini direka khas untuk meningkatkan penukaran (conversion) dan mempunyai integrasi terus ke gerbang pembayaran ToyyibPay FPX secara selamat.

---

## 🌟 Kelebihan Utama

1. **Reka Bentuk Muslimah Premium**: Menggunakan palet warna elegan (Putih, Krim, Beige, dan Emas Lembut) dengan tipografi premium (Playfair Display & Inter).
2. **Mobile-First & Responsif**: Reka bentuk dioptimumkan sepenuhnya untuk telefon bimbit dengan Sticky CTA di bahagian bawah skrin.
3. **Konfigurator Interaktif**: Pelanggan boleh memilih di antara 3 rekaan utama (Design A, B, C) dan 15 warna swatch.
4. **Prestasi & Loading Laju**: Gambar dioptimumkan. Warna swatch menggunakan teknik CSS filter tinting secara dinamik bagi mengelakkan keperluan memuat turun 45 fail gambar berbeza secara serentak (mengurangkan saiz halaman dan CLS).
5. **Automatik Courier**: Pilihan kurier (Semenanjung - Percuma, Sabah/Sarawak - +RM15.00) dikemas kini secara automatik berdasarkan negeri yang dipilih oleh pelanggan untuk mengurangkan kesilapan input.
6. **Backend Selamat (Cloudflare Pages Functions)**: Kunci rahsia (API Secret Key) ToyyibPay disimpan di pelayan (server-side) dan tidak didedahkan kepada pelayar web pelanggan, mengelakkan isu CORS dan kerentanan keselamatan.

---

## 📁 Struktur Fail Projek

```text
telekung-premium-landing/
├── index.html                  # Halaman utama (HTML5, SEO & Product Schema)
├── robots.txt                  # Fail arahan bot carian
├── sitemap.xml                 # Fail sitemap carian Google
├── README.md                   # Fail dokumentasi panduan ini
├── css/
│   └── style.css               # Gaya reka bentuk, grid, layout, & animas
├── js/
│   └── app.js                  # Logik interaksi pelanggan & kalkulator harga
├── functions/
│   └── api/
│       └── checkout.js         # Cloudflare Pages serverless checkout API
└── images/                     # Folder aset gambar produk
    ├── hero-bg.png             # Imej utama model di Hero Section
    ├── design-a/
    │   └── putih.png           # Gambar rujukan utama Design A
    ├── design-b/
    │   └── dusty-pink.png      # Gambar rujukan utama Design B
    └── design-c/
        └── cream.png           # Gambar rujukan utama Design C
```

---

## 🚀 Cara Menjalankan Secara Tempatan (Local Development)

### 1. Menjalankan Pelayan Web (HTTP Server)
Oleh kerana halaman ini menggunakan vanilla HTML/CSS/JS sahaja, anda boleh membukanya secara terus menggunakan VS Code Live Server atau mana-mana pelayan HTTP ringkas.

Jika anda mempunyai Node.js dipasang, anda boleh jalankan pelayan pembangunan ringkas:
```bash
# Menggunakan npx http-server
npx http-server -p 8080
```
Buka pelayar web anda di: `http://localhost:8080`

### 2. Simulasi Pembayaran
Apabila dijalankan pada `localhost` atau `127.0.0.1`, JavaScript secara automatik akan mengesan mod pembangunan dan akan mengalihkan anda ke pautan WhatsApp HQ dengan butiran pesanan sebagai simulasi (tanpa memanggil API ToyyibPay yang sebenar).

---

## ☁️ Cara Deploy ke Cloudflare Pages

Sistem ini direka khas untuk dideploy ke Cloudflare Pages berserta Pages Functions (Folder `functions/`).

### Langkah 1: Sambung ke GitHub & Buat Deployment
1. Cipta repository baru di GitHub dan tolak (push) kod sumber ini.
2. Log masuk ke dashboard **Cloudflare**.
3. Pergi ke **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
4. Pilih repository jualan telekung anda.
5. Pada tetapan binaan (Build settings):
   - **Framework preset**: `None`
   - **Build command**: (Tinggalkan kosong)
   - **Build output directory**: `/` (Tinggalkan sebagai root folder)
6. Klik **Save and Deploy**.

### Langkah 2: Tetapkan Environment Variables di Cloudflare
Untuk mengaktifkan pembayaran ToyyibPay yang sebenar, pergi ke tetapan projek Pages anda di Cloudflare:
1. Klik pada tab **Settings** -> **Variables**.
2. Di bawah bahagian **Environment variables**, tambah pembolehubah berikut untuk persekitaran **Production** dan **Preview**:

| Nama Variable | Contoh Nilai | Huraian |
| :--- | :--- | :--- |
| `TOYYIBPAY_SECRET_KEY` | `your_toyyibpay_secret_key` | Kunci rahsia daripada akaun ToyyibPay anda |
| `TOYYIBPAY_CATEGORY_CODE`| `your_category_code` | Kod kategori produk jualan anda di ToyyibPay |
| `TOYYIBPAY_PRODUCTION` | `true` (atau `false`) | Tetapkan `true` jika mahu guna sistem bayaran sebenar, `false` untuk Sandbox testing |

3. Klik **Save** dan jalankan **Redeploy** untuk mengaplikasikan tetapan baru.

---

## 💳 Cara Dapatkan ToyyibPay Keys
1. Daftar akaun di [ToyyibPay](https://toyyibpay.com/) (untuk akaun sebenar) atau [ToyyibPay Developer Sandbox](https://dev.toyyibpay.com/) (untuk ujian).
2. Pergi ke menu **Settings** -> **User Profile** untuk menyalin **User Secret Key**.
3. Pergi ke menu **Category** -> **Add Category** untuk mencipta kategori jualan baru (cth: "Telekung Premium"). Salin **Category Code** yang dihasilkan.
