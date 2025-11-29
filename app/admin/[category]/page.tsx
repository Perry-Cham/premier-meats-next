import AdminProductsClient from '@/app/components/admin/AdminProductsClient'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  price: number
  image: string
  subcategory: string
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }){
  const {category} = await params
  // fetch products from existing API route
  const base = process.env.NODE_URL || ''
  try{
    const res = await fetch(`${base}/api/getproducts/${category}`)
    const products: Product[] = await res.json()
    return (
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold capitalize">{category} admin</h2>
            <p className="text-sm text-gray-500">Manage products in the {category} collection</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin" className="px-3 py-1 border rounded">Back</Link>
          </div>
        </div>

        <AdminProductsClient products={products} category={category} />
      </main>
    )
  }catch(err){
    console.error(err)
    return (
      <main className="p-6">
        <h2 className="text-xl font-semibold">{category} admin</h2>
        <div className="mt-4 text-red-600">Failed to load products</div>
      </main>
    )
  }
}
