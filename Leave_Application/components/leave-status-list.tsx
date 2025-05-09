"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import axios from "axios"

type LeaveStatus = "pending" | "approved" | "rejected"

interface LeaveRequest {
  id: number
  type: string
  startDate: string
  endDate: string
  days: number
  status: LeaveStatus
  reason: string
}

export default function LeaveStatusList() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const employeeId = 1 // TODO: Replace with logged-in user's ID from context or props

  useEffect(() => {
    axios.get(`http://localhost:5000/api/leave/user/${employeeId}`)
      .then(res => {
        const requests = res.data.map((req: any) => {
          const days =
            (new Date(req.endDate).getTime() - new Date(req.startDate).getTime()) /
              (1000 * 60 * 60 * 24) + 1

          return {
            id: req.id,
            type: req.leaveType,
            startDate: new Date(req.startDate).toDateString(),
            endDate: new Date(req.endDate).toDateString(),
            days,
            status: req.status,
            reason: req.reason,
          }
        })
        setLeaveRequests(requests)
      })
      .catch(err => {
        console.error("Failed to load leave requests:", err)
      })
  }, [])

  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 bg-amber-50 dark:bg-amber-950/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 bg-red-50 dark:bg-red-950/30">
            <XCircle className="h-3 w-3 mr-1" />
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
                  <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                  <Button variant="outline" size="sm" className="text-xs text-red-500">Cancel</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
