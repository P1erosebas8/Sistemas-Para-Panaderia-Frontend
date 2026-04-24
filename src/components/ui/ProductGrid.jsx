import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const products = [
    {
      title: "Sourdough",
      price: 8.5,
      img: "https://via.placeholder.com/300",
    },
    {
      title: "Croissant",
      price: 4.25,
      img: "https://via.placeholder.com/300",
    },
    {
      title: "Cake",
      price: 32,
      img: "https://via.placeholder.com/300",
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8">Today's Selection</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}