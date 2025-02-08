"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HallComplaintCard } from "@/components/HallComplaintCard";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState<fetchedComplaint[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchComplaints() {
      if (!session?.user?.email) return;
      
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchComplaints", data: session.user.email }),
      });
      
      const data = await response.json();
      console.log("Data fetched:", data);
      
      const filteredComplaints: fetchedComplaint[] = data.filter((complaint: fetchedComplaint) => {
        const createdAt = new Date(complaint.$createdAt).getTime();
        const now = Date.now();
        const diffInMinutes = (now - createdAt) / (1000 * 60);
        
        return diffInMinutes > 4;
      });

      setComplaints(filteredComplaints);
    }

    fetchComplaints();
  }, [session]);

  if (!session) {
    return <p>No user logged in!</p>;
  }

  if (complaints.length === 0) {
    return <p>No Complaints Registered</p>;
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] mt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#192438] mb-6">My Complaints</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {complaints.map((complaint) => (
            <HallComplaintCard
              key={complaint.$id}
              category={complaint.category}
              type={complaint.type}
              description={complaint.explaination}
              status={complaint.status}
              studentName={complaint.studentName}
              rollNumber={complaint.rollNumber}
              roomNumber={complaint.roomNumber}
              complaintId={complaint.$id}
              query={complaint.query}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
