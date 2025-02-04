
import { checkExistence, CreateNewUser } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email} = await req.json();

    const userinDatabase = await checkExistence(email);
    if(userinDatabase){
        return NextResponse.json({success: true, message: "User In Database"});
    }
    else{
        let role = "Student";
    //     const email = user.email?.toLowerCase() ?? "";
    //   const emailDomain = email.split("@")[1];
  
    //   // Restrict email domain
    //   if (emailDomain !== "iitbbs.ac.in") {
    //     return false; // Reject sign-in
    //   }

    if (email.includes("secy"))
        role = "Hostel"
    else if (email.includes("biswajit"))
        role = "Gsec"

    try{
        await CreateNewUser(name, email, role);
        
        return NextResponse.json({success: true, message: "Created new user"});
    }catch(error){
        console.error("Failed to add user: ", error);
        return NextResponse.json({success: false, message: "Failed to create new user"});
        
    }


    }

  } catch (error: any) {
    console.error("Failed to confirm booking", error)
    return NextResponse.json({ success: false, message: error.message });
  }
}
