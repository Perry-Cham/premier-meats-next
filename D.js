const mongoose = require('mongoose');
const fs = require('fs')
async function connect() {
  await mongoose.connect('mongodb+srv://perry:Perry2009@cluster0.gja8m9y.mongodb.net/Premier-Meats?appName=Cluster0')
  console.log("Mongoose is connected")
  const schema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    subcategory: String
  })

  const beef = mongoose.model('Beef', schema, "Beef")
  const test = await beef.find({})
  console.log(test)
}
connect()
