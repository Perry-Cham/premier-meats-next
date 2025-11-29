"use client"
import Sign_In_Card from '@/app/components/sign_in_card'
import axios from 'axios'
import {useRouter} from "next/navigation"
interface data {
  email: string,
  password:string
}
function SignUp(){
  const router = useRouter()
 async function sendData(data: data){
   const response = await axios.post(`/api/createUser`, data)
   if(response.status === 201)router.push("/admin")
 }
  return(
  <main>
    <div className="w-full min-h-screen flex justify-center items-center">
      <Sign_In_Card type="signup" sendData={sendData}/>
    </div>
  </main>)
}
export default SignUp