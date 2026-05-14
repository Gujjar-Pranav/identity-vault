import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Database,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

const securityChecks = [
  "Google OAuth verified",
  "Generated ID issued",
  "Database record ready",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-4">
        <nav className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-950">
              Identity Vault
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              Secure Google identity lookup
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            FastAPI · Next.js · PostgreSQL
          </div>
        </nav>

        <section className="grid flex-1 items-center gap-10 py-4 lg:grid-cols-[0.95fr_1fr]">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm">
              <LockKeyhole className="h-3 w-3 text-sky-600" />
              Google OAuth · Secure Storage · ID Lookup
            </div>

            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.94] tracking-[0.01em] text-slate-950 sm:text-6xl lg:text-[3.75rem]">
              Identity
              <span className="block text-sky-600">Access</span>
              <span className="block">Vault.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              A clean authentication portal that signs users in with Google,
              creates a generated identity ID, and retrieves user details through
              a secure lookup API.
            </p>

            <div className="mt-7 max-w-xs">
              <GoogleSignInButton />
            </div>

            <div className="mt-5 max-w-lg rounded-[1.4rem] border border-slate-200 bg-white p-3.5 shadow-[0_14px_36px_rgba(15,23,42,0.045)]">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-xs leading-6 text-slate-500">
                  Stores only required profile details: name, email, Google ID,
                  profile photo URL, and generated identity ID.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[590px] rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_64px_rgba(15,23,42,0.075)]">
            <div className="flex items-start justify-between gap-5 border-b border-slate-100 pb-3">
              <div>
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-slate-950">
                  Vault Console
                </p>
                <p className="mt-1.5 text-xs text-slate-500">
                  Real-time identity verification preview
                </p>
              </div>

              <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                Active
              </div>
            </div>

            <div className="space-y-3 py-3">
              <div className="rounded-[1.35rem] border border-slate-200 bg-white p-3.5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-slate-950 shadow-lg shadow-slate-300">
                      <ShieldCheck className="h-5 w-5 text-sky-400" />
                    </div>

                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-slate-950">
                        Identity Secured
                      </p>

                      <p className="mt-1.5 max-w-md text-xs leading-5 text-slate-500">
                        Google profile is verified, transformed into a protected
                        application identity, and prepared for generated ID lookup.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                    Protection Active
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {securityChecks.map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-[11px] font-semibold text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-slate-200 bg-white p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    G
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-950">
                      Google Profile
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Name · Email · Google ID · Avatar
                    </p>
                  </div>
                </div>

                <div className="my-3.5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                    <ArrowRight className="h-3.5 w-3.5 text-sky-600" />
                  </div>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="rounded-[1.2rem] bg-slate-950 p-3.5 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Generated Identity ID
                  </p>

                  <p className="font-display mt-2 whitespace-nowrap text-[26px] font-extrabold uppercase tracking-[0.04em] text-white sm:text-[34px]">
                    GID-8F4KQ2LA
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2.5 border-t border-slate-100 pt-3 sm:grid-cols-3">
              <div className="rounded-[1.2rem] border border-slate-200 bg-white p-3">
                <Fingerprint className="mb-2 h-3.5 w-3.5 text-sky-600" />
                <p className="text-xs font-semibold text-slate-950">Sign in</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Google OAuth
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-slate-200 bg-white p-3">
                <Database className="mb-2 h-3.5 w-3.5 text-sky-600" />
                <p className="text-xs font-semibold text-slate-950">Store</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Required profile
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-slate-200 bg-white p-3">
                <KeyRound className="mb-2 h-3.5 w-3.5 text-sky-600" />
                <p className="text-xs font-semibold text-slate-950">Lookup</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Generated ID
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Invalid ID returns{" "}
              <span className="font-semibold text-slate-950">Try Again</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}