// components/session/MicButton.jsx

export default function MicButton({ isListening, onClick, disabled }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all duration-300 ${
          isListening
            ? "bg-violet-600 text-white scale-110 shadow-violet-300 shadow-xl animate-pulse"
            : "bg-white text-violet-600 border-2 border-violet-200 hover:border-violet-400"
        } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      >
        🎤
      </button>
      <p className="text-xs text-gray-500">
        {isListening ? "Click to stop" : "Click to speak"}
      </p>
    </div>
  );
}