"use client";

import { cn } from "@/lib/utils";
import { MobileNavMenu } from "./custom/navbar/navbar-mobile";
import { DesktopNavMenu } from "./custom/navbar/navbar-desktop";
import { Navbar1Props } from "./custom/navbar/types";
import {
  logo as defaultLogo,
  menuItems as defaultMenu,
} from "@/config/navigation";

const Navbar1 = ({
  logo = defaultLogo,
  menu = defaultMenu,
  className,
}: Navbar1Props) => {
  return (
    <header className={cn("py-2", className)}>
      <div className="container mx-auto">
        <DesktopNavMenu logo={logo} menu={menu} />
        <MobileNavMenu />
      </div>
    </header>
  );
};

export default Navbar1;
