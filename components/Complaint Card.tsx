'use client'
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ComplaintCardProps {
  category: string;
  type: string;
  description: string;
  status: string;
  studentName: string;
  rollNumber: string;
  roomNumber: string;
  complaintId: string;
}

export function ComplaintCard({
  category,
  type,
  description,
  status: initialStatus,
  studentName,
  rollNumber,
  roomNumber,
  complaintId,
}: ComplaintCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isQueryDialogOpen, setQueryDialogOpen] = useState(false);
  const [queryText, setQueryText] = useState("");

  const handleResolve = () => {
    console.log("Complaint Resolved:", {
      complaintId,
      category,
      type,
      description,
      status,
      studentName,
      rollNumber,
      roomNumber,
    });
    setStatus("Resolved");
    const response = fetch('/api/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "resolvebystudent", data: complaintId }),
    }); 
  };

  const handleQuery = () => {
    setQueryDialogOpen(true);
  };

  const submitQuery = () => {
    console.log("Complaint Query Raised:", {
      complaintId,
      category,
      type,
      description,
      status,
      studentName,
      rollNumber,
      roomNumber,
      query: queryText,
    });
    setQueryDialogOpen(false);
    const response = fetch('/api/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "queryraised", data: {complaintId, queryText} }),
    }); 
    setQueryText("");
    setStatus("Not-Resolved");
    
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
      </div>

      {/* Dashed Separator */}
      <div className="border-t-2 border-dashed border-[#192438]"></div>

      {/* Bottom Section */}
      <div className="p-4 flex justify-between items-center bg-[#FFFFFF]">
        <span className="font-mono text-[#192438]">{studentName}</span>
        <span className="font-mono text-[#192438]">{rollNumber}</span>
        <span className="font-mono text-[#192438]">{roomNumber}</span>
      </div>

      {/* Resolve/Unresolve or Query Buttons */}
      <div className="p-4 flex justify-end space-x-2 bg-[#FFFFFF]">
        {status === "Solved-by-Hostel" ? (
          <>
            <Button onClick={handleResolve} className="bg-green-600 text-white hover:bg-green-700">
              Resolved
            </Button>
            <Button onClick={handleQuery} className="bg-yellow-600 text-white hover:bg-yellow-700">
              Not-Resolved | Raise Query
            </Button>
          </>
        ) : null}
      </div>

      {/* Query Dialog */}
      <Dialog open={isQueryDialogOpen} onOpenChange={setQueryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise a Query</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter your query..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => setQueryDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={submitQuery} className="bg-blue-600 text-white hover:bg-blue-700">
              Submit Query
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
