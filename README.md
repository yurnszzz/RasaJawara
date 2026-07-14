<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,12&height=250&section=header&text=🏆%20Rasa%20Jawara&fontSize=70&fontAlignY=35&desc=Website%20E-Commerce%20Oleh-oleh%20Khas%20Banten&descSize=20&descAlignY=55&animation=twinkling&fontColor=ffffff" width="100%"/>

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=600&size=22&duration=3000&pause=1000&color=C8A165&center=true&vCenter=true&repeat=true&width=550&height=35&lines=Cita+Rasa+Jawara%2C+Warisan+Nusantara;Oleh-oleh+Premium+Khas+Banten;Pesan+Online+dengan+QRIS" alt="Typing SVG" />

</div>

---

## 📌 Deskripsi Proyek

**Rasa Jawara** adalah website e-commerce untuk **pusat oleh-oleh khas Banten** yang menyediakan makanan ringan otentik, pizza, dan souvenir unik. Website ini terintegrasi dengan Google Sheets sebagai backend dan menyediakan sistem pemesanan lengkap dengan kwitansi digital.

### Alur Pemesanan

```
🛒 Pilih produk → Tambah ke keranjang → Isi data customer
        ↓
📄 Generate kwitansi pembayaran (QRIS + Transfer Bank)
        ↓
📥 Download kwitansi sebagai gambar  —atau—  📱 Konfirmasi via WhatsApp
```

---

## ✨ Fitur

<div align="center">

| Fitur | Deskripsi |
|:------|:----------|
| 🛍️ **Katalog Produk Dinamis** | Data realtime dari Google Sheets via Apps Script |
| ⚡ **Smart Caching** | localStorage cache (5 menit) + skeleton loading |
| 🔍 **Search & Filter** | Pencarian produk + filter kategori (Oleh-oleh, Pizza, Souvenir) |
| 🛒 **Shopping Cart** | Keranjang belanja dengan slide-in panel |
| 📄 **Kwitansi Digital** | Generate & download sebagai PNG |
| 💳 **Multi-Payment** | QRIS Code + Transfer Bank (BCA/BNI) |
| 📱 **WhatsApp Order** | Konfirmasi pesanan langsung via WhatsApp |
| 📍 **Google Maps** | Embedded map lokasi toko |
| 🎨 **Modern Animations** | Scroll reveal, typed text, particles, skeleton loading |
| 📱 **Responsive** | Optimal di desktop, tablet, dan mobile |

</div>

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| HTML5 | Struktur semantik |
| Tailwind CSS (CDN) | Styling utility-first |
| Vanilla JavaScript | Logika aplikasi (modular) |
| Google Apps Script | Backend API (CRUD produk) |
| Google Sheets | Database produk |
| html2canvas | Export kwitansi ke gambar |
| Font Awesome 6 | Icon library |
| Google Fonts | Playfair Display + Poppins |

---

## 📁 Struktur Proyek

```
RasaJawara/
├── index.html              # Main HTML — struktur halaman
├── config.js               # 🔒 Konfigurasi sensitif (gitignored)
├── config.example.js       # Template konfigurasi (placeholder)
├── css/
│   └── style.css           # Custom styles & animasi
├── js/
│   ├── app.js              # Produk, keranjang, filter, cache
│   ├── receipt.js          # Kwitansi: generate, download, WhatsApp
│   └── ui.js               # UI: modals, scroll, animasi, toast
├── assets/
│   └── images/
│       ├── logo.png        # Logo Rasa Jawara
│       ├── hero.jpg        # Hero section background
│       └── qris.png        # 🔒 QRIS code (gitignored)
├── .gitignore
├── LICENSE
└── README.md               # File ini
```

---

## ⚙️ Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/yurnszzz/RasaJawara.git
cd RasaJawara
```

### 2. Setup Konfigurasi

```bash
cp config.example.js config.js
```

Edit `config.js` dan isi dengan data Anda:

```javascript
const CONFIG = {
  API_URL: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  WA_PHONE: "628XXXXXXXXXX",
  STORE_PHONE: "0857-XXXX-XXXX",
  BANK_ACCOUNTS: [
    { bank: "BCA", number: "XXXXXXXXXX", owner: "Nama Pemilik" },
  ],
  // ... lihat config.example.js untuk detail lengkap
};
```

### 3. Jalankan

**Opsi A — Live Server (Recommended):**
- Buka project di VS Code
- Install extension **Live Server**
- Klik kanan `index.html` → **Open with Live Server**

**Opsi B — Langsung:**
- Buka `index.html` di browser (beberapa fitur seperti download kwitansi memerlukan server lokal)

---

## 🔧 Setup Google Apps Script

<details>
<summary>📋 <b>Panduan Backend Setup</b></summary>

1. Buat Google Sheet dengan kolom: `id`, `name`, `category`, `price`, `desc`, `detail`, `image`, `status`
2. Buka **Extensions → Apps Script**
3. Deploy sebagai Web App dengan akses "Anyone"
4. Copy URL deployment ke `config.js` → `API_URL`

**Format Response API:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "name": "Emping Melinjo",
      "category": "Oleh-oleh",
      "price": 25000,
      "desc": "Emping asli Banten",
      "image": "https://...",
      "status": "Tersedia"
    }
  ]
}
```

</details>

---

## 🎨 Design System

<div align="center">

| Token | Hex | Preview |
|:------|:---:|:-------:|
| **Jawara Gold** | `#C8A165` | ![#C8A165](https://via.placeholder.com/80x30/C8A165/C8A165) |
| **Jawara Brown** | `#4A3321` | ![#4A3321](https://via.placeholder.com/80x30/4A3321/4A3321) |
| **Jawara Cream** | `#F9F5F0` | ![#F9F5F0](https://via.placeholder.com/80x30/F9F5F0/F9F5F0) |

**Typography:** Playfair Display (headings) + Poppins (body)

</div>

---

## 👤 Developer

<div align="center">

| Nama | Role |
|:-----|:----:|
| **Hasan Shofiyyur Rahman** | Full-Stack Developer |

> Proyek ini merupakan bagian dari **Rasa Jawara Souvenir** — Pusat Oleh-oleh Khas Banten
> 📍 South Tangerang, Banten

</div>

---

## 📚 Referensi

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [html2canvas](https://html2canvas.hertzen.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

<div align="center">

<br/>

**Rasa Jawara Souvenir** · Pusat Oleh-oleh Khas Banten

[![GitHub](https://img.shields.io/badge/GitHub-RasaJawara-181717?style=flat-square&logo=github)](https://github.com/yurnszzz/RasaJawara)

</div>
