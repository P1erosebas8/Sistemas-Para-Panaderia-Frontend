export default function Hero() {
  return (
    <section className="relative h-150 flex items-center">
      <img
        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1600"
        className="absolute w-full h-full object-cover"
      />

      <div className="relative z-10 px-6 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-4">
          Es hora de ese dulce que tanto te provoca
        </h1>
        <p className="mb-6">
          Pídelo y disfruta como te mereces
        </p>

      </div>
    </section>
  );
}