"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { ComplaintCard } from "@/components/Complaint Card"

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
        <div className="grid gap-6 md:grid-cols-2">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.$id}
              category={complaint.category}
              type={complaint.type}
              description={complaint.explaination}
              status={complaint.status}
              studentName={complaint.studentName}
              rollNumber={complaint.rollNumber}
              roomNumber={complaint.roomNumber}
              complaintId={complaint.$id}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

