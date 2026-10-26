export const fmtIDR = (n) => "Rp" + (n || 0).toLocaleString("id-ID");

export const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const todayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

export const nowClock = () =>
  new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

export const EMPLOYEES = [
  { id: "e1", nama: "Dita Anggraini", jabatan: "Admin Penjualan", divisi: "Penjualan", status: "Tetap", masuk: "2023-03-13", gaji: 4500000, sisaCuti: 8 },
  { id: "e2", nama: "Fajar Nugroho", jabatan: "Gudang & Logistik", divisi: "Operasional", status: "Tetap", masuk: "2022-11-01", gaji: 4200000, sisaCuti: 6 },
  { id: "e3", nama: "Salsabila Rahma", jabatan: "Social Media Officer", divisi: "Marketing", status: "Kontrak", masuk: "2025-01-06", gaji: 3900000, sisaCuti: 12 },
  { id: "e4", nama: "Bimo Prakoso", jabatan: "Teknisi Servis", divisi: "Operasional", status: "Tetap", masuk: "2021-08-16", gaji: 4800000, sisaCuti: 4 },
  { id: "e5", nama: "Nayla Putri", jabatan: "Finance Staff", divisi: "Keuangan", status: "Tetap", masuk: "2023-06-05", gaji: 5200000, sisaCuti: 10 },
  { id: "e6", nama: "Agus Setiawan", jabatan: "Driver", divisi: "Operasional", status: "Kontrak", masuk: "2024-09-02", gaji: 3500000, sisaCuti: 7 },
  { id: "e7", nama: "Kirana Ayu", jabatan: "Customer Service", divisi: "Penjualan", status: "Probation", masuk: "2026-09-01", gaji: 3600000, sisaCuti: 0 },
  { id: "e8", nama: "Dimas Prayoga", jabatan: "Purchasing Officer", divisi: "Pembelian", status: "Tetap", masuk: "2022-02-14", gaji: 4700000, sisaCuti: 5 },
  { id: "e9", nama: "Intan Permata", jabatan: "Desainer Grafis", divisi: "Marketing", status: "Kontrak", masuk: "2025-07-01", gaji: 4100000, sisaCuti: 11 },
  { id: "e10", nama: "Raka Aditya", jabatan: "Supervisor Gudang", divisi: "Operasional", status: "Tetap", masuk: "2020-04-20", gaji: 6200000, sisaCuti: 9 },
];

export const LEAVE_TYPES = ["Cuti Tahunan", "Izin Sakit", "Izin Keperluan Keluarga", "Cuti Melahirkan"];

/* jam kerja: 08.00. terlambat jika masuk setelah itu */
export const isLate = (clock) => {
  if (!clock) return false;
  const [h, m] = clock.split(":").map(Number);
  return h > 8 || (h === 8 && m > 0);
};
