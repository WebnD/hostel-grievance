'use client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function HostelRegistration() {
  const [formData, setFormData] = useState({
    rollNo: '',
    hostelName: '',
    wing: '',
    roomNo: '',
  });
  const {data: session} = useSession();

  const router = useRouter();


  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const confirmSubmit = async () => {
    console.log('Submitted data:', formData);
    // Add your submission logic here
    await fetch('/api/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      }); 
    setIsDialogOpen(false);
    router.push('/');
    setFormData({ rollNo: '', hostelName: '', wing: '', roomNo: '' }); // Reset form
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] mt-16">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#192438] mb-6">{(session)? `Hi, ${session.user.name}` : "Hostel Registration"}</h1>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <Label htmlFor="rollNo" className="text-[#192438]">
              Roll Number
            </Label>
            <Input
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="bg-white border-[#192438] text-[#192438]"
            />
          </div>

          <div>
            <Label htmlFor="hostelName" className="text-[#192438]">
              Hostel Name
            </Label>
            <Select onValueChange={(value) => handleSelectChange('hostelName', value)} required>
              <SelectTrigger className="bg-white border-[#192438] text-[#192438]">
                <SelectValue placeholder="Select hostel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MHR">MHR</SelectItem>
                <SelectItem value="BHR">BHR</SelectItem>
                <SelectItem value="RHR">RHR</SelectItem>
                <SelectItem value="SHR">SHR</SelectItem>
                <SelectItem value="GHR">GHR</SelectItem>
                <SelectItem value="SANGAM">SANGAM Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="wing" className="text-[#192438] text-sm font-medium tracking-wide">
                Select Wing
            </Label>
            <div className="flex gap-3">
                <button
                type="button"
                onClick={() => handleSelectChange('wing', 'A')}
                className={`w-full p-6 rounded-xl transition-all duration-300 border-2
                    ${formData.wing === 'A' 
                    ? 'border-[#0093DD] bg-[#0093DD]/10 shadow-sm' 
                    : 'border-[#e0e0e0] hover:border-[#0093DD]/30 hover:bg-[#f8fcff]'}
                    `}
                >
                <span className={`text-lg font-medium tracking-wide 
                    ${formData.wing === 'A' ? 'text-[#0093DD]' : 'text-[#192438]/80'}`}>
                    A Wing
                </span>
                {formData.wing === 'A' && (
                    <div className="mt-2 h-1 w-6 bg-[#0093DD] rounded-full transition-all" />
                )}
                </button>

                <button
                type="button"
                onClick={() => handleSelectChange('wing', 'B')}
                className={`w-full p-6 rounded-xl transition-all duration-300 border-2
                    ${formData.wing === 'B' 
                    ? 'border-[#0093DD] bg-[#0093DD]/10 shadow-sm' 
                    : 'border-[#e0e0e0] hover:border-[#0093DD]/30 hover:bg-[#f8fcff]'}
                    `}
                >
                <span className={`text-lg font-medium tracking-wide 
                    ${formData.wing === 'B' ? 'text-[#0093DD]' : 'text-[#192438]/80'}`}>
                    B Wing
                </span>
                {formData.wing === 'B' && (
                    <div className="mt-2 h-1 w-6 bg-[#0093DD] rounded-full transition-all" />
                )}
                </button>
            </div>
            </div>

          <div>
            <Label htmlFor="roomNo" className="text-[#192438]">
              Room Number
            </Label>
            <Input
              id="roomNo"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              required
              className="bg-white border-[#192438] text-[#192438]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0093DD] text-white hover:bg-[#FFFFFF] hover:text-[#0093DD] border border-[#0093DD]"
          >
            Submit Registration
          </Button>
        </form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-[#FFFFFF] text-[#192438]">
            <DialogHeader>
              <DialogTitle className="text-[#192438]">Confirm Registration</DialogTitle>
              <DialogDescription className="text-[#192438]">
                Are you sure you want to submit this registration?
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
  );
}