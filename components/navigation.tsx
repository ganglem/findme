"use client"

import React, {useEffect, useState} from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Radio, User } from "lucide-react"

type NavigationProps = {}

export function Navigation({}: NavigationProps) {
  const [isNavigationVisible, setIsNavigationVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
      setIsNavigationVisible(false)
    } else {
      setIsNavigationVisible(true)
    }
  }, [pathname]);
        
  return isNavigationVisible ? (
      <nav className="fixed bottom-0 left-0 right-0 bg-sidebar-primary border-t border-border">
        <div className="container max-w-md mx-auto">
          <div className="flex justify-around py-2">
            <NavItem href="/" icon={<Home />} label="Home" active={pathname === "/"} />
            <NavItem href="/timetable" icon={<Calendar />} label="Timetable" active={pathname === "/timetable"} />
            <NavItem href="/live" icon={<Radio />} label="Live" active={pathname === "/live"} />
            <NavItem href="/profile" icon={<User />} label="Profil" active={pathname === "/profile"} />
          </div>
        </div>
      </nav>
  ) : null
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
      <Link
          href={href}
          className={`flex flex-col items-center p-2 ${
              active ? "text-primary-foreground" : "text-sidebar-foreground"
          }`}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Link>
  )
}
