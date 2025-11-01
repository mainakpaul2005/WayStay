"use client"

import Link from "next/link"
import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Building, Home, Search, Heart, MessageCircle, User, HelpCircle, Sparkles, Info, LogIn, UserPlus, ChevronDown, ChevronRight } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  const [openExplore, setOpenExplore] = React.useState(true)

  // Persist explore submenu open state
  React.useEffect(() => {
    try {
      const v = localStorage.getItem("sidebar_explore_open")
      if (v !== null) setOpenExplore(v === "true")
    } catch {}
  }, [])
  React.useEffect(() => {
    try {
      localStorage.setItem("sidebar_explore_open", String(openExplore))
    } catch {}
  }, [openExplore])

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="px-3 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
            <Building className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold">WayStay</span>
            <span className="text-xs text-sidebar-foreground/70">Stay Anywhere</span>
          </div>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <SidebarInput placeholder="Search stays..." />
          <SidebarTrigger className="h-8 w-8" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Discovery Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Discovery</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home" isActive={isActive("/")}>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Search" isActive={isActive("/search")}>
                  <Link href="/search">
                    <Search />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favorites" isActive={isActive("/favorites")}>
                  <Link href="/favorites">
                    <Heart />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-primary/10 text-primary">5</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Messages" isActive={isActive("/messages")}>
                  <Link href="/messages">
                    <MessageCircle />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-accent/20 text-accent-foreground">2</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" isActive={isActive("/profile")}>
                  <Link href="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Parent item with nested submenu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpenExplore((v) => !v)}
                  tooltip="Explore"
                  isActive={isActive("/ai-features") || isActive("/how-it-works") || isActive("/host") || isActive("/about") || isActive("/help")}
                >
                  {openExplore ? <ChevronDown /> : <ChevronRight />}
                  <span>Explore</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-green-500/15 text-green-700 dark:text-green-300">New</SidebarMenuBadge>
              </SidebarMenuItem>

              {openExplore && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/ai-features" isActive={isActive("/ai-features")}>
                      <Sparkles />
                      <span>AI Features</span>
                      <div className="ml-2 rounded border border-amber-500/30 bg-amber-400/15 px-1.5 py-0.5 text-[10px] font-semibold leading-3 text-amber-700 dark:text-amber-300">
                        BETA
                      </div>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/how-it-works" isActive={isActive("/how-it-works")}>
                      <Info />
                      <span>How it works</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/host" isActive={isActive("/host")}>
                      <Building />
                      <span>Become a host</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/about" isActive={isActive("/about")}>
                      <Info />
                      <span>About</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="/help" isActive={isActive("/help")}>
                      <HelpCircle />
                      <span>Help</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favorites" isActive={isActive("/favorites")}>
                  <Link href="/favorites">
                    <Heart />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-primary/10 text-primary">5</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Messages" isActive={isActive("/messages")}>
                  <Link href="/messages">
                    <MessageCircle />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-accent/20 text-accent-foreground">2</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" isActive={isActive("/profile")}>
                  <Link href="/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between rounded-md bg-background/60 px-2 py-1.5">
          <span className="text-xs text-sidebar-foreground/70">Theme</span>
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/auth" className="inline-flex items-center justify-center rounded-md border border-sidebar-border px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Link>
          <Link href="/auth?mode=signup" className="inline-flex items-center justify-center rounded-md bg-primary px-2 py-1.5 text-sm text-primary-foreground hover:bg-primary/90">
            <UserPlus className="mr-2 h-4 w-4" /> Join
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
