import Navbar from "@/components/NavbarComponent";

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
