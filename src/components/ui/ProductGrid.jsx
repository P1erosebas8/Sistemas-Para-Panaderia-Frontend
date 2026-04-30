import ProductCard from "./ProductCard";

export const panesCatalog = [
  {
    title: "Sourdough",
    price: 8.5,
    img: "https://nickskitchen.com/wp-content/uploads/2025/08/NK_Bread-and-Butter_1-1200x674.jpg",
  },
  {
    title: "Croissant",
    price: 4.25,
    img: "https://lamorapasteleria.com/cdn/shop/files/MiniCroissantdeChocolate_1024x1024.png?v=1748964040",
  },
  {
    title: "Cake",
    price: 32,
    img: "https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice.jpg",
  },
];

export default function ProductGrid() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8">Today's Selection</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {panesCatalog.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}