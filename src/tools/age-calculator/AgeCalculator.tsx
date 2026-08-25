"use client";

import { useState } from "react";

export function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalMonths: number;
    totalWeeks: number;
    nextBirthday: { days: number; date: string };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    setError(null);
    setResult(null);

    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }

    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      setError("Invalid date of birth.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (birthDate > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < today) {
      nextBday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }
    const daysToNext = Math.floor(
      (nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    setResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks,
      nextBirthday: {
        days: daysToNext,
        date: nextBday.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Age Calculator</h3>

        <div>
          <label htmlFor="age-dob" className="mb-2 block text-sm font-medium text-slate-600">
            Date of Birth
          </label>
          <input
            id="age-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={calculate} className="btn-primary">
            Calculate Age
          </button>
          <button
            onClick={() => {
              setDob("");
              setResult(null);
              setError(null);
            }}
            className="btn-secondary"
          >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-brand-200 bg-brand-50 p-6 text-center">
            <p className="text-sm text-brand-600">Your Age</p>
            <p className="mt-2 text-3xl font-bold text-brand-700">
              {result.years} years, {result.months} months, {result.days} days
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-100 p-4 text-center">
              <p className="text-xs text-slate-500">Total Days</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 text-center">
              <p className="text-xs text-slate-500">Total Weeks</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {result.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4 text-center">
              <p className="text-xs text-slate-500">Total Months</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {result.totalMonths.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-sm text-green-700">
              Next birthday: <strong>{result.nextBirthday.date}</strong> ({result.nextBirthday.days} days away)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
