export default function Testimonials() {
  const testimonials = [
    {
      name: "María López",
      comment: "Los pasteles son deliciosos y la atención es excelente.",
    },
    {
      name: "Carlos Ramírez",
      comment: "El pan siempre está fresco. Muy recomendado.",
    },
    {
      name: "Ana Torres",
      comment: "Perfecto para cumpleaños y reuniones familiares.",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#3E2723] mb-10">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFF8E1] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-gray-600 mb-4 italic">"{item.comment}"</p>

              <h3 className="font-semibold text-[#3E2723]">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}