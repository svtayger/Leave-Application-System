"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"

export default function UsersView() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-4">
      {users.map((user: any) => (
        <Card key={user.id}>
          <CardContent className="p-4 space-y-1">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
