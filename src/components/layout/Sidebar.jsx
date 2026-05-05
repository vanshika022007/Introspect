import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "New Interview", path: "/new", icon: "🎯" },
  { label: "Past Reports", path: "/reports", icon: "📋" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-[#0f1535] text-white flex flex-col py-6 px-4">

      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-lg">
          🎙️
        </div>
        <span className="text-xl font-bold text-white">Introspect</span>
      </div>


      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

 
      <div className="mt-auto">
        <div className="bg-[#1a2147] rounded-xl p-4 mb-4">
          <p className="text-white font-semibold text-sm mb-1">Ready to practice?</p>
          <p className="text-gray-400 text-xs mb-3">
            Start a new interview and boost your skills
          </p>
          <Link
            to="/new"
            className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
          >
            + New Interview
          </Link>
        </div>
        <p className="text-center text-gray-500 text-xs">Made for practice. 💜</p>
      </div>
    </div>
  );
}