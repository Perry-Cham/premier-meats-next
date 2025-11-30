import connectDB from "@/lib/db"
import ImageKit from "imagekit"

// disable automatic response caching for this handler
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from "next/server"
import { BeefProduct, PorkProduct, ProcessedProduct, ChickenProduct } from "@/models/product-models"
import mongoose from "mongoose"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    await connectDB()

    const models: Record<string, mongoose.Model<any>> = {
      beef: BeefProduct,
      pork: PorkProduct,
      processed: ProcessedProduct,
      chicken: ChickenProduct,
    }

    const category = String(form.get("category") || "")
    const name = String(form.get("name") || "")
    const priceRaw = String(form.get("price") || "0")
    const subcategory = String(form.get("subcategory") || "")

    // Image: either client provided URL or an imageFile in the form data
    const imageField = form.get("image")
    const imageFile = form.get("imageFile") as File | null

    let imageUrl = ""

    if (imageFile && imageFile.size && imageFile.name) {
      // Upload to ImageKit
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
      })

      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const folder = `/product images/${category}`
      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: imageFile.name,
        folder,
      })

      imageUrl = String(uploadRes?.url || "")
      // store ImageKit file id for later removal
      var imageFileId = String(uploadRes?.fileId || "")
    } else if (imageField) {
      imageUrl = String(imageField)
    }

    const entry: any = {
      name,
      price: Number(priceRaw || 0),
      subcategory,
      image: imageUrl,
    }
    if (imageFile && imageFile.name) entry.imageId = imageFileId

    if (!models[category]) {
      return NextResponse.json({ message: "INVALID_CATEGORY" }, { status: 400 })
    }

    await models[category].create(entry)

    return NextResponse.json({ message: "SUCCESS" }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "INTERNAL_SERVER_ERROR" }, { status: 500 })
  }
}