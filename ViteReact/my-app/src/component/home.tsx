import { useState } from "react";
import { Link } from "@tanstack/react-router";

function Home() {
  const [userName, setUserName] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-950 via-slate-950 to-black p-4">
      <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-emerald-600 text-3xl font-bold text-white shadow-lg shadow-emerald-500/30">
            =
          </div>
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-white">
          Calculator App
        </h1>
        <p className="mb-8 text-center text-sm text-white/50">
          Fast, simple, and always accurate.
        </p>

        <label className="mb-2 block text-sm font-semibold text-white/70">
          Enter Your Name
        </label>

        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="e.g. Aathil"
          className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-lg text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-400/20"
        />

        <div className="mt-3 h-5">
          {userName === "" ? (
            <p className="text-sm text-red-400">Please enter your name.</p>
          ) : (
            <p className="text-sm font-medium text-emerald-400">
              Welcome, {userName} 👋
            </p>
          )}
        </div>

        <Link to="/calculator">
          <button
            disabled={userName === ""}
            className="mt-6 w-full rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 py-3 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 enabled:hover:scale-[1.02] enabled:hover:from-emerald-300 enabled:hover:to-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start Calculator
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;