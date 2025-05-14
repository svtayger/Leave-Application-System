"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import LeaveView from "@/components/leave-view"

export default function HRDashboardPage() {
  return (
    <DashboardLayout userRole="HR">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
        <LeaveView />
      </div>
    </DashboardLayout>
  )
}
