import "@/styles/globals.css";
import Nav from '@/app/components/navbar'
import Footer from '@/app/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Nav />
          <div className="relative flex flex-col ">
              {children}
              </div>
      <Footer />
      </body>
    </html>
  );
}
