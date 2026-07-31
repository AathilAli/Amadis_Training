type ButtonVariant = "number" | "operator" | "action" | "equals";

type ButtonProps = {
  value: string;
  onClick: () => void;
  variant?: ButtonVariant;
  wide?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  number:
    "bg-white/10 text-white hover:bg-white/20 active:bg-white/25 border border-white/10",
  operator:
    "bg-amber-500/90 text-white hover:bg-amber-400 active:bg-amber-500 shadow-amber-500/30",
  action:
    "bg-slate-600/70 text-white hover:bg-slate-500/80 active:bg-slate-600 border border-white/10",
  equals:
    "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white hover:from-emerald-300 hover:to-emerald-500 shadow-emerald-500/40",
};

function Button({ value, onClick, variant = "number", wide = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${wide ? "col-span-2" : ""}
        flex h-16 items-center justify-center rounded-2xl
        text-xl font-semibold tracking-wide
        shadow-lg backdrop-blur-sm
        transition-all duration-150 ease-out
        hover:scale-[1.04] hover:shadow-xl
        active:scale-95 active:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        ${variantStyles[variant]}
      `}
    >
      {value}
    </button>
  );
}

export default Button;
