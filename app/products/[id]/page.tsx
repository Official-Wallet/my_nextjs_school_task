import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(Number(id));

  if (!product) notFound();

  return (
    <div>
      <Link href="/" className="text-sm text-gray-600 hover:underline">
        ← Back to products
      </Link>

      <div className="mt-4 grid gap-8 rounded-xl border bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-8xl">
          {product.emoji}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl text-gray-700">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="mt-6 max-w-xs">
            <AddToCartButton />
          </div>
        </div>
      </div>
    </div>
  );
}
