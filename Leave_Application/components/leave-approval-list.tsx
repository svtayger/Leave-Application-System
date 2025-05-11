"use client"

import { useState, useEffect } from "react"
import axios from "axios"
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
  id: number
  name: string
  leaveType: string
  reason: string
  startDate: string
  endDate: string
}

export default function LeaveApprovalList() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [comment, setComment] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [action, setAction] = useState<"approve" | "reject" | null>(null)

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

  const handleAction = (request: LeaveRequest, actionType: "approve" | "reject") => {
    setSelectedRequest(request)
    setAction(actionType)
    setOpenDialog(true)
  }

  const confirmAction = async () => {
    if (!selectedRequest || !action) return
    try {
      await axios.post(`http://localhost:5000/api/leave/${selectedRequest.id}/${action}`, {
        comment,
      })
      setLeaveRequests((prev) => prev.filter((req) => req.id !== selectedRequest.id))
      setOpenDialog(false)
      setComment("")
    } catch (err) {
      console.error("Action failed:", err)
    }
  }

  return (
    <Card>
      <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 rounded-t-lg">
        <CardTitle>Pending Approval Requests</CardTitle>
        <CardDescription>Review and manage leave requests from your team</CardDescription>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
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
        )}
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
              <div className="mb-4">
                <h3 className="font-medium">{selectedRequest.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.leaveType} ({selectedRequest.startDate} - {selectedRequest.endDate})
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder={action === "approve" ? "Optional comment" : "Reason for rejection"}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required={action === "reject"}
                />
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
