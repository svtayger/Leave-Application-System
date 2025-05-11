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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LeaveApplicationForm />
          <LeaveStatusList />
        </div>
      </div>
    </DashboardLayout>
  )
}
