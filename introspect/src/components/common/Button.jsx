// // components/common/Button.jsx

export default function Button({ children, onClick, className = "", variant = "primary", disabled = false, type = "button" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 shadow-md hover:shadow-lg",
    outline: "border-2 border-violet-600 text-violet-600 hover:bg-violet-50 px-6 py-3",
    ghost: "text-gray-600 hover:text-violet-600 hover:bg-violet-50 px-4 py-2",
    danger: "bg-red-500 hover:bg-red-600 text-white px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}