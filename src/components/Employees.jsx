import { UserRound } from "lucide-react";
import { EMPLOYEES, fmtDate, fmtIDR } from "../data/hr";

const STATUS_STYLE = {
  Tetap: "bg-emerald-100 text-emerald-700",
  Kontrak: "bg-sky-100 text-sky-700",
  Probation: "bg-amber-100 text-amber-700",
};

export default function EmployeesTab() {
  return (
    <div className="rounded-2xl border border-rule bg-card">
      <div className="inline-flex items-center gap-2 border-b border-rule px-5 py-4">
        <UserRound className="h-4 w-4 text-moss" />
        <p className="text-sm font-extrabold text-ink4">Data Karyawan</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-rule text-[11px] font-extrabold uppercase tracking-wider text-mist2">
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3">Jabatan</th>
              <th className="px-5 py-3">Divisi</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Bergabung</th>
              <th className="px-5 py-3">Sisa Cuti</th>
              <th className="px-5 py-3">Gaji/Bulan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {EMPLOYEES.map((e) => (
              <tr key={e.id} className="hover:bg-sage/50">
                <td className="px-5 py-3 font-bold text-ink4">{e.nama}</td>
                <td className="px-5 py-3 text-mist2">{e.jabatan}</td>
                <td className="px-5 py-3 text-mist2">{e.divisi}</td>
                <td className="px-5 py-3">
                  <span className={"rounded-full px-2.5 py-1 text-[10px] font-extrabold " + STATUS_STYLE[e.status]}>
                    {e.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-mist2">{fmtDate(e.masuk)}</td>
                <td className="px-5 py-3 font-bold text-ink4">{e.sisaCuti} hari</td>
                <td className="px-5 py-3 font-semibold text-ink4">{fmtIDR(e.gaji)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
