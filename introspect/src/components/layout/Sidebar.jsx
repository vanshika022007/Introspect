
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/new-interview", label: "New Interview", icon: "▶️" },
  { path: "/reports", label: "Past Reports", icon: "📋" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-[#1a1033] flex flex-col py-6 px-4 shrink-0">

      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-9 h-9 rounded-xl bg-violet-500 flex items-center justify-center text-white text-lg">
          🎙
        </div>
        <span className="text-white font-bold text-xl tracking-tight">Introspect</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

     
      <div className="mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 text-center mb-3">
          <p className="text-white text-sm font-semibold">Ready to practice?</p>
          <p className="text-gray-400 text-xs mt-1">Start a new interview and boost your skills</p>
        </div>
        <NavLink
          to="/new-interview"
          className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 text-sm font-semibold w-full transition-colors"
        >
          + New Interview
        </NavLink>
      </div>
    </aside>
  );
}