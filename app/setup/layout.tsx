import type React from "react"
import Script from "next/script"

interface SetupLayoutProps {
  children: React.ReactNode
}

export default function SetupLayout({ children }: SetupLayoutProps) {
  return (
    <>
      <Script src="/extract-timetable.js" />
      {children}
    </>
  )
}
