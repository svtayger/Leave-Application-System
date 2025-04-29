"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarDays, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"user" | "admin">("user")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would validate credentials here
    // For demo purposes, we're just checking the email to determine role
    if (email.includes("admin")) {
      router.push("/dashboard/admin")
    } else {
      router.push("/dashboard/user")
    }
  }

  // For demo purposes, quick login buttons
  const loginAsUser = () => {
    setEmail("user@example.com")
    setPassword("password")
    setRole("user")
    router.push("/dashboard/user")
  }

  const loginAsAdmin = () => {
    setEmail("admin@example.com")
    setPassword("password")
    setRole("admin")
    router.push("/dashboard/admin")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <CalendarDays className="h-5 w-5 text-emerald-500" />
            <span>LeaveFlow</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
            <CardTitle className="text-2xl">Welcome to LeaveFlow</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-sm text-emerald-600 dark:text-emerald-400">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
              >
                Sign In
              </Button>

              <div className="text-center text-sm text-muted-foreground">For demo purposes:</div>
              <div className="flex gap-2 w-full">
                <Button type="button" variant="outline" className="flex-1" onClick={loginAsUser}>
                  Login as User
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={loginAsAdmin}>
                  Login as Admin
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
