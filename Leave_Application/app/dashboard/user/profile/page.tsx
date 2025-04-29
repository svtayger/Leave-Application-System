"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DashboardLayout from "@/components/dashboard-layout"

export default function UserProfile() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [department, setDepartment] = useState("Engineering")
  const [phone, setPhone] = useState("+1 (555) 123-4567")

  return (
    <DashboardLayout userRole="user">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Profile</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-6 pb-4">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                    <AvatarFallback className="text-4xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Picture
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Notification preferences content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security options</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Security settings content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
