import {NextRequest,NextResponse} from "next/server"
import mongoose from "mongoose"
import connectDB from '@/lib/db'
import { BeefProduct, PorkProduct, ProcessedProduct, ChickenProduct } from "@/models/product-models"
export async function DELETE(req:NextRequest, {params} :{params: Promise<{id:string, category:string}>} ){
  try{
  const {id, category} = await params;
  await connectDB;
  const models: Record<string, mongoose.Model<any>> = {
  beef: BeefProduct,
  pork: PorkProduct,
  processed: ProcessedProduct,
  chicken: ChickenProduct,
};
 await models[category].deleteOne({_id:id})
 return NextResponse.json({message:"SUCCESS"},{status:200})
}catch(err){
  console.error(err)
  return NextResponse.json({message:"INTERNAL_SERVER_ERROR"},{status:500})
}}