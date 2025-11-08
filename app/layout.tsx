import "@/styles/globals.css";
import Nav from '@/app/components/navbar'

import { Providers } from "./providers";



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
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
              {children}
              </div>
        </Providers>
      </body>
    </html>
  );
}
