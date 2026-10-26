import { useState } from "react";
import { CalendarClock, Check, Plus, X } from "lucide-react";
import { EMPLOYEES, LEAVE_TYPES, fmtDate } from "../data/hr";

const STATUS_STYLE = {
  Menunggu: "bg-amber-100 text-amber-700",
  Disetujui: "bg-emerald-100 text-emerald-700",
  Ditolak: "bg-rose-100 text-rose-600",
};

export default function LeavesTab({ leaves, onDecide, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(EMPLOYEES[0].id);
  const [jenis, setJenis] = useState(LEAVE_TYPES[0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [alasan, setAlasan] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!start) return setError("Tanggal mulai wajib diisi.");
    if (!end) return setError("Tanggal selesai wajib diisi.");
    if (end < start) return setError("Tanggal selesai tidak boleh sebelum mulai.");
    if (alasan.trim().length < 5) return setError("Tulis alasan singkat (min. 5 karakter).");
    onSubmit({ employeeId, jenis, start, end, alasan: alasan.trim() });
    setStart("");
    setEnd("");
    setAlasan("");
    setOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-extrabold text-ink4">Pengajuan Cuti & Izin</h3>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1.5 rounded-full bg-moss px-4 py-2 text-xs font-bold text-white transition hover:brightness-110"
        >
          <Plus className="h-3.5 w-3.5" /> Ajukan Cuti
        </button>
      </div>

      {open && (
        <form onSubmit={submit} className="rounded-2xl border border-rule bg-card p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="rounded-xl border border-rule bg-sage px-3 py-2.5 text-sm font-semibold text-ink4 outline-none focus:border-moss"
            >
              {EMPLOYEES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nama} (sisa {e.sisaCuti} hari)
                </option>
              ))}
            </select>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="rounded-xl border border-rule bg-sage px-3 py-2.5 text-sm font-semibold text-ink4 outline-none focus:border-moss"
            >
              {LEAVE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="rounded-xl border border-rule bg-sage px-3 py-2.5 text-sm font-semibold text-ink4 outline-none focus:border-moss"
            />
            <input
              type="date"
              value={end}
              min={start}
              onChange={(e) => setEnd(e.target.value)}
              className="rounded-xl border border-rule bg-sage px-3 py-2.5 text-sm font-semibold text-ink4 outline-none focus:border-moss"
            />
          </div>
          <textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            rows={2}
            placeholder="Alasan singkat…"
            className="mt-3 w-full resize-none rounded-xl border border-rule bg-sage px-4 py-3 text-sm font-semibold text-ink4 outline-none placeholder:font-normal placeholder:text-mist2/70 focus:border-moss"
          />
          {error && (
            <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-3 rounded-xl bg-moss px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            Kirim Pengajuan
          </button>
        </form>
      )}

      <div className="rounded-2xl border border-rule bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-[11px] font-extrabold uppercase tracking-wider text-mist2">
                <th className="px-5 py-3">Karyawan</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Alasan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Keputusan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {leaves.map((l) => {
                const e = EMPLOYEES.find((x) => x.id === l.employeeId);
                return (
                  <tr key={l.id} className="hover:bg-sage/50">
                    <td className="px-5 py-3 font-bold text-ink4">{e?.nama}</td>
                    <td className="px-5 py-3 text-mist2">{l.jenis}</td>
                    <td className="px-5 py-3 text-mist2">
                      {fmtDate(l.start)} – {fmtDate(l.end)}
                    </td>
                    <td className="max-w-[220px] px-5 py-3 text-xs text-mist2">{l.alasan}</td>
                    <td className="px-5 py-3">
                      <span
                        className={"rounded-full px-2.5 py-1 text-[10px] font-extrabold " + STATUS_STYLE[l.status]}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {l.status === "Menunggu" ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => onDecide(l.id, "Disetujui")}
                            className="inline-flex items-center gap-1 rounded-lg bg-moss px-2.5 py-1.5 text-xs font-bold text-white transition hover:brightness-110"
                          >
                            <Check className="h-3.5 w-3.5" /> Setujui
                          </button>
                          <button
                            onClick={() => onDecide(l.id, "Ditolak")}
                            className="inline-flex items-center gap-1 rounded-lg border border-rule px-2.5 py-1.5 text-xs font-bold text-mist2 transition hover:border-rose-300 hover:text-rose-600"
                          >
                            <X className="h-3.5 w-3.5" /> Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-mist2">Selesai ✓</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
