import { useState } from "react";
import Timer from "./components/Timer";
import useFetchTimers from "./hooks/useFetchTimers";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const timers = useFetchTimers();

  console.log("Timers data:", timers); // ✅ Check if timers are fetched correctly

  return (
    <div className={`min-h-screen p-10 transition-colors ${darkMode ? "dark" : ""}`}>
      <button
        className="mb-6 px-4 py-2 bg-primary text-white rounded-lg"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {timers.length > 0 ? (
          timers.map((t, i) => (
            <Timer key={i} duration={t.duration} label={t.name} />
          ))
        ) : (
          <p className="text-center text-red-500">No Timers Loaded</p>
        )}
      </div>
    </div>
  );
}

export default App;
