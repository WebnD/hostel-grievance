"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CreateComplaint } from "@/lib/actions"

export default function Complain() {
  const router = useRouter()
  const [formData, setFormData] = useState<Complaint>({
    category: "",
    type: "",
    description: "",
    image: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    //   setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(true)
  }

  const confirmSubmit = async () => {
    // Here you would typically send this data to your backend
    console.log(formData);
    await fetch('/api/create-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      }); 
    setIsDialogOpen(false)
    // Redirect to my-complaints page
    router.push("/track")
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] mt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#192438] mb-6">Submit a Complaint</h1>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <Label htmlFor="category" className="text-[#192438]">
              Complaint Category
            </Label>
            <Select onValueChange={(value) => handleSelectChange("category", value)} required>
              <SelectTrigger className="bg-white border-[#192438] text-[#192438]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="type" className="text-[#192438]">
              Complaint Type
            </Label>
            <Select onValueChange={(value) => handleSelectChange("type", value)} required>
              <SelectTrigger className="bg-white border-[#192438] text-[#192438]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-[#192438]">
              Explain the complaint
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="h-32 bg-white border-[#192438] text-[#192438]"
            />
          </div>
          <div>
            <Label htmlFor="image" className="text-[#192438]">
              Upload supporting image (optional)
            </Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="bg-white border-[#192438] text-[#192438]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#0093DD] text-white hover:bg-[#FFFFFF] hover:text-[#0093DD] border border-[#0093DD]"
          >
            Submit Complaint
          </Button>
        </form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#FFFFFF] text-[#192438]">
            <DialogHeader>
              <DialogTitle className="text-[#192438]">Confirm Submission</DialogTitle>
              <DialogDescription className="text-[#192438]">
                Are you sure you want to submit this complaint?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="text-[#192438] border-[#192438]"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmSubmit}
                className="bg-[#0093DD] text-white hover:bg-[#FFFFFF] hover:text-[#0093DD] border border-[#0093DD]"
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

