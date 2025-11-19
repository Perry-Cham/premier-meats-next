
import Intro from '@/app/components/intro'
import Product_Card from '@/app/components/product_card'
import axios from 'axios'

const fetchProducts = async () => {
      try{
        const response = await axios.get(`${process.env.NODE_URL}/api/getproducts/chicken`)
        return response.data
      }catch(err){
        console.error(err)
        alert("There was an issue fetching the products")
      }
    };
    
async function Chicken() {
  const products = await fetchProducts()
  const message =<>
    <p>
          PREMIER MEATS aims to be a major role player when it comes to chicken
          supply in Zambia.
        </p>
        <p>
          Chicken is a delicacy in most Zambian households and is the most consumed meat among the Zambian People
        </p>
        <p>It can be boiled fried or grilled and is tasty in every form</p>
        <p>
        The full chicken lines produced by Premier Meats include the following
        </p></> 

  return (
    <main className="px-2">
      <Intro title="Our Chicken" message={message} />
      <div className="product-display">
        {products && products.map((p) => (<Product_Card key={p.id} name={p.name} price={p.price} imagesrc={p.image}/>))}
      </div>
    </main>
  )
}
export default Chicken