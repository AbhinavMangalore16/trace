"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9 rounded-full">
        <Sun className="size-4 opacity-50" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-9 rounded-full border border-border/40 bg-background/50 hover:bg-accent transition-colors"
      title="Toggle light/dark theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-purple-600 transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle light/dark theme</span>
    </Button>
  )
}
