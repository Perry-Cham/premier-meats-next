import Intro from '@/app/components/intro'
import axios from 'axios'
import Product_Card from '@/app/components/product_card'
import Product_Display from '@/app/components/product_display'

async function Pork(){
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
   <Product_Display productName="pork" />
  </main>
  )
}
export default Pork