# BTKVKlas

Saku klasifikasi bedah toraks, kardiak, dan vaskular (BTKV). Satu halaman statis, tanpa build, bisa dipasang sebagai aplikasi dan dipakai offline.

Empat tab di bawah layar:

- **Beranda**: tiga pintu (Cari, Belajar, Latihan), progres belajar dan kuis, pintasan bagan/kalkulator, favorit.
- **Cari**: pencarian dan filter kategori untuk rujukan cepat.
- **Belajar**: daftar semester I–X. Tiap semester punya tombol alih **Klasifikasi** (klasifikasi per topik, "Tandai sudah dipelajari", "Berikutnya") dan **Materi** (pokok bahasan yang bisa dicentang dan dibuka langsung, tabel modul kurikulum beserta SKS, dan rujukan halaman bacaan). Data materi ada di objek `MATERI` di akhir `data.js`.
- **Latihan**: kuis pilihan ganda yang dibuat otomatis dari `data.js` (tebak tipe dari deskripsi, arti suatu tipe, atau nama klasifikasi), dengan statistik dan daftar yang sering salah.

Progres, favorit, dan statistik kuis tersimpan di browser masing-masing pengguna (localStorage), tidak dikirim ke mana pun.

## Pasang di GitHub Pages

1. Buat repositori baru, misalnya `btkvklas`.
2. Unggah semua berkas di folder ini ke akar repositori (`index.html`, `data.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-180.png`, `icon-512.png`).
3. Settings → Pages → Source: "Deploy from a branch" → branch `main`, folder `/ (root)` → Save.
4. Aplikasi tersedia di `https://<username>.github.io/btkvklas/`.

## Menambah atau mengubah klasifikasi

Semua isi ada di `data.js`. Satu entri:

```js
E("id-unik", "kategori", "Nama", "Subjudul / kepanjangan", [
  ["Label", "Deskripsi"],
  ["Label", "Deskripsi"]
], "Catatan klinis (boleh kosong)", { h: ["Judul kolom 1", "Judul kolom 2"], k: "kata kunci pencarian tambahan" });
```

Kategori yang tersedia: `umum`, `hf`, `koroner`, `katup`, `aorta`, `kongenital`, `toraks`, `vaskular` (daftar `CATS` di bagian atas berkas).

Setelah mengubah `index.html` atau `data.js`, naikkan `VERSION` di `sw.js` (mis. `btkvklas-v2`).

## Pembagian semester

Baris chip kedua menyaring klasifikasi per semester (I–X). Tahap dan nama modul diambil dari Buku Kurikulum PPDS-1 BTKV FKUI 2022; pemetaan tiap klasifikasi ke semester ada di akhir `data.js` (`SEMS` dan blok di bawahnya) dan merupakan bantuan belajar, bukan isi buku. Ubah di sana bila pembagian di program Anda berbeda.

## Bagan dan kalkulator

Entri berlabel **Bagan** atau **Kalkulator** punya bagian interaktif (bagan luas segmen aorta, skala ambang yang bisa diisi nilai, kuadran Forrester, kalkulator skor). Definisinya ada di objek `VIZ` di akhir `data.js`.

## Penafian

Ringkasan untuk rujukan cepat, bukan pengganti sumber primer atau penilaian klinis. Isi belum ditelaah sejawat. Entri yang sudah dicek silang ke sumber daring bertanda ✓ dan memuat tautan sumbernya (daftar `SOURCES` di akhir `data.js`); entri lain belum dicek. Cocokkan setiap entri dengan pedoman terbaru sebelum dipakai.
