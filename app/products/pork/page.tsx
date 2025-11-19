import Intro from '@/app/components/intro'
import axios from 'axios'
import Product_Card from '@/app/components/product_card'
async function fetchData(){
  try{
    const response = await axios.get(`${process.env.NODE_URL}/api/getproducts/pork`)
    return response.data
  }catch(err){
    console.error(err)
  }
}
async function Pork(){
  const data = await fetchData()
  const message = 
  <>
            <p>
            PREMIER offers one of the most widely eaten and popular meats in the
            world... PORK!!!
          </p>
          <p>On offer are whole pork carcasses and pork cuts</p>
  </>
  
  return(
  <main className="px-2">
   <Intro title="Our Pork" message={message} />
      <div className="product-display">
        {data && data.map((p) => (<Product_Card name={p.name} price={p.price} imagesrc={p.image}/>))}
      </div>
  </main>
  )
}
export default Pork