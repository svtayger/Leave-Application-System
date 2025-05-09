"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  
  // Mounted state to prevent hydration error
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
  
      if (!response.ok) {
        throw new Error('Invalid credentials')
      }
  
      const user = await response.json()
      
      // Redirect based on role
      if (user.role === 'admin') {
        router.push('/dashboard/admin')
      } else {
        router.push('/dashboard/user')
      }
    } catch (err) {
      alert('Login failed: ' + err.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <CalendarDays className="h-5 w-5 text-emerald-500" />
            <span>LeaveFlow</span>
          </div>
          
          {/* Only render the theme toggle button after the component is mounted */}
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
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
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
