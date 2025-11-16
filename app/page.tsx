"use client";
import Image from "next/image";
import { TrendingUp, HandCoins, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const cardStyles = "max-w-lg md:min-h-[380px] md:w-[25%] bg-white";
  const cardButtonStyles =
    "cursor-pointer bg-red-600 text-white font-semibold rounded-lg hover:bg-yellow-400 hover:text-black hover:font-bold transition-bg duration-300";
  const cardTitleStyles = "text-xl font-semibold";
  const iconSize = 48;
  const contentStyles = "min-h-[140px]";
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[url('https://04nsltlcl2.ufs.sh/f/5OZVqozoH8GNU3KtIkxsiI17QYO4wLt9SGCvjqmzg0WA2Dxc')] bg-cover bg-center h-[94vh] w-[100%] relative">
        <div className="absolute bg-black/70 inset-0 z-[1]"></div>
        <div className="absolute flex flex-col justify-center items-center inset-0 z-10 h-[100%]">
          <h1 className="font-bold text-white text-5xl">
            <span className="block text-center my-2">Welcome</span>
            <span className="block text-center my-2"> To</span>
            <span className="block text-center my-2">Premier Empire Meats</span>
          </h1>
          <a href="/contact" className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-yellow-500 hover:text-black transition-bg duration-300">
            Get Started
          </a>
        </div>
      </section>
      <section className="min-h-screen px-4 bg-slate-100 py-8 md:text-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Who We Are
        </h2>
        <p className="w-[80%] md:w-[60%] mx-auto mb-10">
          The word <span className="font-bold text-red-600">PREMIER</span> means
          Number One, Second to None, First Class, Top Notch. We are happy to
          introduce you to{" "}
          <span className="font-bold text-red-600">PREMIER MEATS</span>. We are
          a player in the wholesale and retail of an assortment of fresh and
          processed meat products in the Zambian, regional and international
          markets. Our products are packed and supplied with the consumer in
          mind: Whether you are a caterer, restaurateur, a trader, a wholesaler,
          a retailer, or simply a consumer, we have a range of products packed
          especially for your needs.
        </p>
        <div>
          <div className="flex justify-center  items-center gap-5 md:gap-10 flex-col md:flex-row mt-4">
            <Card className={cardStyles}>
              <CardHeader>
                <div className="">
                  <TrendingUp size={iconSize} />
                </div>
                <CardTitle className={cardTitleStyles}>Our Vision</CardTitle>
              </CardHeader>
              <CardContent className={contentStyles}>
                To be the most customer-centered and dominant meat production,
                processing and supply company in the national and regional
                markets.
              </CardContent>
              <CardFooter>
                <a href="#">
                  <Button className={cardButtonStyles}>Learn More</Button>
                </a>
              </CardFooter>
            </Card>

            <Card className={cardStyles}>
              <CardHeader>
                <div className="">
                  <Target size={iconSize} />
                </div>
                <CardTitle className={cardTitleStyles}>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className={contentStyles}>
                To be a company that meets clients needs wherever they are
                locally, regionally or internationally and to provide a one-stop
                all-in-one food solution with passion and professionalism for
                enduring results
              </CardContent>
              <CardFooter>
                <a href="#">
                  <Button className={cardButtonStyles}>Learn More</Button>
                </a>
              </CardFooter>
            </Card>

            <Card className={cardStyles}>
              <CardHeader>
                <div>
                  <HandCoins size={iconSize} />
                </div>
                <CardTitle className={cardTitleStyles}>Our Strength</CardTitle>
              </CardHeader>
              <CardContent className={contentStyles}>
                Our strength in this industry is our unlimited capacity to
                deliver nationwide with-in 48hours of receiving orders and to be
                a one-stop supplier for an assortment of meats
              </CardContent>
              <CardFooter>
                <a href="#">
                  <Button className={cardButtonStyles}>Learn More</Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
