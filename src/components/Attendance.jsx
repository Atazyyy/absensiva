import { CalendarCheck, LogIn, LogOut } from "lucide-react";
import { EMPLOYEES, isLate } from "../data/hr";

export default function AttendanceTab({ attendance, onCheckIn, onCheckOut }) {
  return (
    <div className="rounded-2xl border border-rule bg-card">
      <div className="flex items-center justify-between border-b border-rule px-5 py-4">
        <p className="inline-flex items-center gap-2 text-sm font-extrabold text-ink4">
          <CalendarCheck className="h-4 w-4 text-moss" /> Absensi Hari Ini
        </p>
        <p className="text-xs font-bold text-mist2">Jam kerja 08.00 – 17.00</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-rule text-[11px] font-extrabold uppercase tracking-wider text-mist2">
              <th className="px-5 py-3">Karyawan</th>
              <th className="px-5 py-3">Jam Masuk</th>
              <th className="px-5 py-3">Jam Keluar</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {EMPLOYEES.map((e) => {
              const row = attendance.rows[e.id];
              const late = row && isLate(row.inClock);
              return (
                <tr key={e.id} className="hover:bg-sage/50">
                  <td className="px-5 py-3">
                    <p className="font-bold text-ink4">{e.nama}</p>
                    <p className="text-[11px] text-mist2">{e.jabatan}</p>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs font-bold text-ink4">
                    {row?.inClock ?? "—"}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs font-bold text-ink4">
                    {row?.outClock ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    {!row ? (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-extrabold text-amber-700">
                        Belum absen
                      </span>
                    ) : late ? (
                      <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-extrabold text-rose-600">
                        Terlambat
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">
                        Tepat waktu
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {!row && (
                        <button
                          onClick={() => onCheckIn(e.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-moss px-2.5 py-1.5 text-xs font-bold text-white transition hover:brightness-110"
                        >
                          <LogIn className="h-3.5 w-3.5" /> Check-in
                        </button>
                      )}
                      {row && row.outClock === "—" && (
                        <button
                          onClick={() => onCheckOut(e.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rule px-2.5 py-1.5 text-xs font-bold text-mist2 transition hover:border-moss hover:text-moss"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Check-out
                        </button>
                      )}
                      {row && row.outClock !== "—" && (
                        <span className="text-[11px] font-bold text-mist2">Selesai ✓</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
