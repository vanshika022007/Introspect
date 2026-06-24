


export default function PromptBox({ question, isSpeaking }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-4">
   
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSpeaking ? "bg-violet-600 animate-pulse" : "bg-violet-100"}`}>
          <span className="text-lg">{isSpeaking ? "🔊" : "🔈"}</span>
        </div>

        <p className="text-gray-800 font-semibold text-lg leading-snug">
          {question || "Loading question..."}
        </p>
      </div>


      {isSpeaking && (
        <div className="mt-4 flex items-center gap-1 px-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-violet-400 rounded-full"
              style={{
                height: `${Math.random() * 20 + 4}px`,
                animationDelay: `${i * 0.05}s`,
                animation: "wave 0.8s ease-in-out infinite alternate",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}