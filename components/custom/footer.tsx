"use client";
import useNavStore from "@/stores/navStore";
function Footer() {
  const date = new Date();
  const isShowing = useNavStore((state) => state.isShowing);
  return (
    isShowing && (
      <footer className="bg-gray-800 text-white py-6">
        <div className="text-center text-gray-400">
          &copy; Yetu {date.getFullYear()}
        </div>
      </footer>
    )
  );
}
export default Footer;
