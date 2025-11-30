import connectDB from "@/lib/db"
import Imagekit from "imagekit"
import {NextRequest,NextResponse} from "next/server"
import { BeefProduct, PorkProduct, ProcessedProduct, ChickenProduct } from "@/models/product-models"
import mongoose from "mongoose"

export async function POST(req: NextRequest){
  try{
  const entry = await req.
 await connectDB()
  const models: Record<string, mongoose.Model<any>> = {
  beef: BeefProduct,
  pork: PorkProduct,
  processed: ProcessedProduct,
  chicken: ChickenProduct,
};
const category = entry.category
await models[entry.category].insertOne(entry)
return NextResponse.json({message:"SUCCESS"},{status:200})
  }catch(err){
  console.error(err)
  return NextResponse.json({message:"INTERNAL_SERVER_ERROR"},{status:500})
  }
}