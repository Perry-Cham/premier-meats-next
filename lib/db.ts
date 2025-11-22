import mongoose,{Connection} from "mongoose"
function connectDB(): Promise<Connection>{
  if(mongoose.connection.readyState == 1){
    console.log("Mongoose has already been connected")
    return mongoose.connection
  }else{
    return mongoose.connect(process.env.MONGO_URI)
    console.log("mongoose is connected")
  }
}
export default connectDB