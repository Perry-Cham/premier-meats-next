import {NextRequest,NextResponse} from "next/server"

// disable automatic response caching for this handler
export const dynamic = 'force-dynamic'
import mongoose from "mongoose"
import connectDB from '@/lib/db'
import ImageKit from 'imagekit'
import { BeefProduct, PorkProduct, ProcessedProduct, ChickenProduct } from "@/models/product-models"
export async function DELETE(req:NextRequest, {params} :{params: Promise<{id:string, category:string}>} ){
  try{
  const {id, category} = await params;
  await connectDB()
  const models: Record<string, mongoose.Model<any>> = {
  beef: BeefProduct,
  pork: PorkProduct,
  processed: ProcessedProduct,
  chicken: ChickenProduct,
};
    // lookup product to obtain imageId for cleanup
    const doc = await models[category].findOne({ _id: id }).lean()
    if (doc && (doc as any).imageId) {
      try {
        const imagekit = new ImageKit({
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
        })
        await imagekit.deleteFile(String((doc as any).imageId))
      } catch (e) {
        console.warn('ImageKit deletion failed for', (doc as any).imageId, e)
      }
    }

    await models[category].deleteOne({_id:id})
 return NextResponse.json({message:"SUCCESS"},{status:200})
}catch(err){
  console.error(err)
  return NextResponse.json({message:"INTERNAL_SERVER_ERROR"},{status:500})
}}