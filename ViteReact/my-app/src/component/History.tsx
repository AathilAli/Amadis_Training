import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("history") || "[]"
    );
    
    setHistory(storedHistory);
  }, []);

  function clearHistory() {
    localStorage.removeItem("history");
    setHistory([]);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            History
          </h1>
          {history.length > 0 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/50">
              {history.length} {history.length === 1 ? "entry" : "entries"}
            </span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <span className="text-3xl">🕒</span>
            <p className="text-white/40">No calculations yet.</p>
          </div>
        ) : (
          <>
            <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {history.map((item, index) => {
                const [expr, result] = item.split(" = ");
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <span className="text-sm text-white/50">{expr}</span>
                    <span className="text-lg font-semibold text-emerald-400">
                      = {result}
                    </span>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={clearHistory}
              className="mt-6 w-full rounded-xl border border-red-500/30 bg-red-500/10 py-3 font-semibold text-red-400 transition-all duration-200 hover:bg-red-500/20 active:scale-95"
            >
              Clear History
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default History;