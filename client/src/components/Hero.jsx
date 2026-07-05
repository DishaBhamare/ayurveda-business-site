function Hero() {
  return (
    <section  id="home" className="bg-green-50 min-h-[85vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-10 items-center">
<div>
        <div>
          <span className="text-green-700 font-semibold">
            100% Natural Ayurvedic Products
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-4 text-gray-800 leading-tight">
            Wellness Rooted in Nature
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Discover authentic Ayurvedic solutions crafted with natural herbs
            and traditional wisdom for a healthier lifestyle.
          </p>

<button
  onClick={() =>
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="bg-green-700 text-white m-2 px-6 py-3 rounded-lg"
>
  Shop Now
</button>

            <button className="border border-green-700 text-green-700 m-2 px-6 py-3 rounded-lg hover:bg-green-100 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900"
            alt="Ayurvedic Products"
            className="rounded-2xl shadow-xl"
          />
          </div>
          
        </div>
  
      
    </section>
    
  );
}

export default Hero;