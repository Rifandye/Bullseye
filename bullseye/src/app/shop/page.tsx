"use client";

import CardProduct from "@/components/CardProduct";
import Navbar from "@/components/NavbarComponent";
import { Products } from "@/types";
import { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProduct] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getProducts = async () => {
      const query = `?search=${searchQuery}`;
      try {
        const response = await fetch(
          `http://localhost:3000/api/products${query}`,
          {
            cache: "force-cache",
          }
        );

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <main>
        <section>
          <div className="flex justify-center items-center my-3">
            <input
              className="w-[400px] h-[40px] p-3 text-sm rounded-full outline-none border border-[#333333]"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 h-auto w-[1500px]">
              {products.map((product) => (
                <CardProduct key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
