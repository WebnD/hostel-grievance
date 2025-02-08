'use client'
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ComplaintCardProps {
  category: string;
  type: string;
  description: string;
  status: string;
  studentName: string;
  rollNumber: string;
  roomNumber: string;
  complaintId: string;
  query?:string;
}

export function HallComplaintCard({
  category,
  type,
  description,
  status: initialStatus,
  studentName,
  rollNumber,
  roomNumber,
  complaintId,
  query
}: ComplaintCardProps) {
  const [status, setStatus] = useState(initialStatus);

  const handleResolve = () => {

    setStatus("Solved-by-Hostel");
    const response = fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "resolvebyhostel", data: complaintId }),
      }); 
  };

  const handleUnresolve = () => {

    setStatus("Pending");
    const response = fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "unresolvebyhostel", data: complaintId }),
      }); 

  };

  return (
    <Card className="bg-[#FFFFFF] border-2 border-[#192438] rounded-[20px] overflow-hidden">
      {/* Top Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-4xl font-bold text-[#192438]">{category}</h3>
          <Badge
            variant="outline"
            className={`
              ${status === "Pending" ? "bg-[#F5D0A9] border-[#D4A76A] text-[#8B6F47]" : ""}
              ${status === "Solved-by-Hostel" ? "bg-[#0093DD] text-white" : ""}
              ${status === "Resolved" ? "bg-green-100 border-green-500 text-green-700" : ""}
              ${status === "Not-Resolved" ? "bg-red-100 border-red-500 text-red-700" : ""}
              px-4 py-2 text-sm font-medium rounded-full
            `}
          >
            {status}
          </Badge>
        </div>
        <p className="text-xl text-[#192438] mb-2">{type}</p>
        <p className="text-[#192438]">{description}</p>
        {query && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h4 className="text-lg font-semibold text-[#192438]">Query:</h4>
            <p className="text-[#192438]">{query}</p>
          </div>
        )}
      </div>

      {/* Dashed Separator */}
      <div className="border-t-2 border-dashed border-[#192438]"></div>

      {/* Bottom Section */}
      <div className="p-4 flex justify-between items-center bg-[#FFFFFF]">
        <span className="font-mono text-[#192438]">{studentName}</span>
        <span className="font-mono text-[#192438]">{rollNumber}</span>
        <span className="font-mono text-[#192438]">{roomNumber}</span>
      </div>

      {/* Resolve/Unresolve Button */}
      <div className="p-4 flex justify-end bg-[#FFFFFF]">
        {status === "Pending" ? (
          <Button onClick={handleResolve} className="bg-green-600 text-white hover:bg-green-700">
            Resolved
          </Button>
        ) : status === "Solved-by-Hostel" ? (
          <Button onClick={handleUnresolve} className="bg-red-600 text-white hover:bg-red-700">
            Unresolve
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
