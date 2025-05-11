"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import LeaveApprovalList from "@/components/leave-approval-list"

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>


        <LeaveApprovalList />
      </div>
    </DashboardLayout>
  )
}
