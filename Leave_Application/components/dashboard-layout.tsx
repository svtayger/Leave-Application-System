"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CalendarDays, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "user" | "manager" | "HR" 
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <CalendarDays className="h-5 w-5 text-emerald-500" />
            <span>LeaveFlow</span>
            {userRole === "manager" && (
              <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-full">
                Manager
              </span>
            )}
            {userRole === "HR" && (
              <span className="ml-2 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-0.5 rounded-full">
                HR
              </span>
            )}
          </div>

          <nav className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {userRole === "manager" && (
              <>
                <Button variant="ghost" onClick={() => router.push("/dashboard/manager")}>Dashboard</Button>
                <Button variant="ghost" onClick={() => router.push("/dashboard/manager/reports")}>Create New User</Button>
              </>
            )}

            {userRole === "HR" && (
              <Button variant="ghost" onClick={() => router.push("/dashboard/HR-View")}>HR Dashboard</Button>
            )}

            {userRole === "user" && (
              <Button variant="ghost" onClick={() => router.push("/dashboard/user")}>Dashboard</Button>
            )}

            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
}