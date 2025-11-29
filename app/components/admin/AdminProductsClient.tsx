"use client"
import React, { useState } from 'react'
import AdminProductCard from './AdminProductCard'
import AdminProductModal from './AdminProductModal'

interface Product {
  _id: string
  name: string
  price: number
  image: string
  subcategory: string
}

export default function AdminProductsClient({ products, category }:{products:Array<Product>, category:string}){
  const [createOpen, setCreateOpen] = useState(false)
console.log(products)
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold capitalize">{category} products</h3>
        <div>
          <button onClick={()=>setCreateOpen(true)} className="px-3 py-1 bg-green-600 text-white rounded">Create new product</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => (
          <AdminProductCard key={p._id} product={p} category={category} />
        ))}
      </div>

      {createOpen && (
        <AdminProductModal category={category} onClose={()=>setCreateOpen(false)} />
      )}
    </div>
  )
}
