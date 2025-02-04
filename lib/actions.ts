import { ID, Query } from "node-appwrite";
import { database } from "./appwrite.config";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function checkExistence(email: string){
    const response = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.USERS_COLLECTION_ID!, 
      [Query.equal("email", email)]
    );
  
    if (response.documents.length>0)
      return true;
    else
    return false;
  }

  export async function getUserId(email:string) {
    const response = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.USERS_COLLECTION_ID!, 
      [Query.equal("email", email)]
    );
  
    return response.documents[0].$id;
  }
  export async function getUser(){
    const session = await getServerSession(authOptions);
    const id = await getUserId(session?.user.email!);
    const user = {
      name: session?.user.name,
      email: session?.user.email,
      id:id
    }
    return user;
  
};


  export async function CreateNewUser(name:string, email: string, role: string) {
    const id = ID.unique();
    try{
      await database.createDocument(
        process.env.DATABASE_ID!,
        process.env.USERS_COLLECTION_ID!,
        id,
        {
          id:id,
          name,
          email,
          role,
        }
      )
    }catch(error){
      console.error("Error create new user :", error);
      throw new Error ("Error create new user : ");
    }
  }
  

  export async function UpdateUser(formData: UserInfo){

    const rollNumber = formData.rollNo;
    const hostel = formData.hostelName;
    const wing = formData.wing;
    const room = formData.roomNo;
    const email = rollNumber.toLowerCase() + "@iitbbs.ac.in"
    const user = await getUserId(email);
    try{
      await database.updateDocument(
        process.env.DATABASE_ID!,
        process.env.USERS_COLLECTION_ID!,
        user,
        {
          rollNumber,
          hostel,
          wing,
          room
        }
      )
    }catch(error){
      console.error("Failed to update the user info: ");
      throw new Error("Failed to update the user info");
    }
  }


  export async function CreateComplaint(formdata: Complaint){

    const user = await getUser();
    if(!user){
      redirect('/');
    }


    const response = await database.getDocument(
      process.env.DATABASE_ID!,
      process.env.USERS_COLLECTION_ID!,
      user.id
    )

    const hostel = response.hostel;


    await database.createDocument(
        process.env.DATABASE_ID!,
    process.env.COMPLAINTS_COLLECTION_ID!,
    "unique()",
    {
        requesterId: user.id,
        category: formdata.category,
        type: formdata.type,
        image: formdata.image,
        explaination: formdata.description,
        hostel: hostel
    }

    )
  }


  export async function fetchComplaints(email: string){
    try{
      const user = await getUser();

      if (!user) {
        return redirect("/");
      }


      const response = await database.listDocuments(
        process.env.DATABASE_ID!,
        process.env.COMPLAINTS_COLLECTION_ID!,
        [Query.equal('requesterId', [user.id])]
      );

      return response.documents;
    }catch(error){
      console.error("Failed to fetch complaints : ", error);
      throw new Error ("Failed to fetch complaints")
    }
  }