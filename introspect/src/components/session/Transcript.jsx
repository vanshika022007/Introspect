// components/session/Transcript.jsx
// Shows real-time speech-to-text transcript

export default function Transcript({ text, isListening }) {
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 min-h-[100px]">
      {isListening && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-violet-500 rounded-full"
                style={{
                  height: "16px",
                  animation: `wave 0.6s ${i * 0.1}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
          <span className="text-violet-600 text-sm font-medium">Listening...</span>
        </div>
      )}

      {text ? (
        <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      ) : (
        <p className="text-gray-400 text-sm italic">
          {isListening ? "Speak clearly into your microphone..." : "Your answer will appear here"}
        </p>
      )}
    </div>
  );
}