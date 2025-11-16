"use client";
import Image from "next/image";
import {TrendingUp, Target, HandCoins} from 'lucide-react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Overlay_Card from '@/app/components/overlay_card'

export default function Home() {
  const cardStyles = "max-w-lg min-h-[300px] md:w-[25%] bg-white"
  const cardButtonStyles = "cursor-pointer bg-red-600 text-white font-semibold rounded-lg hover:bg-yellow-400 hover:text-black hover:font-bold transition-bg duration-300"
  const cardTitleStyles = "text-xl font-semibold"
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[url('https://ik.imagekit.io/ypgvaedes/Images/Hero.jpeg?updatedAt=1763243890397')] bg-cover bg-center h-[94vh] w-[100%] relative">
        <div className="absolute bg-black/70 inset-0 z-[1]"></div>
        <div className="absolute flex flex-col justify-center items-center inset-0 z-10 h-[100%]">
          <h1 className="font-bold text-white text-3xl md:text-5xl">
            <span className="block text-center my-2">Welcome</span>
            <span className="block text-center my-2"> To</span>
            <span className="block text-center my-2">Premier Empire Meats</span>
          </h1>
          <button className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-yellow-500 hover:text-black transition-bg duration-300">
            Get Started
          </button>
        </div>
      </section>
      <section className="min-h-screen px-4 bg-slate-100 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Who We Are</h2>
        <p className="w-[80%] mx-auto">
          The word PREMIER means Number One, Second to None, First Class, Top
          Notch We are happy to introduce you to PREMIER MEATS. We are a player
          in the wholesale and retail of an assortment of fresh and processed
          meat products in the Zambian, regional and international markets. Our
          products are packed and supplied with the consumer in mind: Whether
          you are a caterer, restaurateur, a trader, a wholesaler, a retailer,
          or simply a consumer, we have a range of products packed especially
          for your needs
        </p>
        <div>
          <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-4">
            <Card className={cardStyles}>
              <CardHeader>
                <CardTitle className={cardTitleStyles}>Our Vision</CardTitle>
                <div className="flex justify-center align-center"><HandCoins/></div>
              </CardHeader>
              <CardContent>
                To be the most customer-centered and dominant meat production, processing and supply company in the national and regional markets.
              </CardContent>
              <CardFooter>
                <Button className={cardButtonStyles}>Learn More</Button>
              </CardFooter>
            </Card>

            <Card className={cardStyles}>
              <CardHeader>
                <CardTitle className={cardTitleStyles}>Our Mission</CardTitle>
                                <div className="flex justify-center align-center"><Target/></div>
              </CardHeader>
              <CardContent>
                To be a company that meets food needs wherever they are locally , regionally and internationally
              </CardContent>
              <CardFooter>
                <Button className={cardButtonStyles}>Learn More</Button>
              </CardFooter>
            </Card>

            <Card className={cardStyles}>
              <CardHeader>
                <CardTitle className={cardTitleStyles}>Our Strength</CardTitle>
                <div className="flex justify-center align-center"><TrendingUp/></div>
              </CardHeader>
              <CardContent>
                Our strength in this industry is our unlimited capacity to deliver nationwide with-in 48hours of receiving orders and to be a one-stop supplier for an assortment of meats
              </CardContent>
              <CardFooter>
                <Button className={cardButtonStyles}>Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-4">
        <h2 className="text-xl mb-4 text-center font-bold">~Our Products~</h2>
        <div className="flex justify-center items-center gap-8 flex-col md:flex-row">
                  <Overlay_Card
          title={"Beef"}
          link={"/products/beef"}
          bgUrl={"https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/TBone5_900x600.webp"}
        />
        <Overlay_Card
          title={"Pork"}
          link={"/products/pork"}
          bgUrl={"https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/Pork-Loin-TJops.png"}
        />
        <Overlay_Card
          title={"Chicken"}
          link={"/products/chicken"}
          bgUrl={"https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/RawWholeChicken.jpg?updatedAt=1763153733306"}
        />
        <Overlay_Card
          title={"Processed Meats"}
          link={"/products/processed"}
          bgUrl={'https://ik.imagekit.io/ypgvaedes/Product%20Images/Aesthetic%20Photos/meat_counter_in_the_supermarket_1190595804.jpg'}
        />
        </div>

      </section>
    </main>
  );
}
