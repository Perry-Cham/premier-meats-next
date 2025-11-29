import mongoose from "mongoose"
function connectDB(){
  const environment = process.env.ENVIRONMENT
  const status = environment === "development" ? true : false
  if(mongoose.connection.readyState == 1){
  status && console.log("Mongoose has already been connected")
    return mongoose.connection
  }else{
    status && console.log("Mongoose is connected now")
    return mongoose.connect(process.env.MONGO_URI)
  }
}
export default connectDB