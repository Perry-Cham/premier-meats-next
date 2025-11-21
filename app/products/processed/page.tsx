import Intro from '@/app/components/intro'
import axios from 'axios'
import Product_Card from '@/app/components/product_card'
import Product_Display from '@/app/components/product_display'
async function fetchProducts(){
  try{
    const response = await axios.get(`${process.env.NODE_URL}/api/getproducts/processed`)
    return response.data
  }catch(err){
    console.error(err)
  }
}
async function Processed(){
  

  const message = 
  <>
        <p>
          PREMIER MEATS not only provides fresh meat lines but also an
          assortment of delicious processed meats that would get each and every
          consumer yearning for more. Methods of processing include curing
          smoking or cooking.
        </p>
        <p>
          <em
            >The full list of processed meats provided by PREMIER include the
            following:</em
          >
        </p>
  </>
  
  return(
  <main className="px-2">
   <Intro title="Our Processed Meats" message={message} />
   <Product_Display productName="processed" />
  </main>
  )
}
export default Processed