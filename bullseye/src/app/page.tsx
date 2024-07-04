import Navbar from "@/components/NavbarComponent";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="h-[100vh]">
        <div className="bg-red-200">This is Home</div>
      </main>
    </>
  );
}
