"use client";
import { Suspense } from "react";
import useNavStore from "@/stores/navStore";
function Footer() {
  const isShowing = useNavStore((state) => state.isShowing);
  return (
    isShowing && (
      <footer className="bg-brand-dark text-white py-6">
        <div className="text-center text-brand-muted">
          &copy; Yetu 
        </div>
      </footer>
    )
  );
}
export default Footer;
