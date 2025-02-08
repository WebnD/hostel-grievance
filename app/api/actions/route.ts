
import { fetchComplaints, QueryRaised, ResolvebyHostel, ResolvebyStudent, UnResolvebyHostel } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();
    

    if(action === "fetchComplaints"){
        const result = await fetchComplaints(data);
        return NextResponse.json(result);
    }
    if(action === "resolvebyhostel"){
        const result = await ResolvebyHostel(data);
        return NextResponse.json(result);
    }
    if(action === "unresolvebyhostel"){
        const result = await UnResolvebyHostel(data);
        return NextResponse.json(result);
    }
    if(action === "resolvebystudent"){
        const result = await ResolvebyStudent(data);
        return NextResponse.json(result);
    }
    if(action === "queryraised"){
        const result = await QueryRaised(data);
        return NextResponse.json(result);
    }

    return NextResponse.json({success: false, message: "No valid action send"});
  } catch (error: any) {
    console.error("Failed to confirm booking", error)
    return NextResponse.json({ success: false, message: error.message });
  }
}
