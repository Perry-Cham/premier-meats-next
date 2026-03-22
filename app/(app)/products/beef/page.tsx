import Intro from '@/app/components/intro';
import Product_Card from '@/app/components/product_card'
import Product_Display from '@/app/components/product_display'
import axios from 'axios'

async function Beef() {
 
  const message = (
    <div className="md:text-lg">
      <p >
        Beef is a unique, special food. besides its amazing effect on the taste
        buds, beef offers a vast array of protein, vitamins and minerals that
        are essential for a healthy diet. there is no other single food that
        provides the same variety of health benefits found in beef.
      </p>
      <p>Beef is a great staple for a well balanced diet.</p>
      <p>Our Main Beef Lines are as follows:</p>
    </div>
  );
  return (
    <main className="px-2">
      <Intro title="Our Beef" message={message} />
 <Product_Display productName="beef" />
    </main>
  );
}

export default Beef;