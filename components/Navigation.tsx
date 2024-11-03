"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
    subItems: [
      { name: "Tech", link: "/blog/tech" },
      { name: "Non-Tech", link: "/blog/non-tech" },
    ],
  },
  {
    name: "Projects",
    link: "/projects",
  },
];

function NavItem({
  item,
  isMobile = false,
}: {
  item: (typeof NAV_ITEMS)[0];
  isMobile?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
    if (isMobile) {
      return (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-left text-sm font-medium transition-colors hover:text-primary"
          >
            {item.name}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </button>
          {isOpen && (
            <ul className="mt-2 ml-4 space-y-2">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link
                    href={subItem.link}
                    className="block text-sm transition-colors hover:text-primary"
                  >
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setIsOpen(!isOpen)}
              className={isOpen ? "bg-accent" : ""}
            >
              {item.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 p-4">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={subItem.link}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <Link
      href={item.link}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {item.name}
    </Link>
  );
}

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <ul
      className={cn(
        "flex",
        isMobile ? "flex-col space-y-4" : "items-center space-x-6"
      )}
    >
      {NAV_ITEMS.map((item, index) => (
        <li key={index}>
          <NavItem item={item} isMobile={isMobile} />
        </li>
      ))}
    </ul>
  );
}

export default function StickyNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">Faisalism</span>
            </Link>
          </div>
          <nav className="hidden md:flex">
            <NavLinks />
            <ThemeToggle />
          </nav>
          <div className="md:hidden">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <MobileLink
                  href="/"
                  className="flex items-center"
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <span className="font-bold">Faisalism</span>
                </MobileLink>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <NavLinks isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
