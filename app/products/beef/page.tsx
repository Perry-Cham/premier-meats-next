import Intro from '@/app/components/intro';
import Product_Card from '@/app/components/product_card'
import axios from 'axios'
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
}
const fetchProducts = async () => {
      try{
        const response = await axios.get(`${process.env.NODE_URL}/api/getproducts/beef`)
        return response.data
      }catch(err){
        console.error(err)
        alert("There was an issue fetching the products")
      }
    };
async function Beef() {
 const products = await fetchProducts()
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
  return (
    <main className="px-2">
      <Intro title="Our Beef" message={message} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">     
      {products && products.map((p) => (<Product_Card key={p.id} name={p.name} price={p.price} imagesrc={p.image}/>))}

      </div>
    </main>
  );
}

export default Beef;