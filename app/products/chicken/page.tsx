'use client'
import Intro from '@/app/components/intro'
import Product_Card from '@/app/components/product_card'
import axios from 'axios'
import { useEffect, useState } from 'react';
function Chicken() {
  const [data,setData] = useState([])
  useEffect(() => {
    async function test(){
  try{
  let response = await axios.get(`/api/getproducts/chicken`)
  setData(response.data)
  }catch(err){
    console.error(err)
  }
    }
    test()
  },[])
  const message =<><p>
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
      <div>
        {data && data.map((p) => (<Product_Card name={p.name} price={p.price} imagesrc={p.image}/>))}
      </div>
    </main>
  )
}
export default Chicken