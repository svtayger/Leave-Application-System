"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"

interface LeaveRequest {
  id: string
  employee: {
    name: string
    department: string
    avatar: string
    initials: string
  }
  type: string
  startDate: string
  endDate: string
  days: number
  reason: string
}

const pendingRequests: LeaveRequest[] = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      department: "Marketing",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    type: "Annual Leave",
    startDate: "May 15, 2023",
    endDate: "May 20, 2023",
    days: 5,
    reason: "Family vacation planned months in advance",
  },
  {
    id: "2",
    employee: {
      name: "Michael Chen",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    type: "Sick Leave",
    startDate: "June 5, 2023",
    endDate: "June 6, 2023",
    days: 2,
    reason: "Doctor's appointment and recovery",
  },
  {
    id: "3",
    employee: {
      name: "Emily Rodriguez",
      department: "HR",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    type: "Personal Leave",
    startDate: "July 10, 2023",
    endDate: "July 10, 2023",
    days: 1,
    reason: "Personal matters that need immediate attention",
  },
  {
    id: "4",
    employee: {
      name: "David Kim",
      department: "Finance",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
    type: "Annual Leave",
    startDate: "August 1, 2023",
    endDate: "August 5, 2023",
    days: 5,
    reason: "Summer break with family",
  },
  {
    id: "5",
    employee: {
      name: "Lisa Wang",
      department: "Product",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LW",
    },
    type: "Unpaid Leave",
    startDate: "September 15, 2023",
    endDate: "September 30, 2023",
    days: 15,
    reason: "Extended personal trip",
  },
]

export default function LeaveApprovalList() {
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [comment, setComment] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [action, setAction] = useState<"approve" | "reject" | null>(null)

  const handleAction = (request: LeaveRequest, actionType: "approve" | "reject") => {
    setSelectedRequest(request)
    setAction(actionType)
    setOpenDialog(true)
  }

  const confirmAction = () => {
    // Handle the approval or rejection logic here
    console.log(
      `${action === "approve" ? "Approved" : "Rejected"} request ${selectedRequest?.id} with comment: ${comment}`,
    )
    setOpenDialog(false)
    setComment("")
  }

  return (
    <Card>
      <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
        <CardTitle>Pending Approval Requests</CardTitle>
        <CardDescription>Review and manage leave requests from your team</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div key={request.id} className="flex flex-col p-4 border rounded-lg dark:border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={request.employee.avatar || "/placeholder.svg"} alt={request.employee.name} />
                    <AvatarFallback>{request.employee.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{request.employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800"
                >
                  <Clock className="h-3 w-3" />
                  Pending
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Leave Type</p>
                  <p className="text-sm font-medium">{request.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">
                    {request.startDate} - {request.endDate} ({request.days} days)
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reason</p>
                  <p className="text-sm font-medium line-clamp-1">{request.reason}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-800"
                  onClick={() => handleAction(request, "approve")}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
                  onClick={() => handleAction(request, "reject")}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action === "approve" ? "Approve Leave Request" : "Reject Leave Request"}</DialogTitle>
            <DialogDescription>
              {action === "approve"
                ? "The employee will be notified that their leave request has been approved."
                : "Please provide a reason for rejecting this leave request."}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="py-2">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage
                    src={selectedRequest.employee.avatar || "/placeholder.svg"}
                    alt={selectedRequest.employee.name}
                  />
                  <AvatarFallback>{selectedRequest.employee.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedRequest.employee.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.type} ({selectedRequest.days} days)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comment">Comments</Label>
                  <Textarea
                    id="comment"
                    placeholder={action === "approve" ? "Optional comment" : "Reason for rejection"}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required={action === "reject"}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              className={
                action === "approve"
                  ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
                  : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              }
            >
              {action === "approve" ? "Confirm Approval" : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
