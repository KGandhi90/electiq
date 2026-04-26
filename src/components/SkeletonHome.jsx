export default function SkeletonHome() {
  return (
    <div className="page-enter flex flex-col gap-12" aria-hidden="true">
      {/* ── MASTHEAD ─────────────────────────── */}
      <section className="text-center py-10 sm:py-14 flex flex-col items-center">
        <div className="w-40 h-6 skeleton rounded-full mb-6"></div>
        <div className="w-full max-w-xl h-20 sm:h-24 skeleton rounded-2xl mb-4"></div>
        <div className="w-full max-w-md h-12 skeleton rounded-xl mb-6"></div>
        <div className="w-64 h-4 skeleton rounded-full"></div>
      </section>

      {/* ── STATS GRID ───────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-surface3 rounded-2xl p-5 sm:p-6 flex flex-col gap-3">
            <div className="w-20 h-10 skeleton rounded-lg"></div>
            <div className="w-24 h-4 skeleton rounded-full"></div>
            <div className="w-16 h-3 skeleton rounded-full"></div>
          </div>
        ))}
      </section>

      {/* ── DID YOU KNOW ─────────────────────── */}
      <section className="bg-orange-50 border border-orange-200 border-l-4 border-l-saffron rounded-2xl p-6 sm:p-8">
        <div className="w-24 h-3 skeleton rounded-full mb-4"></div>
        <div className="w-full h-4 skeleton rounded-full mb-2"></div>
        <div className="w-3/4 h-4 skeleton rounded-full mb-4"></div>
        <div className="flex gap-2 mt-4">
          <div className="w-4 h-1.5 skeleton rounded-full"></div>
          <div className="w-1.5 h-1.5 skeleton rounded-full"></div>
          <div className="w-1.5 h-1.5 skeleton rounded-full"></div>
        </div>
      </section>

      {/* ── FEATURE CARDS ────────────────────── */}
      <section>
        <div className="w-32 h-4 skeleton rounded-full mb-5 pl-3 border-l-4 border-saffron"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-surface3 rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 skeleton rounded-xl"></div>
                <div className="w-16 h-5 skeleton rounded-full"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-1/2 h-6 skeleton rounded-lg"></div>
                <div className="w-full h-4 skeleton rounded-full"></div>
                <div className="w-5/6 h-4 skeleton rounded-full"></div>
              </div>
              <div className="w-20 h-4 skeleton rounded-full mt-auto"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
