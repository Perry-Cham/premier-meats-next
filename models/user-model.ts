import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  authorization:Number
})
/* authorization
level 0: cannot update, delete prices or add newcproducts,new products
level 1: can update prices, add new products and delete products but cannot increase user authorization of other uerrs
level 2: can do everything in level 1 plus they have the ability to delete and imcrease the privelages of other users
*/

export default mongoose.models.User || mongoose.model("User", schema)