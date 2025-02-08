"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"

// Sample data for complaints

export default function MyComplaints() {
  const [complaints, setComplaints] = useState<fetchedComplaint[]>([]);
  const {data: sesssion} = useSession();
  useEffect(()=>{
    async function fetchComplaints(){
      const response = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "fetchComplaints", data:sesssion?.user.email }),
      }); 

      const data = await response.json();
      console.log("Data fetched : ", data);
      setComplaints(data);
    }

    fetchComplaints();
  }, [sesssion]);

  if(!complaints)
    return(
  <p>No Complaints Registered</p>
  )

  if(!sesssion){
    return (
      <p>No user logged in!</p>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] mt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#192438] mb-6">My Complaints</h1>
        <div className="grid gap-6 md:grid-cols-2 nlg:grid-cols-3">
          {complaints.map((complaint) => (
            <Card key={complaint.$id} className="bg-[#FFFFFF] border-[#192438]">
              <CardHeader>
                <CardTitle className="text-[#192438]">{complaint.category}</CardTitle>
                <CardDescription className="text-[#192438]">{complaint.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#192438] mb-2">{complaint.explaination}</p>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={complaint.status === "Resolved" ? "default" : "secondary"}
                    className={`${
                      complaint.status === "pending"
                        ? "bg-yellow-500"
                        : complaint.status === "In Progress"
                          ? "bg-[#0093DD]"
                          : "bg-green-500"
                    } text-white`}
                  >
                    {complaint.status}
                  </Badge>
                </div>
                <p className="text-sm text-[#192438] mt-2">
                  Submitted on: {new Date(complaint.$createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

