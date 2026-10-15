"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getProduct } from "@/lib/products";

export default function CartPage() {
  const { items, removeFromCart, changeQuantity } = useCart();

  const cartLines = items.flatMap((item) => {
    const product = getProduct(item.id);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  const total = cartLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  if (cartLines.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/" className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>

      <div className="divide-y rounded-xl border bg-white shadow-sm">
        {cartLines.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-3xl">
              {product.emoji}
            </div>

            <div className="flex-1">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQuantity(product.id, -1)}
                className="h-8 w-8 rounded border hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => changeQuantity(product.id, 1)}
                className="h-8 w-8 rounded border hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <p className="w-16 text-right font-semibold">${product.price * quantity}</p>

            <button
              onClick={() => removeFromCart(product.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-lg font-bold">Total: ${total}</p>
        <button className="rounded-lg bg-black px-6 py-2 text-white hover:bg-gray-800">Checkout</button>
      </div>
    </div>
  );
}
