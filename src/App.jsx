import { useState } from "react";
import { Boxes, Building2, CalendarClock, RotateCcw, UserRound, Users, Warehouse } from "lucide-react";
import Reveal from "./components/Reveal";
import Summary from "./components/Summary";
import AttendanceTab from "./components/Attendance";
import LeavesTab from "./components/Leaves";
import EmployeesTab from "./components/Employees";
import { nowClock } from "./data/hr";
import {
  addLeave,
  checkIn,
  checkOut,
  loadState,
  resetAll,
  setLeaveStatus,
} from "./utils/hr";

const TABS = [
  { id: "ringkasan", label: "Ringkasan", icon: Building2 },
  { id: "absensi", label: "Absensi", icon: CalendarClock },
  { id: "cuti", label: "Cuti & Izin", icon: Warehouse },
  { id: "karyawan", label: "Karyawan", icon: Users },
];

export default function App() {
  const [tab, setTab] = useState("ringkasan");
  const [{ attendance, leaves }, setState] = useState(() => loadState());

  return (
    <div className="min-h-screen bg-sage font-sans text-ink4 antialiased">
      <header className="border-b border-rule bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3.5 md:px-8">
          <p className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss text-white">
              <Boxes className="h-4.5 w-4.5" />
            </span>
            Kary<span className="text-moss">ava</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="hidden rounded-full border border-rule bg-sage px-3.5 py-1.5 text-xs font-bold text-mist2 sm:block">
              PT Nusantara Sembako — data fiktif
            </p>
            <button
              onClick={() => setState(resetAll())}
              className="inline-flex items-center gap-1.5 rounded-full border border-rule px-3.5 py-1.5 text-xs font-bold text-mist2 transition hover:text-ink4"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset demo
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Dashboard HRD
        </h1>
        <p className="mt-1.5 text-sm text-mist2">
          Absensi, cuti, dan data karyawan dalam satu tempat — cukup untuk
          tim 5–50 orang.
        </p>

        <nav className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition " +
                (tab === t.id
                  ? "bg-moss text-white"
                  : "border border-rule bg-card text-mist2 hover:text-ink4")
              }
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          {tab === "ringkasan" && <Summary attendance={attendance} leaves={leaves} />}
          {tab === "absensi" && (
            <AttendanceTab
              attendance={attendance}
              onCheckIn={(id) => setState((s) => ({ ...s, attendance: checkIn(s.attendance, id, nowClock()) }))}
              onCheckOut={(id) => setState((s) => ({ ...s, attendance: checkOut(s.attendance, id, nowClock()) }))}
            />
          )}
          {tab === "cuti" && (
            <LeavesTab
              leaves={leaves}
              onDecide={(id, status) => setState((s) => ({ ...s, leaves: setLeaveStatus(s.leaves, id, status) }))}
              onSubmit={(data) => setState((s) => ({ ...s, leaves: addLeave(s.leaves, data) }))}
            />
          )}
          {tab === "karyawan" && <EmployeesTab />}
        </div>
      </main>

      <footer className="border-t border-rule bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-mist2 sm:flex-row sm:items-center md:px-8">
          <p>© 2026 Karyava · "PT Nusantara Sembako" fiktif (concept demo).</p>
          <p>
            Dibuat oleh{" "}
            <a
              href="https://github.com/Atazyyy"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-ink4"
            >
              Agni Miftah Fauzi
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
