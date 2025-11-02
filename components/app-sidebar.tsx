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
  
  // Memoize isActive callback to prevent recreating on every render
  // This helps Next.js Link prefetching work more efficiently
  const isActive = React.useCallback((href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }, [pathname])

  // Start with default state to avoid hydration mismatch
  const [openExplore, setOpenExplore] = React.useState<boolean>(true)
  const [mounted, setMounted] = React.useState(false)

  // Load persisted state only after mounting to avoid hydration issues
  React.useEffect(() => {
    setMounted(true)
    try {
      const v = localStorage.getItem("sidebar_explore_open")
      if (v !== null) {
        setOpenExplore(v === "true")
      }
    } catch {}
  }, [])

  // Persist explore submenu open state when it changes (only after mounted)
  React.useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("sidebar_explore_open", String(openExplore))
      } catch {}
    }
  }, [openExplore, mounted])

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="px-4 py-5">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-2 py-2 hover:bg-sidebar-accent rounded-md transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Building className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold">WayStay</span>
            <span className="text-xs text-muted-foreground">Find your stay</span>
          </div>
        </Link>
        
        <div className="mt-4">
          <SidebarInput 
            placeholder="Search places..." 
            className="h-9"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Home" 
                  isActive={isActive("/")}
                  className="h-9 px-3"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Search" 
                  isActive={isActive("/search")}
                  className="h-9 px-3"
                >
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="AI Features" 
                  isActive={isActive("/ai-features")}
                  className="h-9 px-3"
                >
                  <Link href="/ai-features">
                    <Sparkles className="h-4 w-4" />
                    <span>AI Features</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="text-[10px] bg-accent/10 text-accent border border-accent/20">
                  Beta
                </SidebarMenuBadge>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Messages" 
                  isActive={isActive("/messages")}
                  className="h-9 px-3"
                >
                  <Link href="/messages">
                    <MessageCircle className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="text-xs bg-accent/15 text-accent">2</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-2 text-xs text-muted-foreground">
            My Stuff
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Favorites" 
                  isActive={isActive("/favorites")}
                  className="h-9 px-3"
                >
                  <Link href="/favorites">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="text-xs">5</SidebarMenuBadge>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Profile" 
                  isActive={isActive("/profile")}
                  className="h-9 px-3"
                >
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-2 text-xs text-muted-foreground">
            More
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setOpenExplore((v) => !v)}
                  tooltip="Explore more"
                  isActive={isActive("/how-it-works") || isActive("/host") || isActive("/about") || isActive("/help")}
                  className="h-9 px-3"
                >
                  {openExplore ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span>Explore</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {openExplore && (
                <SidebarMenuSub className="ml-4 border-l border-border mt-1 space-y-0.5">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/host" 
                      isActive={isActive("/host")}
                      className="h-8 px-3"
                    >
                      <Building className="h-3.5 w-3.5" />
                      <span className="text-sm">Host your place</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/how-it-works" 
                      isActive={isActive("/how-it-works")}
                      className="h-8 px-3"
                    >
                      <Info className="h-3.5 w-3.5" />
                      <span className="text-sm">How it works</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/about" 
                      isActive={isActive("/about")}
                      className="h-8 px-3"
                    >
                      <Info className="h-3.5 w-3.5" />
                      <span className="text-sm">About us</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton 
                      href="/help" 
                      isActive={isActive("/help")}
                      className="h-8 px-3"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span className="text-sm">Help</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 mt-auto border-t">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        
        <div className="space-y-1.5 mt-3">
          <Link 
            href="/auth?mode=signup" 
            className="flex items-center justify-center gap-2 h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            <span>Sign up</span>
          </Link>
          
          <Link 
            href="/auth" 
            className="flex items-center justify-center gap-2 h-9 rounded-md border px-4 text-sm hover:bg-accent/50 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            <span>Log in</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

// Export directly - no need for React.memo since we're now using SSR
// and the component is already optimized with useCallback for isActive
export default AppSidebar
