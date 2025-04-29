"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle } from "lucide-react"

type LeaveStatus = "pending" | "approved" | "rejected"

interface LeaveRequest {
  id: string
  type: string
  startDate: string
  endDate: string
  days: number
  status: LeaveStatus
  reason: string
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    type: "Annual Leave",
    startDate: "May 15, 2023",
    endDate: "May 20, 2023",
    days: 5,
    status: "approved",
    reason: "Family vacation",
  },
  {
    id: "2",
    type: "Sick Leave",
    startDate: "June 5, 2023",
    endDate: "June 6, 2023",
    days: 2,
    status: "pending",
    reason: "Doctor's appointment",
  },
  {
    id: "3",
    type: "Personal Leave",
    startDate: "July 10, 2023",
    endDate: "July 10, 2023",
    days: 1,
    status: "rejected",
    reason: "Personal matters",
  },
  {
    id: "4",
    type: "Annual Leave",
    startDate: "August 1, 2023",
    endDate: "August 5, 2023",
    days: 5,
    status: "pending",
    reason: "Summer break",
  },
]

export default function LeaveStatusList() {
  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800"
          >
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 text-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800"
          >
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 text-red-500 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800"
          >
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
        <CardTitle>Leave Requests</CardTitle>
        <CardDescription>View the status of your leave requests</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {leaveRequests.map((request) => (
            <div key={request.id} className="flex flex-col p-4 border rounded-lg dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{request.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    {request.startDate} - {request.endDate} ({request.days} days)
                  </p>
                </div>
                {getStatusBadge(request.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{request.reason}</p>
              {request.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
