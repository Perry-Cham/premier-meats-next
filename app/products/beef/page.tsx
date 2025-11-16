'use client';

import { useEffect, useState } from 'react';
import Intro from '@/app/components/intro';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
}

function Beef() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const message = (
    <>
      <p>
        Beef is a unique, special food. besides its amazing effect on the taste
        buds, beef offers a vast array of protein, vitamins and minerals that
        are essential for a healthy diet. there is no other single food that
        provides the same variety of health benefits found in beef.
      </p>
      <p>Beef is a great staple for a well balanced diet.</p>
      <p>Our Main Beef Lines are as follows:</p>
    </>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getproducts/beef');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="px-2">
      <Intro title="Our Beef" message={message} />
      
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.subcategory}</p>
              <p className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Beef;