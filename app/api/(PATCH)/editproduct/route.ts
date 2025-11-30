import connectDB from "@/lib/db"
import ImageKit from 'imagekit'
import {NextRequest,NextResponse} from "next/server"
import { BeefProduct, PorkProduct, ProcessedProduct, ChickenProduct } from "@/models/product-models"
import mongoose from "mongoose"

export async function PUT(req: NextRequest){
  try{
    const form = await req.formData()
    await connectDB()
  const models: Record<string, mongoose.Model<any>> = {
  beef: BeefProduct,
  pork: PorkProduct,
  processed: ProcessedProduct,
  chicken: ChickenProduct,
};
    const id = String(form.get('id') || '')
    const category = String(form.get('category') || '')
    const name = String(form.get('name') || '')
    const price = Number(String(form.get('price') || '0'))
    const subcategory = String(form.get('subcategory') || '')

    // handle image upload or url
    const imageField = form.get('image')
    const imageFile = form.get('imageFile') as File | null
    let imageUrl = ''
    if (imageFile && imageFile.size && imageFile.name) {
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
      })

      const buffer = Buffer.from(await imageFile.arrayBuffer())
      // delete previous file if present
      try {
        const prev = await models[category].findOne({ _id: id }).lean()
        const prevId = String((prev && (prev as any).imageId) || '')
        if (prevId) {
          try {
            await imagekit.deleteFile(prevId)
          } catch (e) {
            // log and continue
            console.warn('Failed to delete previous ImageKit file', e)
          }
        }
      } catch (e) {
        console.warn('Failed to lookup previous product for image cleanup', e)
      }

      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: imageFile.name,
        folder: `/product images/${category}`,
      })
      imageUrl = String(uploadRes?.url || '')
      var imageFileId = String(uploadRes?.fileId || '')
    } else if (imageField) {
      imageUrl = String(imageField)
    }

    const payload: any = { name, price, subcategory }
    if (imageUrl) payload.image = imageUrl
    if (imageFile && imageFile.name) payload.imageId = imageFileId

    if (!models[category]) {
      return NextResponse.json({ message: 'INVALID_CATEGORY' }, { status: 400 })
    }

    await models[category].updateOne({ _id: id }, { $set: payload })
return NextResponse.json({message:"SUCCESS"},{status:200})
  }catch(err){
  console.error(err)
  return NextResponse.json({message:"INTERNAL_SERVER_ERROR"},{status:500})
  }
  
}