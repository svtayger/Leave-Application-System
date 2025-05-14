"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

interface LeaveRequest {
  id: number
  name: string
  leaveType: string
  reason: string
  startDate: string
  endDate: string
}

export default function LeaveApprovalList() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leave/pending")
      setLeaveRequests(res.data)
    } catch (err) {
      console.error("Error fetching leave requests:", err)
    }
  }

  return (
    <Card>
      <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
        <CardTitle>Pending Leave Requests</CardTitle>
        <CardDescription>View leave requests submitted by employees</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {leaveRequests.length === 0 ? (
          <p className="text-muted-foreground">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex flex-col p-4 border rounded-lg dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{request.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800"
                  >
                    <Clock className="h-3 w-3" />
                    Pending
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Leave Type</p>
                    <p className="text-sm font-medium">{request.leaveType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">
                      {request.startDate} - {request.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium line-clamp-1">{request.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Reason</p>
                    <p className="text-sm font-medium line-clamp-1">{request.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
