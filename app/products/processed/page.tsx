import Intro from '@/app/components/intro'
import axios from 'axios'
import Product_Card from '@/app/components/product_card'
async function fetchData(){
  try{
    const response = await axios.get(`${process.env.NODE_URL}/api/getproducts/processed`)
    return response.data
  }catch(err){
    console.error(err)
  }
}
async function Processed(){
  const data = await fetchData()
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
       <div className="product-display">
        {data && data.map((p) => (<Product_Card name={p.name} price={p.price} imagesrc={p.image}/>))}
      </div>
  </main>
  )
}
export default Processed