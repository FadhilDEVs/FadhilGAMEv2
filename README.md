🎮 Fadhil GAME — Modern Cyber Arcade Platform

"Play More, Be Legendary"

Platform arcade modern berbasis web dengan estetika Cyber-Dark & Glassmorphism, animasi maskot robot stop-motion interaktif, suara 8-Bit Web Audio API, serta integrasi database nirkabel langsung ke Google Sheets.

🚀 Live Demo & Akses Langsung

Kamu dapat langsung mencoba dan memainkan game di browser komputer maupun ponsel tanpa perlu menginstal aplikasi tambahan:

👉 Klik di sini untuk Membuka Fadhil GAME

✨ Fitur Utama

1. 🛡️ Sistem Autentikasi Pemain (Google Sheets Database)

Registrasi dan login pemain terhubung langsung secara real-time ke tab spreadsheet Users.

Validasi nama pengguna (case-insensitive) dan pencegahan duplikasi akun.

Fitur toggle sandi (buka/tutup mata) untuk kenyamanan input di perangkat mobile.

2. 🤖 Maskot Animatronik Interaktif

Eye-Tracking Robot: Mata maskot robot menatap dan melirik dinamis mengikuti posisi kursor mouse atau sentuhan jari pemain.

Stop-Motion Feel: Mesin kalkulasi sudut diskret (~8–10 FPS) untuk mereplikasi efek boneka puppet animasi stop-motion khas arcade retro-futuristik.

3. 🕹️ Koleksi Mini Game Canvas (Playable)

Space Blaster:

Kendalikan jet tempur antariksa STRIKER dengan dual laser plasma.

Hancurkan 5 varian meteorit unik: Normal, Cracked (Lava), Ice, Gold, dan Dark (Void).

Dapatkan 6 power-up drops: Heal (+1 HP), Score (+50 PTS), Speed Up, Triple Shot, Shield (Kebal 6s), dan Magnet.

Hadapi 3 Boss armada alien berjenjang: Titan Dreadnought, Void Destroyer, dan Omega Annihilator.

Neon Dodger:

Kendalikan pesawat hover-speeder menghindari dinding pembatas energi berkecepatan tinggi.

4. 🔊 Audio Sintetis Prosedural (Web Audio API)

Efek suara retro instan 8-bit (laser, blast explosion, hit damage, game over, dan UI clicks) diproduksi langsung oleh browser tanpa perlu memuat file audio MP3 eksternal.

Dilengkapi tombol sakelar 🔊 SFX: ON/OFF di bilah navigasi.

5. 🏆 Global Leaderboard & Statistik

Papan peringkat otomatis menyaring skor tertinggi pemain (deduplicated personal-best) sehingga data pemain tidak menumpuk.

Statistik jumlah game rilis, total akun pemain, dan total sesi permainan terakumulasi otomatis dari spreadsheet Scores.

📂 Struktur Berkas

├── Index.html      # Frontend terintegrasi (HTML5, CSS Glassmorphism, Canvas Game Engines & Web Audio)
├── Code.gs         # Backend Google Apps Script (HTML Service, Database Reader/Writer Google Sheets)
└── README.md       # Dokumentasi resmi proyek


🛠️ Panduan Menjalankan Sendiri (Self-Hosting via Google Apps Script)

Jika kamu ingin membuat salinan (deploy) sendiri di Google Drive pribadimu:

Buka Google Sheets dan buat spreadsheet kosong baru, beri nama Database Fadhil Game.

Pada bilah menu atas, klik Ekstensi (Extensions) > Apps Script.

Buka file bawaan Code.gs, hapus semua kodenya, lalu tempelkan kode dari file Code.gs.

Buat file HTML baru dengan mengklik tanda + > pilih HTML, beri nama persis Index.html.

Tempelkan seluruh kode dari file Index.html.

Simpan seluruh file (Ctrl + S).

Klik tombol biru Deploy di pojok kanan atas > New deployment:

Pilih jenis: Web app

Execute as: Me (email kamu)

Who has access: Anyone

Klik Deploy, izinkan otorisasi Google jika diminta (Review Permissions > Akunmu > Advanced > Go to...).

Salin URL Web App yang dihasilkan untuk mulai bermain!

💻 Tech Stack

Frontend: HTML5, Modern CSS3 (Glassmorphism, Flexbox, Grid), Vanilla JavaScript (ES6+).

Game Engine: HTML5 Canvas 2D API (60 FPS Game Loop, Particle Sparks, Procedural Rock Polygons).

Audio: Web Audio API (Synthesized Oscillators).

Backend: Google Apps Script (Server-side JavaScript).

Database: Google Sheets (Users sheet & Scores sheet).

Tipografi: Google Fonts (Orbitron & Plus Jakarta Sans).

📄 Lisensi

Dibuat dengan ❤️ untuk para pecinta arcade modern dan gamer web. Bebas dikembangkan lebih lanjut untuk keperluan edukasi dan portofolio pribadi.
