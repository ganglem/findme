"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Radio, User } from "lucide-react"

type NavigationProps = {}

export function Navigation({}: NavigationProps) {
  const pathname = usePathname()

  return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="container max-w-md mx-auto">
          <div className="flex justify-around py-2">
            <NavItem href="/" icon={<Home />} label="Home" active={pathname === "/"} />
            <NavItem href="/timetable" icon={<Calendar />} label="Timetable" active={pathname === "/timetable"} />
            <NavItem href="/live" icon={<Radio />} label="Live" active={pathname === "/live"} />
            <NavItem href="/profile" icon={<User />} label="Profil" active={pathname === "/profile"} />
          </div>
        </div>
      </nav>
  )
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
              active ? "text-primary" : "text-muted-foreground"
          }`}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Link>
  )
}
