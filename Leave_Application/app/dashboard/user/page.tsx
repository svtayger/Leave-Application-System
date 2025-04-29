"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import LeaveApplicationForm from "@/components/leave-application-form"
import LeaveStatusList from "@/components/leave-status-list"

export default function UserDashboard() {
  return (
    <DashboardLayout userRole="user">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Leave Balance</CardTitle>
              <CardDescription>Your current leave balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Annual</span>
                  <span className="text-2xl font-bold">12 days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Sick</span>
                  <span className="text-2xl font-bold">7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-12">
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Approved Leaves</CardTitle>
              <CardDescription>This year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-12">
                <span className="text-2xl font-bold">8 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LeaveApplicationForm />
          <LeaveStatusList />
        </div>
      </div>
    </DashboardLayout>
  )
}
