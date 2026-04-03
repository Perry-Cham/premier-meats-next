import "@/styles/globals.css";
import Nav from "@/components/navbar1";
import Footer from "@/components/custom/footer";
import { Cormorant_Garamond, Jost } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],        // the weights you use
  style: ['normal', 'italic'],          // if you need italics
  variable: '--font-cormorant',         // optional but recommended
  display: 'swap',                      // prevents invisible text
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});
console.log(cormorant, jost)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"/>
        <div className="relative flex flex-col ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
