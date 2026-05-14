"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  LogOut,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  getCurrentUser,
  getLogoutUrl,
  lookupUserByGeneratedId,
} from "@/lib/api";
import type { User } from "@/lib/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [lookupId, setLookupId] = useState("");
  const [lookupResult, setLookupResult] = useState<User | null>(null);
  const [lookupMessage, setLookupMessage] = useState(
    "Search result will appear here."
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [copyText, setCopyText] = useState("Copy");

  useEffect(() => {
    async function loadUser() {
      const response = await getCurrentUser();

      if (!response.success || !response.data) {
        window.location.href = "/";
        return;
      }

      setUser(response.data);
      setLookupId(response.data.generated_id);
      setIsLoading(false);
    }

    loadUser();
  }, []);

  async function copyGeneratedId() {
    if (!user?.generated_id) return;

    await navigator.clipboard.writeText(user.generated_id);
    setCopyText("Copied");

    setTimeout(() => {
      setCopyText("Copy");
    }, 1500);
  }

  async function handleLookup() {
    const normalizedId = lookupId.trim().toUpperCase();

    if (!normalizedId) {
      setLookupResult(null);
      setLookupMessage("Try Again");
      return;
    }

    setIsSearching(true);
    setLookupResult(null);
    setLookupMessage("Searching...");

    try {
      const response = await lookupUserByGeneratedId(normalizedId);

      if (!response.success || !response.data) {
        setLookupResult(null);
        setLookupMessage("Try Again");
        return;
      }

      setLookupResult(response.data);
      setLookupMessage(response.message);
    } catch {
      setLookupResult(null);
      setLookupMessage("Try Again");
    } finally {
      setIsSearching(false);
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-slate-950">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-[0_24px_64px_rgba(15,23,42,0.075)]">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em]">
            Loading Vault
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Verifying authenticated identity...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-5">
        <nav className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-950">
              Identity Vault
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Dashboard
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = getLogoutUrl();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </nav>

        <section className="grid flex-1 items-center gap-10 py-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
              Authenticated Identity Workspace
            </div>

            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.94] tracking-[0.01em] text-slate-950 sm:text-6xl lg:text-[3.75rem]">
              Your
              <span className="block text-sky-600">Identity</span>
              <span className="block">Dashboard.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              View your generated identity ID and search stored user details
              through the secure lookup API.
            </p>

            <div className="mt-7 max-w-lg rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  {user.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.profile_photo_url}
                      alt={user.name || "User profile"}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <UserRound className="h-5 w-5 text-slate-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-slate-950">
                    {user.name}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[620px] rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_64px_rgba(15,23,42,0.075)]">
            <div className="flex items-start justify-between gap-5 border-b border-slate-100 pb-4">
              <div>
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-slate-950">
                  Lookup Console
                </p>
                <p className="mt-1.5 text-xs text-slate-500">
                  Enter a generated ID to fetch user details.
                </p>
              </div>

              <div className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700 ring-1 ring-sky-100">
                Ready
              </div>
            </div>

            <div className="py-5">
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Your Generated ID
              </label>

              <div className="mt-3 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-950 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display whitespace-nowrap text-[28px] font-extrabold uppercase tracking-[0.045em] sm:text-[34px]">
                  {user.generated_id}
                </p>

                <button
                  onClick={copyGeneratedId}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-slate-100"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copyText}
                </button>
              </div>

              <div className="mt-5">
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Lookup ID
                </label>

                <div className="mt-3 flex gap-3">
                  <input
                    value={lookupId}
                    onChange={(event) => {
                      setLookupId(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleLookup();
                      }
                    }}
                    placeholder="GID-8F4KQ2LA"
                    className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold uppercase text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />

                  <button
                    onClick={handleLookup}
                    disabled={isSearching}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Search className="h-4 w-4" />
                    {isSearching ? "Searching" : "Search"}
                  </button>
                </div>
              </div>
            </div>

            {lookupResult ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    {lookupResult.profile_photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={lookupResult.profile_photo_url}
                        alt={lookupResult.name || "Lookup user"}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <UserRound className="h-5 w-5 text-slate-500" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-slate-950">
                      {lookupResult.name}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {lookupResult.email}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Generated ID
                    </p>
                    <p className="mt-2 font-mono text-sm font-semibold text-slate-950">
                      {lookupResult.generated_id}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Google ID
                    </p>
                    <p className="mt-2 truncate font-mono text-sm font-semibold text-slate-950">
                      {lookupResult.google_id}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Profile Photo URL
                    </p>
                    <p className="mt-2 truncate text-sm font-medium text-slate-950">
                      {lookupResult.profile_photo_url || "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`rounded-[1.5rem] border border-dashed p-5 text-sm leading-7 ${
                  lookupMessage === "Try Again"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {lookupMessage}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}