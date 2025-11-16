"use client"
import { ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem } from "@/components/ui/menu"
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  type NavbarProps,
  NavbarProvider,
  NavbarSection,
  NavbarSeparator,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/navbar"
import { Separator } from "@/components/ui/separator"

const categories = [
  { id: 1, label: "Beef", url: "/products/beef" },
  { id: 2, label: "Pork", url: "/products/pork" },
  { id: 3, label: "Chicken", url: "/products/chicken" },
  { id: 4, label: "Processed Meats", url: "/products/processed" },
]

export default function AppNavbar(props: NavbarProps) {
  return (
    <NavbarProvider>
      <Navbar {...props}>
        <NavbarStart>
          <div className="flex justify-start align-center">
          <img className="h-[30]" src="https://04nsltlcl2.ufs.sh/f/5OZVqozoH8GNesbXcnIZPBCxGgVmHRiF3SdU0vnWlTqXo2ze"/>
          <h2 className="ml-2 self-center font-bold">Premier Meats</h2>
          </div>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          <NavbarItem href="/" >
            Home
          </NavbarItem>
          <NavbarItem href="/contact">Contact</NavbarItem>
          <NavbarItem href="#">About</NavbarItem>
          <Menu>
            <NavbarItem>
              Products
              <ChevronDownIcon className="col-start-3" />
            </NavbarItem>
            <MenuContent className="min-w-(--trigger-width) sm:min-w-56" items={categories}>
              {(item) => (
                <MenuItem id={item.id} textValue={item.label} href={item.url}>
                  {item.label}
                </MenuItem>
              )}
            </MenuContent>
          </Menu>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="max-md:hidden">
          <Button intent="plain" size="sq-sm" aria-label="Search for products">
            <MagnifyingGlassIcon />
          </Button>
          <Button intent="plain" size="sq-sm" aria-label="Your Bag">
            <ShoppingBagIcon />
          </Button>
          <Separator orientation="vertical" className="mr-3 ml-1 h-5" />

        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <Button intent="plain" size="sq-sm" aria-label="Search for products">
          <MagnifyingGlassIcon />
        </Button>
        <Button intent="plain" size="sq-sm" aria-label="Your Bag">
          <ShoppingBagIcon />
        </Button>
        <NavbarSeparator className="mr-2.5" />
      </NavbarMobile>
    </NavbarProvider>
  )
}