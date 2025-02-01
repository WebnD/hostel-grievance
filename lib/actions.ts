import { ID, Query } from "node-appwrite";
import { database } from "./appwrite.config";

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
  

  export async function CreateNewUser(name:string, email: string, image: string, role: string) {
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
          image
        }
      )
    }catch(error){
      console.error("Error create new user :", error);
      throw new Error ("Error create new user : ");
    }
  }


  export async function CreateComplaint(formdata: Complaint){
    await database.createDocument(
        process.env.DATABASE_ID!,
    process.env.COMPLAINTS_COLLECTION_ID!,
    "unique()",
    {
        requesterId: "1",
        category: formdata.category,
        type: formdata.type,
        image: formdata.image,
        explaination: formdata.description
    }

    )
  }