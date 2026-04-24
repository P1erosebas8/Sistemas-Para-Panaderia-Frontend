export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-[#FFFBF2] shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 mx-auto">
        <div className="text-2xl font-bold">Artisan Hearth</div>

        <div className="hidden md:flex space-x-8">
          <a href="#">Pastries</a>
          <a className="text-amber-700 font-bold border-b-2 border-amber-700 pb-1" href="#">
            Breads
          </a>
          <a href="#">Cakes</a>
          <a href="#">Our Story</a>
          <a href="#">Contact</a>
        </div>

        <div className="flex space-x-4">
          <span>🛒</span>
          <span>👤</span>
        </div>
      </div>
    </nav>
  );
}