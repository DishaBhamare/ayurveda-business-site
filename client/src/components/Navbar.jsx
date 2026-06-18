function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      <div>
         <h1 className="text-3xl font-extrabold text-green-800">
          Ojasvi
         </h1>
        {/* <p className="text-xs text-gray-600">
          Rooted in Ayurveda
        </p> */}
    </div>

        <ul className="hidden md:flex gap-8 text-gray-700">
          <li className="cursor-pointer hover:text-green-700">Home</li>
          <li className="cursor-pointer hover:text-green-700">Products</li>
          <li className="cursor-pointer hover:text-green-700">About</li>
          <li className="cursor-pointer hover:text-green-700">Contact</li>
        </ul>

        <button className="bg-green-700 text-white px-5 py-2 rounded-lg">
          Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;