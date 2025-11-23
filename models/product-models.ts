import mongoose from "mongoose"
interface Product{
  name: string,
  price: number,
  image: string,
  subcategory: string
}
const schema = new mongoose.Schema<Product>({
  name: String,
  price: Number,
  image: String,
  subcategory: String
})
const BeefProduct = mongoose.models.beef || mongoose.model('beef', schema, "Beef");
const PorkProduct = mongoose.models.pork || mongoose.model('pork', schema, "Pork");
const ProcessedProduct = mongoose.models.processed || mongoose.model('processed', schema, "Processed");
const ChickenProduct = mongoose.models.chicken || mongoose.model('chicken', schema, 'Chicken')

export { BeefProduct, PorkProduct, ProcessedProduct, ChickenProduct }