import Sign_In_Card from "@/app/components/sign_in_card"
interface credentials{
  username:String,
  password: String
}
function Login(){
 async function sendData(data : credentials){
    const response = await axios.post(`${process.env.NODE_URL}`)
  }
  return(
  <main>
    <div className="w-full min-h-screen flex justify-center items-center">
      <Sign_In_Card sendData={sendData}/>
    </div>
  </main>)
}
export default Login