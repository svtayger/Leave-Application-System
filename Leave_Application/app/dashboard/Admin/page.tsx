"use client"

import DashboardLayout from "@/components/dashboard-layout"
import LeaveView from "@/components/leave-view"
import UsersView from "@/components/users-view"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Leave Requests</h2>
            <LeaveView />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">All Users</h2>
            <UsersView />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
