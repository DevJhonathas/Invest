
"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarDays } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";

export default function BirthDatePicker() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return (
    <div className="relative">
      <CalendarDays
        size={17}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
      />

      <DatePicker
        id="birthDate"
        name="birthDate"
        selected={birthDate}
        onChange={(date: Date | null) => setBirthDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/AAAA"
        locale="pt-BR"
        autoComplete="bday"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        required
        wrapperClassName="w-full"
        className={`${inputClass} pl-11`}
      />
    </div>
  );
}
