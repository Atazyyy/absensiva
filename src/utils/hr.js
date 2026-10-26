import { EMPLOYEES, todayISO } from "../data/hr";

const KEY_A = "kyv-attendance-v1";
const KEY_L = "kyv-leaves-v1";
const DAY = 86400000;

function seedAttendance() {
  const today = todayISO();
  const rows = {};
  const seeds = [
    ["e1", "07:52", "—"],
    ["e2", "08:11", "—"],
    ["e4", "07:45", "—"],
    ["e5", "07:58", "—"],
    ["e7", "08:24", "—"],
    ["e10", "07:41", "—"],
  ];
  for (const [id, inClock] of seeds) rows[id] = { inClock, outClock: "—" };
  return { date: today, rows };
}

function seedLeaves() {
  const shift = (n) => new Date(Date.now() + n * DAY).toISOString().slice(0, 10);
  return [
    { id: "l1", employeeId: "e3", jenis: "Izin Sakit", start: shift(0), end: shift(1), alasan: "Demam & perut sakit, ada surat dokter.", status: "Menunggu" },
    { id: "l2", employeeId: "e6", jenis: "Izin Keperluan Keluarga", start: shift(3), end: shift(3), alasan: "Mengantar anak daftar sekolah.", status: "Menunggu" },
    { id: "l3", employeeId: "e2", jenis: "Cuti Tahunan", start: shift(10), end: shift(12), alasan: "Acara pernikahan keluarga di Cirebon.", status: "Disetujui" },
    { id: "l4", employeeId: "e9", jenis: "Cuti Tahunan", start: shift(-7), end: shift(-5), alasan: "Cuti tahunan reguler.", status: "Disetujui" },
  ];
}

export function loadState() {
  let attendance, leaves;
  try {
    attendance = JSON.parse(localStorage.getItem(KEY_A));
    leaves = JSON.parse(localStorage.getItem(KEY_L));
  } catch {
    /* abaikan */
  }
  if (!attendance || attendance.date !== todayISO()) attendance = seedAttendance();
  if (!Array.isArray(leaves)) leaves = seedLeaves();
  saveState(attendance, leaves);
  return { attendance, leaves };
}

export function saveState(attendance, leaves) {
  try {
    localStorage.setItem(KEY_A, JSON.stringify(attendance));
    localStorage.setItem(KEY_L, JSON.stringify(leaves));
  } catch {
    /* abaikan */
  }
}

export function checkIn(attendance, employeeId, clock) {
  const next = {
    ...attendance,
    rows: { ...attendance.rows, [employeeId]: { inClock: clock, outClock: "—" } },
  };
  saveState(next, null);
  return next;
}

export function checkOut(attendance, employeeId, clock) {
  const row = attendance.rows[employeeId];
  if (!row) return attendance;
  const next = {
    ...attendance,
    rows: { ...attendance.rows, [employeeId]: { ...row, outClock: clock } },
  };
  saveState(next, null);
  return next;
}

export function addLeave(leaves, { employeeId, jenis, start, end, alasan }) {
  const next = [
    { id: "l-" + Date.now(), employeeId, jenis, start, end, alasan, status: "Menunggu" },
    ...leaves,
  ];
  saveState(null, next);
  return next;
}

export function setLeaveStatus(leaves, id, status) {
  const next = leaves.map((l) => (l.id === id ? { ...l, status } : l));
  saveState(null, next);
  return next;
}

export function resetAll() {
  const attendance = seedAttendance();
  const leaves = seedLeaves();
  saveState(attendance, leaves);
  return { attendance, leaves };
}

export const empById = (id) => EMPLOYEES.find((e) => e.id === id);
