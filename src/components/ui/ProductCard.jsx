export default function ProductCard({ title, price, img }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg">
      <img src={img} className="w-full h-48 object-cover rounded-t-xl" />

      <div className="p-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-amber-600 font-bold">${price}</p>

        <button className="mt-3 w-full bg-gray-200 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}