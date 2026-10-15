export type Product = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  description: string;
};

export const products: Product[] = [
  { id: 1, name: "Classic T-Shirt", price: 15, emoji: "👕", description: "Soft cotton tee that goes with everything." },
  { id: 2, name: "Sneakers", price: 60, emoji: "👟", description: "Comfortable everyday sneakers." },
  { id: 3, name: "Backpack", price: 40, emoji: "🎒", description: "Roomy backpack for school, work or travel." },
  { id: 4, name: "Headphones", price: 80, emoji: "🎧", description: "Over-ear headphones with great sound." },
  { id: 5, name: "Wrist Watch", price: 120, emoji: "⌚", description: "Simple, stylish watch for any occasion." },
  { id: 6, name: "Sunglasses", price: 25, emoji: "🕶️", description: "UV-protected shades with a classic look." },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}