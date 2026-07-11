"use client";
import Link from "next/link.js";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { renderMenuItem } from "./utils";
import { MenuItem } from "./types";

export const DesktopNavMenu = ({
  menu,
  logo,
}: {
  menu: Array<MenuItem>;
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
}) => {
  return (
    <nav className="hidden items-center justify-between lg:flex">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href={logo.url} className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tighter">
            {logo.title}
          </span>
        </Link>
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="bg-transparent">
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="text-[0.8rem] bg-brand-red hover:bg-brand-red-hover transition transition-bg"
          asChild
        >
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </nav>
  );
};
