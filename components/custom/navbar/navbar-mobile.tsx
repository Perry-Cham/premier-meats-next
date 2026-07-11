{
  /* Mobile Menu */
}
import Link from "next/link.js";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";

import { logo } from "@/config/navigation";
import { menuItems as menu } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { renderMobileMenuItem } from "./utils";

export function MobileNavMenu() {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-[25%]">
          <Link href={logo.url} className="flex items-center gap-2">
            <img
              src={logo.src}
              className="max-h-10 dark:invert"
              alt={logo.alt}
            />
            <h1 className="font-bold serif text-2xl text-brand-red">Yetu</h1>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <a href={logo.url} className="flex items-center gap-2">
                  <img
                    src={logo.src}
                    className="max-h-8 dark:invert"
                    alt={logo.alt}
                  />
                </a>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menu.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                <Button
                  className="bg-brand-red hover:bg-brand-red-hover"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
