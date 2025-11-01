"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "View your bookings and account information.",
  },
  {
    title: "Search",
    href: "/search",
    description: "Find the perfect place to stay.",
  },
  {
    title: "Favorites",
    href: "/favorites",
    description: "Your saved properties and wishlists.",
  },
  {
    title: "Messages",
    href: "/messages",
    description: "Chat with hosts and guests.",
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Manage your account settings.",
  },
  {
    title: "Help",
    href: "/help",
    description: "Get support and find answers.",
  },
]

export function Navbar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-background border-b">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <div className="font-bold text-xl text-primary">WayStay</div>
      </Link>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        WayStay
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Find your perfect stay anywhere in the world. Book unique accommodations and experiences.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/search" title="Search Properties">
                  Browse through thousands of verified properties.
                </ListItem>
                <ListItem href="/how-it-works" title="How it Works">
                  Learn how to book and manage your stays.
                </ListItem>
                <ListItem href="/host" title="Become a Host">
                  Share your space and earn extra income.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Account</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-2">
        <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground">
          Sign In
        </Link>
        <Link 
          href="/auth?mode=signup" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"