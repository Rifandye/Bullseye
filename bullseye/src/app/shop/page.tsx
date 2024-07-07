import CardProduct from "@/components/CardProduct";
import Navbar from "@/components/NavbarComponent";

export default async function ShopPage() {
  return (
    <>
      <Navbar />
      <main>
        <CardProduct />
      </main>
    </>
  );
}
