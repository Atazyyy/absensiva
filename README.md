# Absensiva — HRIS Sederhana untuk UMKM

> **Kategori proyek: Web App — HRIS / HRM (Human Resource Information System).**
> Absensi harian, pengajuan & persetujuan cuti, dan data karyawan dalam satu dashboard.

HRIS ringan untuk UMKM yang masih mencatat absensi di buku dan cuti di
pesan WhatsApp. Proyek ini adalah **concept demo** untuk portofolio jasa
pembuatan web — "PT Nusantara Sembako", semua karyawan dan angka bersifat
fiktif. Nama "Absensiva" sengaja dibuat unik (belum dipakai entitas mana pun
di internet).

**Live:** https://absensiva.vercel.app

## Fitur

- **Ringkasan**: total karyawan, kehadiran hari ini (termasuk yang
  terlambat), cuti menunggu keputusan, total payroll bulanan, komposisi
  divisi, dan daftar karyawan yang belum absen.
- **Absensi**: tombol check-in/check-out dengan jam real; status otomatis
  "Terlambat" jika masuk setelah 08.00.
- **Cuti & Izin**: form pengajuan (validasi tanggal) + keputusan HRD
  (setujui/tolak) langsung dari tabel.
- **Karyawan**: 10 karyawan dengan status (Tetap/Kontrak/Probation),
  tanggal bergabung, sisa cuti, dan gaji bulanan.
- Semua data tersimpan di **localStorage** + tombol reset data demo.

## Untuk siapa demo ini?

UMKM 5–50 karyawan: toko, workshop, klinik, gudang — yang butuh
keteraturan absensi & cuti tanpa biaya HRIS enterprise.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (reveal animasi)
- Lucide Icons

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # build produksi ke folder dist/
```

## Catatan

- Seluruh karyawan & absensi adalah data contoh (seed) yang disimpan di
  localStorage browser — tidak ada backend sungguhan.
- Dibuat sebagai concept demo portofolio oleh
  [Agni Miftah Fauzi](https://github.com/Atazyyy).
