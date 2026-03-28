import "@/styles/globals.css";

import Nav from "@/components/navbar1";
import Footer from "@/components/custom/footer";

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
