import { CalendarCheck, CalendarClock, UserRound, Wallet } from "lucide-react";
import Reveal from "./Reveal";
import { EMPLOYEES, fmtIDR, isLate } from "../data/hr";

export default function Summary({ attendance, leaves }) {
  const hadir = Object.keys(attendance.rows).length;
  const terlambat = Object.entries(attendance.rows).filter(([, r]) =>
    isLate(r.inClock)
  ).length;
  const menungguCuti = leaves.filter((l) => l.status === "Menunggu").length;
  const payroll = EMPLOYEES.reduce((a, e) => a + e.gaji, 0);

  const byDivisi = {};
  for (const e of EMPLOYEES)
    byDivisi[e.divisi] = (byDivisi[e.divisi] || 0) + 1;
  const maxDiv = Math.max(...Object.values(byDivisi));

  const belumAbsen = EMPLOYEES.filter((e) => !attendance.rows[e.id]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: UserRound, label: "Total karyawan", value: EMPLOYEES.length, sub: "3 divisi utama" },
          { icon: CalendarCheck, label: "Hadir hari ini", value: `${hadir}/${EMPLOYEES.length}`, sub: `${terlambat} terlambat` },
          { icon: CalendarClock, label: "Cuti menunggu", value: menungguCuti, sub: "perlu keputusan HRD" },
          { icon: Wallet, label: "Payroll bulanan", value: fmtIDR(payroll), sub: "sebelum potongan" },
        ].map((s) => (
          <Reveal key={s.label}>
            <div className="rounded-2xl border border-rule bg-card p-5">
              <div className="flex items-center gap-2 text-mist2">
                <s.icon className="h-4 w-4 text-moss" />
                <p className="text-[11px] font-extrabold uppercase tracking-wider">{s.label}</p>
              </div>
              <p className="mt-2.5 text-2xl font-extrabold text-ink4">{s.value}</p>
              <p className="mt-0.5 text-xs text-mist2">{s.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-rule bg-card p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-mist2">
              Komposisi divisi
            </p>
            <ul className="mt-4 space-y-3">
              {Object.entries(byDivisi).map(([div, n]) => (
                <li key={div}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-ink4">{div}</span>
                    <span className="text-mist2">{n} orang</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sage">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      style={{ width: `${(n / maxDiv) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-rule bg-card p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-mist2">
              Belum absen hari ini
            </p>
            {belumAbsen.length === 0 ? (
              <p className="mt-4 rounded-xl bg-sage px-4 py-3 text-sm text-mist2">
                Semua karyawan sudah absen 👍
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {belumAbsen.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between rounded-xl bg-sage px-4 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-bold text-ink4">{e.nama}</p>
                      <p className="text-[11px] text-mist2">{e.jabatan}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-extrabold text-amber-700">
                      Belum check-in
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
