"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminReports() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Reports</h1>

        <Tabs defaultValue="leave-usage" className="w-full">
          <TabsList>
            <TabsTrigger value="leave-usage">Leave Usage</TabsTrigger>
            <TabsTrigger value="department">Department</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="leave-usage" className="mt-6">
            <Card>
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                <CardTitle>Leave Usage Report</CardTitle>
                <CardDescription>Overview of leave usage across the organization</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80 flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Leave usage chart will be displayed here</p>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Total Leave Days</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">245 days</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Average Per Employee</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8.2 days</div>
                      <p className="text-xs text-muted-foreground">-3% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Most Common Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Annual Leave</div>
                      <p className="text-xs text-muted-foreground">62% of all leaves</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="department" className="mt-6">
            <Card>
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                <CardTitle>Department Report</CardTitle>
                <CardDescription>Leave usage by department</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Department report content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <Card>
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
                <CardTitle>Monthly Report</CardTitle>
                <CardDescription>Leave trends by month</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Monthly report content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
