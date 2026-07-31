type DisplayProps = {
  value: string;
  expression?: string;
};

function Display({ value, expression }: DisplayProps) {
  return (
    <div className="mb-6 w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 shadow-inner backdrop-blur-sm">
      <div className="h-5 truncate text-right text-sm font-medium text-white/40">
        {expression ?? "\u00A0"}
      </div>
      <div
        className={`truncate text-right font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] ${
          value.length > 10 ? "text-3xl" : "text-5xl"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default Display;
