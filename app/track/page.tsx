"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for complaints
const sampleComplaints = [
  {
    id: 1,
    category: "Maintenance",
    type: "Electrical",
    description: "Faulty light in room 101",
    status: "Pending",
    isUrgent: true,
    createdAt: "2025-03-15T10:30:00Z",
  },
  {
    id: 2,
    category: "Cleanliness",
    type: "Bathroom",
    description: "Clogged drain in communal bathroom",
    status: "In Progress",
    isUrgent: false,
    createdAt: "2025-03-14T14:45:00Z",
  },
  {
    id: 3,
    category: "Security",
    type: "Door Lock",
    description: "Broken lock on main entrance",
    status: "Resolved",
    isUrgent: true,
    createdAt: "2025-03-13T09:15:00Z",
  },
]

export default function MyComplaints() {
  const [complaints, setComplaints] = useState(sampleComplaints)

  return (
    <div className="min-h-screen bg-[#FFFFFF] mt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#192438] mb-6">My Complaints</h1>
        <div className="grid gap-6 md:grid-cols-2 nlg:grid-cols-3">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="bg-[#FFFFFF] border-[#192438]">
              <CardHeader>
                <CardTitle className="text-[#192438]">{complaint.category}</CardTitle>
                <CardDescription className="text-[#192438]">{complaint.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#192438] mb-2">{complaint.description}</p>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={complaint.status === "Resolved" ? "default" : "secondary"}
                    className={`${
                      complaint.status === "Pending"
                        ? "bg-yellow-500"
                        : complaint.status === "In Progress"
                          ? "bg-[#0093DD]"
                          : "bg-green-500"
                    } text-white`}
                  >
                    {complaint.status}
                  </Badge>
                  {complaint.isUrgent && (
                    <Badge variant="destructive" className="bg-red-500 text-white">
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-[#192438] mt-2">
                  Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

