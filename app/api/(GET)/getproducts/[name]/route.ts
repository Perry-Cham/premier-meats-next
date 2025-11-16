import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Define product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  subcategory: String,
});

// Get or create models for each collection
const BeefProduct = mongoose.models.beef || mongoose.model('beef', productSchema);
const PorkProduct = mongoose.models.pork || mongoose.model('pork', productSchema);
const ProcessedProduct = mongoose.models.processed || mongoose.model('processed', productSchema);
const ChickenProduct = mongoose.models.chicken || mongoose.model('chicken', productSchema);

// Map collection names to models
const collectionModels: Record<string, mongoose.Model<any>> = {
  beef: BeefProduct,
  pork: PorkProduct,
  processed: ProcessedProduct,
  chicken: ChickenProduct,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || '');
    }

    const productType = params.name.toLowerCase();

    // Validate that the product type is one of the allowed collections
    if (!collectionModels[productType]) {
      return NextResponse.json(
        { error: 'Invalid product type' },
        { status: 400 }
      );
    }

    // Fetch all products from the specified collection
    const products = await collectionModels[productType].find({});

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}