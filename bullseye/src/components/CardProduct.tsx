import formatPrice from "@/app/utils/PriceConverter";
import { Products } from "@/types";
import Image from "next/image";

async function getProductsData() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
}

export default async function CardProduct() {
  const data = await getProductsData();
  return (
    <section>
      <div className="">
        <div className="grid grid-cols-4 h-auto m-[200px]">
          {data.map((product: Products) => (
            <div key={product._id} className="h-[600px]">
              <div className="bg-blue-300 m-5 border border-red-500 rounded-lg overflow-auto">
                <Image
                  className="h-[300px] object-fill"
                  src={product.thumbnail}
                  alt={product.slug}
                  quality={100}
                  width={400}
                  height={300}
                />
                <div className="h-[30px] m-3 mb-4 flex items-center">
                  <p className="font-bold text-lg">{product.name}</p>
                </div>
                <div className="m-3 mb-4">
                  <div className="flex flex-row gap-2">
                    {product.tags.map((tag: string, index: number) => (
                      <div
                        key={index}
                        className="w-[100px] h-[25px] flex justify-center items-center flex-col text-xs bg-gray-200 rounded-full font-semibold overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="m-3">
                  <p className="text-md font-bold">{`RP. ${formatPrice(
                    product.price
                  )}`}</p>
                </div>
                <div className="flex justify-center items-center h-[50px]">
                  <button className="bg-[#333333] h-8 w-[100px] rounded-full flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
