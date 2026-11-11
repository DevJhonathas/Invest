
import { Suspense } from "react";
import { CalendarDays } from "lucide-react";

import CadastroClient from "@/app/components/home/cadastroClient";
import BirthDatePicker from "@/app/components/home/dataPicker";

export default function CadastroPage() {
  return (
    <CadastroClient
      birthDateField={
        <Suspense
          fallback={
            <div className="flex h-[46px] w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800">
              <CalendarDays size={17} />
              DD/MM/AAAA
            </div>
          }
        >
          <BirthDatePicker />
        </Suspense>
      }
    />
  );
}
