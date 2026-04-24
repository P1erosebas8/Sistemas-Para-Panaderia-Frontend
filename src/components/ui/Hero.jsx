export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa2vJN0KQQBcbcHfEKCZ7AOup0AXXg01Oqm7JsLGtHxQG4Mu-TVOvvy_sN66QZj5_PYsUsoDG6eHORYdRn8_QPO671IEkPLsE-ydnfd8RcV-WJEMUQru-QF8Lww_11k6OIRvMdwMbwI5IyqAQ3pQQrCSJYfLkk0kJ-rsG9Y7g2XtSnYtHmEG86d4PJ8jNqvM5LqVI7bOnC9YgAMjoEx7LSnGHfAwP2VP5T-gtkxD3LSz-bBC66OS1A5H6GUzQHfJ_07q3q8nht8sM"
        className="absolute w-full h-full object-cover"
      />

      <div className="relative z-10 px-6 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-4">
          Waking up the neighborhood with warm hearth magic
        </h1>
        <p className="mb-6">
          Every loaf is a 3-day journey of wild yeast and local grains.
        </p>

      </div>
    </section>
  );
}