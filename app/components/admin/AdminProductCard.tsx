"use client"
import React, { useState } from 'react'
import AdminProductModal from './AdminProductModal'
import { useRouter } from 'next/navigation'

interface Product {
  _id: string
  name: string
  price: number
  image: string
  subcategory: string
}

export default function AdminProductCard({ product, category }:{product:Product, category:string}){
  const [editing, setEditing] = useState(false)
  const router = useRouter()

  async function handleDelete(){
    if(!confirm('Delete this product?')) return
    try{
      const res = await fetch(`/api/deleteproduct/${category}/${product._id}`, { method: 'DELETE' })
      if(!res.ok) throw new Error('delete failed')
      router.refresh()
    }catch(err){
      console.error(err)
      alert('Delete failed')
    }
  }

  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="mt-3 flex-1">
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-600">Subcategory: {product.subcategory}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold text-green-600">K{Number(product.price).toFixed(2)}</div>
        <div className="flex gap-2">
          <button onClick={()=>setEditing(true)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
          <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>

      {editing && (
        <AdminProductModal
          product={product}
          category={category}
          onClose={()=>setEditing(false)}
        />
      )}
    </div>
  )
}
