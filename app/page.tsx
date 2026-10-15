import Link from "next/link";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <Link href={`/products/${product.id}`}>
              <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 text-6xl">
                {product.emoji}
              </div>
              <h2 className="mt-4 font-semibold hover:underline">{product.name}</h2>
            </Link>
            <p className="mt-1 text-gray-600">${product.price}</p>
            <div className="mt-3">
              <AddToCartButton/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
