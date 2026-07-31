function TailwindReference() {
  return (
    <div className="min-h-screen space-y-16 bg-slate-950 p-8 text-white">   
      <h1 className="text-4xl font-extrabold text-emerald-400">
        Tailwind CSS Property Reference
      </h1>

      {/* LAYOUT */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">Layout</h2>
        <div className="space-y-3">
          <div className="block bg-slate-800 p-2">block</div>
          <div className="inline-block bg-slate-800 p-2">inline-block</div>
          <div className="flex  gap-3 bg-slate-800 p-2">
            <div className="bg-emerald-600 p-2">flex</div>
            <div className="bg-emerald-600 p-2">item</div>
          </div>
          <div className="grid grid-cols-3 gap-2 bg-slate-800 p-2">
            <div className="bg-emerald-600 p-2">grid</div>
            <div className="bg-emerald-600 p-2">col</div>
            <div className="bg-emerald-600 p-2">3</div>
          </div>
          <div className="hidden bg-slate-800 p-2">hidden (not visible)</div>
          <div className="relative h-16 bg-slate-800">
            <div className="absolute bottom-1 right-1 bg-emerald-600 p-1 text-xs">
              absolute + bottom-1 + right-1
            </div>
          </div>
          <div className="fixed-example text-xs text-white/40">
            fixed / sticky — positions relative to viewport/scroll (not shown
            inline)
          </div>
          <div className="overflow-hidden h-10 w-40 bg-slate-800 p-2 text-xs">
            overflow-hidden: this text is long enough to clip off the edge
          </div>
          <div className="z-10 relative bg-slate-800 p-2 text-xs">
            z-10 (stack order)
          </div>
        </div>
      </section>

      {/* FLEXBOX & GRID */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">
          Flexbox & Grid
        </h2>
        <div className="space-y-3">
          <div className="flex flex-row gap-2 bg-slate-800 p-2">
            <div className="bg-emerald-600 p-2">flex-row</div>
            <div className="bg-emerald-600 p-2">item</div>
          </div>
          <div className="flex flex-col gap-2 bg-slate-800 p-2">
            <div className="bg-emerald-600 p-2">flex-col</div>
            <div className="bg-emerald-600 p-2">item</div>
          </div>
          <div className="flex justify-between bg-slate-800 p-2">
            <div className="bg-emerald-600 p-2">justify-between</div>
            <div className="bg-emerald-600 p-2">item</div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 p-2 h-16">
            <div className="bg-emerald-600 p-2">items-center</div>
          </div>
          <div className="flex flex-wrap gap-2 bg-slate-800 p-2 w-40">
            <div className="bg-emerald-600 p-2">flex-wrap</div>
            <div className="bg-emerald-600 p-2">wraps</div>
            <div className="bg-emerald-600 p-2">here</div>
          </div>
          <div className="flex bg-slate-800 p-2">
            <div className="flex-1 bg-emerald-600 p-2">flex-1 (grow)</div>
            <div className="bg-emerald-700 p-2">fixed</div>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-slate-800 p-2">
            <div className="col-span-2 bg-emerald-600 p-2">col-span-2</div>
          </div>
        </div>
      </section>

      {/* SPACING */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">Spacing</h2>
        <div className="space-y-3">
          <div className="bg-slate-800 p-4">p-4 (padding all sides)</div>
          <div className="bg-slate-800 px-8 py-2">px-8 py-2 (padding x/y)</div>
          <div className="bg-slate-800 pt-6">pt-6 (padding top)</div>
          <div className="flex gap-4 bg-slate-800 p-2">
            <div className="bg-emerald-600 p-2">m-2</div>
            <div className="m-2 bg-emerald-600 p-2">margin</div>
          </div>
          <div className="bg-slate-800 p-2 space-y-2">
            <div className="bg-emerald-600 p-1">space-y-2</div>
            <div className="bg-emerald-600 p-1">between children</div>
          </div>
        </div>
      </section>

      {/* SIZING */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">Sizing</h2>
        <div className="space-y-3">
          <div className="w-32 bg-emerald-600 p-2">w-32</div>
          <div className="w-1/2 bg-emerald-600 p-2">w-1/2</div>
          <div className="w-full bg-emerald-600 p-2">w-full</div>
          <div className="h-16 w-16 bg-emerald-600 p-2">h-16 w-16</div>
          <div className="min-h-[80px] bg-emerald-600 p-2">min-h-[80px]</div>
          <div className="max-w-xs bg-emerald-600 p-2">max-w-xs</div>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">Typography</h2>
        <div className="space-y-2">
          <p className="text-xs">text-xs</p>
          <p className="text-base">text-base</p>
          <p className="text-2xl">text-2xl</p>
          <p className="font-light">font-light</p>
          <p className="font-bold">font-bold</p>
          <p className="italic">italic</p>
          <p className="underline">underline</p>
          <p className="line-through">line-through</p>
          <p className="uppercase">uppercase</p>
          <p className="tracking-widest">tracking-widest</p>
          <p className="leading-loose">leading-loose (line height)</p>
          <p className="text-left">text-left</p>
          <p className="text-center">text-center</p>
          <p className="text-right">text-right</p>
          <p className="truncate w-32 bg-slate-800">
            truncate: long text gets clipped with ellipsis
          </p>
          <p className="text-emerald-400">text-emerald-400 (color)</p>
        </div>
      </section>

      {/* BACKGROUNDS */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">Backgrounds</h2>
        <div className="space-y-3">
          <div className="bg-red-500 p-2">bg-red-500</div>
          <div className="bg-gradient-to-r from-emerald-400 to-blue-600 p-2">
            bg-gradient-to-r + from/to
          </div>
          <div className="bg-white/20 p-2 backdrop-blur-sm">
            bg-white/20 (opacity)
          </div>
          <div className="bg-slate-800 bg-[url('https://placehold.co/40')] bg-cover p-2">
            bg-cover + bg-[url()]
          </div>
        </div>
      </section>

      {/* BORDERS */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">Borders</h2>
        <div className="space-y-3">
          <div className="border border-white/30 p-2">border</div>
          <div className="border-4 border-emerald-500 p-2">
            border-4 border-emerald-500
          </div>
          <div className="border-t-2 border-amber-500 p-2">
            border-t-2 (top only)
          </div>
          <div className="rounded-lg bg-slate-800 p-2">rounded-lg</div>
          <div className="rounded-full bg-slate-800 p-4 w-fit">
            rounded-full
          </div>
          <div className="divide-y divide-white/20 bg-slate-800">
            <div className="p-2">divide-y</div>
            <div className="p-2">between rows</div>
          </div>
        </div>
      </section>

      {/* EFFECTS & FILTERS */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">
          Effects & Filters
        </h2>
        <div className="space-y-3">
          <div className="bg-slate-800 p-2 shadow-lg">shadow-lg</div>
          <div className="bg-slate-800 p-2 opacity-50">opacity-50</div>
          <div className="bg-slate-800 p-2 blur-sm">blur-sm</div>
          <div className="bg-slate-800 p-2 brightness-150">brightness-150</div>
          <div className="bg-slate-800 p-2 grayscale">grayscale</div>
          <div className="bg-slate-800/60 p-2 backdrop-blur-md">
            backdrop-blur-md
          </div>
        </div>
      </section>

      {/* TRANSFORMS & TRANSITIONS */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">
          Transforms & Transitions
        </h2>
        <div className="flex gap-4">
          <div className="rotate-12 bg-emerald-600 p-2">rotate-12</div>
          <div className="scale-110 bg-emerald-600 p-2">scale-110</div>
          <div className="-translate-y-2 bg-emerald-600 p-2">
            -translate-y-2
          </div>
          <div className="skew-x-6 bg-emerald-600 p-2">skew-x-6</div>
          <div className="cursor-pointer bg-emerald-600 p-2 transition-all duration-300 hover:scale-125 hover:bg-emerald-400">
            hover:scale-125 (transition)
          </div>
        </div>
      </section>

      {/* INTERACTIVITY / STATE VARIANTS */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">
          Interactivity & State Variants
        </h2>
        <div className="flex flex-wrap gap-3">
          <button className="bg-emerald-600 p-2 hover:bg-emerald-400">
            hover:
          </button>
          <button className="bg-emerald-600 p-2 focus:ring-4 focus:ring-emerald-300">
            focus:
          </button>
          <button className="bg-emerald-600 p-2 active:scale-90">
            active:
          </button>
          <button disabled className="bg-emerald-600 p-2 disabled:opacity-30">
            disabled:
          </button>
          <input
            placeholder="placeholder:text-red-400"
            className="rounded bg-slate-800 p-2 placeholder:text-red-400"
          />
          <div className="group bg-slate-800 p-2">
            <span className="text-white/40 group-hover:text-emerald-400">
              group-hover:
            </span>
          </div>
        </div>
      </section>

      {/* RESPONSIVE VARIANTS */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">
          Responsive Breakpoints
        </h2>
        <div className="bg-emerald-600 p-2 text-sm sm:bg-amber-600 md:bg-red-600 lg:bg-blue-600 xl:bg-purple-600">
          sm: md: lg: xl: (color changes as screen widens — resize to test)
        </div>
      </section>

      {/* FLEX/GRID ALIGNMENT DEMO */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-amber-400">
          Object Fit / Aspect Ratio
        </h2>
        <div className="aspect-square w-24 bg-emerald-600 p-2 text-xs">
          aspect-square
        </div>
      </section>
    </div>
  );
}

export default TailwindReference;
