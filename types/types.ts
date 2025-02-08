interface Complaint{
    category: string;
    type: string;
    description: string;
    image?: string;
}

interface UserInfo{
    rollNo: string;
    hostelName: string;
    wing: string;
    roomNo: string;
}

interface fetchedComplaint{
    $createdAt: string;
    $id: string;
    category: string;
    explaination: string;
    image: string;
    requesterId: string;
    status: string;
    type: string;
    studentName:string;
    rollNumber: string;
    roomNumber: string;
    query?: string;
}
$collectionId
: 
"679bb2b1003c2a86be14"
$createdAt
: 
"2025-02-03T23:23:38.895+00:00"
$databaseId
: 
"679bb292002c42b80710"
$id
: 
"67a14ffada4650f0530c"
$permissions
: 
[]
$updatedAt
: 
"2025-02-03T23:48:34.410+00:00"
category
: 
"security"
explaination
: 
"aaawww"
image
: 
""
requesterId
: 
"67a14f7f000eb07d3f90"
status
: 
"pending"
type
: 
"other"