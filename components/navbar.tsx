"use client"

import * as React from "react"
import Link from "next/link"
import { Home, MapPin, Heart, MessageCircle, User, HelpCircle, Search, Building } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

const components: { title: string; href: string; description: string; icon: React.ComponentType<any> }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "View your bookings and account information.",
    icon: Home,
  },
  {
    title: "Search",
    href: "/search",
    description: "Find the perfect place to stay.",
    icon: Search,
  },
  {
    title: "Favorites",
    href: "/favorites",
    description: "Your saved properties and wishlists.",
    icon: Heart,
  },
  {
    title: "Messages",
    href: "/messages",
    description: "Chat with hosts and guests.",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Manage your account settings.",
    icon: User,
  },
  {
    title: "Help",
    href: "/help",
    description: "Get support and find answers.",
    icon: HelpCircle,
  },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 transition-all duration-300 hover:opacity-80 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
            <Building className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold tracking-tight">WayStay</span>
            <span className="text-xs text-muted-foreground leading-none font-medium">Stay Anywhere</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 px-4 py-2 font-medium text-base transition-colors duration-200 hover:bg-muted/50">
                Getting started
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] grid">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-primary/10 to-primary/5 border border-primary/20 p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:from-primary/15 hover:to-primary/10 hover:border-primary/30"
                        href="/"
                      >
                        <Building className="h-6 w-6 text-primary mb-2" />
                        <div className="mb-2 mt-4 text-lg font-display font-semibold">
                          WayStay
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Find your perfect stay anywhere in the world. Book unique accommodations and unforgettable experiences.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/search" title="Search Properties" icon={Search}>
                    Browse through thousands of verified properties.
                  </ListItem>
                  <ListItem href="/how-it-works" title="How it Works" icon={HelpCircle}>
                    Learn how to book and manage your stays.
                  </ListItem>
                  <ListItem href="/host" title="Become a Host" icon={Building}>
                    Share your space and earn extra income.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 px-4 py-2 font-medium text-base transition-colors duration-200 hover:bg-muted/50">
                Account
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => {
                    const IconComponent = component.icon;
                    return (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={IconComponent}
                      >
                        {component.description}
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/ai-features" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "h-10 px-4 py-2 font-medium text-base transition-colors duration-200 hover:bg-muted/50")}>
                  AI Features
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "h-10 px-4 py-2 font-medium text-base transition-colors duration-200 hover:bg-muted/50")}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex font-medium hover:bg-secondary">
            <Link href="/auth">
              Sign In
            </Link>
          </Button>
          <Button size="sm" asChild className="font-medium bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300">
            <Link href="/auth?mode=signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<any> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group border border-transparent hover:border-border/50",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2 text-sm font-semibold leading-none">
            {Icon && <Icon className="h-5 w-5 text-primary group-hover:text-foreground transition-colors" />}
            <span className="text-base">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"