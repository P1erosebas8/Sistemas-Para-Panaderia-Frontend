export default function Subscription() {
  return (
    <section className="bg-gray-100 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Never miss a bake day
      </h2>

      <div className="flex justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border rounded"
        />
        <button className="bg-black text-white px-6 py-2 rounded">
          Subscribe
        </button>
      </div>
    </section>
  );
}