"use client";
import useNavStore from "@/stores/navStore";
import Sign_In_Card from "@/app/components/sign_in_card";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
interface data {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();
  async function sendData(data: data) {
    const { email, password } = data;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) {
      setIsShowing(true);
      router.push("/admin");
    } else console.error(res.error);
  }
  const setIsShowing = useNavStore((state) => state.setIsShowing);
  setIsShowing(false);
  return (
    <main>
      <div className="w-full min-h-screen flex justify-center items-center">
        <Sign_In_Card type="login" sendData={sendData} />
      </div>
    </main>
  );
}
export default Login;
