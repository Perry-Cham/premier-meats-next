import {NextRequest,NextResponse} from "next/server"
import connectDB from "@/lib/db"
import userModel from "@/models/user-model"
import {hash} from "bcrypt"
export async function POST(req: NextRequest){
  try{
      const {name, email, password} = await req.json()
      console.log(name, email, password)
  const hashedPassword = await hash(password, 10)
  await connectDB()
  const exists = await  userModel.findOne({email:email})
  if(exists)return NextResponse.json({message:"USER_ALREADY_EXISTS"},{status:400})
  const user = new userModel({
    name,
    email,
    password:hashedPassword
  })
  await user.save 
  return NextResponse.json({message:"USER_CREATED_SUCCESSFULLY"},{status:201})
  }catch(err){
    console.error(err)
    return NextResponse.json({message:"INTERNAL_SERVER_ERROR"},{status:500})
  }
}