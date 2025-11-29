import Link from 'next/link'

const CATEGORIES = ['beef', 'chicken', 'pork', 'processed']

function Admin() {
  return (
    <main className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Admin panel</h2>
          <p className="text-sm text-gray-500">Choose a product category to manage</p>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <Link key={c} href={`/admin/${c}`} className="block p-6 bg-white rounded-lg shadow hover:shadow-lg border hover:border-red-400 transition-all">
            <div className="text-xl font-semibold capitalize">{c}</div>
            <div className="text-sm text-gray-500 mt-2">Manage {c} products — view, edit, delete and create</div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default Admin