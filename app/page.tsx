export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          Restockr Draft
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          The beautiful ordering platform for restaurants and distributors
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Optimize orders, respect preferred vendors, track invoices through
          Mintsy, and give the founder instant control through Bud.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
            Restaurant Login
          </button>
          <button className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50">
            Distributor Login
          </button>
          <button className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50">
            Founder View
          </button>
        </div>
      </section>
    </main>
  );
}