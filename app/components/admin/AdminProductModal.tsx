"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Product {
  _id?: string;
  name?: string;
  price?: number | string;
  image?: string;
  subcategory?: string;
  imageFile?: File | null;
}
interface Props {
  product?: Product;
  category: string;
  onClose: () => void;
  type?: "edit" | "create";
}

function AdminProductModal({ product, category, onClose, type}: Props): React.JSX.Element {
  alert(type)
  const [form, setForm] = useState<Product>({
    name: product?.name || "",
    price: product?.price || 0,
    image: product?.image || "",
    subcategory: product?.subcategory || "",
    imageFile: null,
  });
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  function setField(k: keyof Product, v: any) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  // allow changing which collection the product belongs to
  const [collection, setCollection] = useState<string>(category);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);

    try {
      const data = new FormData();
      // target category is the selected collection
      data.append("category", collection);
      if (product && product._id) {
        data.append("id", String(product._id));
      }

      data.append("name", String(form.name ?? ""));
      data.append("price", String(form.price ?? "0"));
      data.append("subcategory", String(form.subcategory ?? ""));

      // prefer file when present for uploads, otherwise send image url
      if (form.imageFile) {
        data.append("imageFile", form.imageFile);
      } else if (form.image) {
        data.append("image", String(form.image));
      }
  
      
      // Create or update logic
      if (product && product._id && type === "edit") {
        // update in same collection
        if (collection === category) {
          const res = await axios.post(`/api/editproduct`, data);
          if (res.status !== 200) throw new Error("Update failed");
        } else {
          // move to different collection: delete from old then create in new collection
          const del = await fetch(`/api/deleteproduct/${category}/${product._id}`, {
            method: "DELETE",
          });
          if (!del.ok) throw new Error("Delete old product failed");

          const res = await axios.post(`/api/newproduct`, data);
          if (res.status !== 200) throw new Error("Create in new collection failed");
        }
      } else if(product && product._id && type === "create")  {
        alert("Hello")
        // create new
      const res = await axios.post(`/api/newproduct`, data);
        if (res.status !== 200) throw new Error("Create failed");
      }

      router.refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    } finally {
      setBusy(false);
    }

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="bg-white rounded-lg max-w-xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {product ? "Edit product" : "Create product"}
          </h3>
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              value={String(form.price)}
              onChange={(e) => setField("price", Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Subcategory</label>
            <input
              value={form.subcategory}
              onChange={(e) => setField("subcategory", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image File</label>
            <input
              accept="image/*"
              onChange={(e) => setField("imageFile", e.target.files?.[0] || null)}
              type="file"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Collection</label>
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="beef">beef</option>
              <option value="chicken">chicken</option>
              <option value="pork">pork</option>
              <option value="processed">processed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button disabled={busy} type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              {busy ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductModal;
