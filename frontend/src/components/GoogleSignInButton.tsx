"use client";

import { ArrowRight } from "lucide-react";
import { getGoogleLoginUrl } from "@/lib/api";

export function GoogleSignInButton() {
  return (
    <button
      onClick={() => {
        window.location.href = getGoogleLoginUrl();
      }}
      className="group flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
        G
      </span>
      Continue with Google
      <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
    </button>
  );
}