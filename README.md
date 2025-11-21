# 🏯 SANCAKA (Sandi Caka Nuswantara)

> **Transformasi Digital Pembelajaran Aksara Jawa dengan Sentuhan Cyber-Kejawen.**

![Sancaka Banner](assets/logo.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE/deploys)
[![GitHub License](https://img.shields.io/github/license/yhyaa294/SANCAKA)](https://github.com/yhyaa294/SANCAKA)

## 📖 Tentang Proyek

**SANCAKA** adalah aplikasi web edukatif yang dirancang untuk menjembatani kesenjangan antara budaya tradisional dan teknologi modern. Kami mengubah stigma Aksara Jawa yang "kuno" menjadi relevan bagi Gen-Z melalui antarmuka **Cyber-Kejawen** (Dark Mode & Neon).

Aplikasi ini dibangun dengan pendekatan **Pure Native** (Tanpa Framework) untuk performa maksimal, aksesibilitas tinggi, dan ukuran yang sangat ringan.

🔗 **Live Demo:** [https://yhyaa294.github.io/SANCAKA/](https://yhyaa294.github.io/SANCAKA/)         https://sancaka.vercel.app/

---

## 🚀 Fitur Utama

### 1. Dua Mode Belajar Utama
* **📚 Mode SINAU (Belajar):** Metode *Flashcard* interaktif untuk menghafal bentuk dan fungsi aksara.
* **⚔️ Mode UJI NYALI (Kuis):** Evaluasi pemahaman dengan sistem skor *real-time*.

### 2. Smart Distractor Logic 🧠
Sistem kuis kami tidak mengacak jawaban sembarangan. Algoritma cerdas akan memunculkan opsi jawaban pengecoh yang memiliki **kemiripan bentuk visual** dengan jawaban benar (misal: *Pa* vs *La*), melatih ketelitian pengguna secara maksimal.

### 3. Multi-Kategori Lengkap
Mencakup materi komprehensif:
* Aksara Dasar (Hanacaraka)
* Aksara Murda
* Pasangan Aksara
* Sandangan

### 4. Fitur Riwayat (Offline Persistence) 💾
Menggunakan teknologi **`localStorage`**, aplikasi menyimpan riwayat nilai dan progres belajar pengguna secara aman di perangkat (Client-side), tanpa memerlukan database server.

---

## 🛠️ Teknologi (Tech Stack)

Kami menjunjung tinggi efisiensi kode (*Efficiency First*):

* **Frontend:** HTML5 (Semantic), CSS3 (Custom Variables & Animations).
* **Logic:** Vanilla JavaScript (ES6+).
* **Design System:** Custom "Cyber-Kejawen" Theme (Glassmorphism + Batik Circuit Pattern).
* **Deployment:** GitHub Pages.

> **Note:** Tidak ada framework berat (No React/Vue/Bootstrap). 100% Hand-coded.

---

## 📂 Struktur Proyek

```text
SANCAKA/
├── assets/             # Aset Gambar (Dasar, Murda, Logo, dll)
├── css/
│   └── style.css       # Styling Utama (Dark Mode & Responsif)
├── js/
│   ├── data.js         # Database Soal (JSON Structure)
│   └── app.js          # Logika Aplikasi (DOM, Game Loop, Storage)
└── index.html          # Struktur Halaman Utama (SPA Concept)
