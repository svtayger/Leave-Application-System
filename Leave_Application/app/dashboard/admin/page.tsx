"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import LeaveApprovalList from "@/components/leave-approval-list"

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Requests awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-12">
                <span className="text-2xl font-bold">5</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Approved Today</CardTitle>
              <CardDescription>Leaves approved today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-12">
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Team on Leave</CardTitle>
              <CardDescription>Currently on leave</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-12">
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <LeaveApprovalList />
      </div>
    </DashboardLayout>
  )
}
