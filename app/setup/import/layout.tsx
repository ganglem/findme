import type React from "react"
import Script from "next/script"

interface ImportLayoutProps {
  children: React.ReactNode
}

export default function ImportLayout({ children }: ImportLayoutProps) {
  return (
    <>
      <Script src="/extract-timetable.js" />
      {children}
    </>
  )
}
