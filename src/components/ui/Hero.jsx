export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
      <img
        src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/649572767_1542518754540932_3303760816273512945_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFJs-LLuCtaqZnZjZthlLFbgjI5R3Ma8gSCMjlHcxryBLJR3fxyd7oslEQZHdbF1ARJDxxcuh4ij59beUcbk84k&_nc_ohc=GdR6C-1zOAkQ7kNvwHWLolN&_nc_oc=AdqMTlUj79VR6F6k5_vXzywTBYie9xtukpgojjW8wB-VPmje7ct1nhvwnbJsjTxqNiw&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=_CBP4FcPZH9xrrnwpX6vFQ&_nc_ss=7b2a8&oh=00_Af0UISPxtcUE4toywy1rzevxHOEUtE3eqd4gEqt_YfaEVg&oe=69F713CA"
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