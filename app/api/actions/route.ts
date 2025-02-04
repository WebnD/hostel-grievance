
import { fetchComplaints } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();
    

    if(action === "fetchComplaints"){
        const result = await fetchComplaints(data);
        return NextResponse.json(result);
    }

    return NextResponse.json({success: false, message: "No valid action send"});
  } catch (error: any) {
    console.error("Failed to confirm booking", error)
    return NextResponse.json({ success: false, message: error.message });
  }
}
