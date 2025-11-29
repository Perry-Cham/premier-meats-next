"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  _id?: string
  name?: string
  price?: number | string
  image?: string
  subcategory?: string
}
interface Props{
    product?:Product, 
    category:string, 
    onClose:()=>void,
    type?:string
}

function AdminProductModal({ product, category, onClose}:Props){
  const [form, setForm] = useState<Product>({
    name: product?.name || '',
    price: product?.price || 0,
    image: product?.image || '',
    subcategory: product?.subcategory || ''
  })
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  function setField(k: keyof Product, v:any){
    setForm(prev => ({...prev, [k]: v}))
  }

  // allow changing which collection the product belongs to
  const [collection, setCollection] = useState<string>(category)
  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setBusy(true)
    try{
      if(product && product._id){
        // update (in same collection)
        if(collection === category){
          const payload = { ...form, id: product._id, category }
          const res = await fetch('/api/editproduct', { method: 'PUT', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
          if(!res.ok) throw new Error('Update failed')
        }else{
          // move to different collection: delete from old then create in new collection
          const del = await fetch(`/api/deleteproduct/${category}/${product._id}`, { method: 'DELETE' })
          if(!del.ok) throw new Error('Delete old product failed')
          const payload = { ...form, category: collection }
          const create = await fetch('/api/newproduct', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
          if(!create.ok) throw new Error('Create in new collection failed')
        }
      }else{
        // create new
        const payload = { ...form, category: collection }
        const res = await fetch('/api/newproduct', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
        if(!res.ok) throw new Error('Create failed')
      }
      router.refresh()
      onClose()
    }catch(err){
      console.error(err)
      alert('Action failed')
    }finally{setBusy(false)}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="bg-white rounded-lg max-w-xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{product? 'Edit product' : 'Create product'}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input value={form.name} onChange={e=>setField('name', e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" value={String(form.price)} onChange={e=>setField('price', Number(e.target.value))} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Subcategory</label>
            <input value={form.subcategory} onChange={e=>setField('subcategory', e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input value={form.image} onChange={e=>setField('image', e.target.value)} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium">Collection</label>
            <select value={collection} onChange={e=>setCollection(e.target.value)} className="w-full border p-2 rounded">
              <option value="beef">beef</option>
              <option value="chicken">chicken</option>
              <option value="pork">pork</option>
              <option value="processed">processed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button disabled={busy} type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{busy ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

            
export default AdminProductModal