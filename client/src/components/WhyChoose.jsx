function WhyChoose() {
  return (
    <section id="about" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
          Why Choose Ojasvi?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              100% Natural
            </h3>
            <p className="text-gray-600">
              Made from carefully selected natural ingredients without harmful chemicals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Homemade Products
            </h3>
            <p className="text-gray-600">
              Prepared with traditional Ayurvedic methods and genuine care.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Affordable Wellness
            </h3>
            <p className="text-gray-600">
              Quality Ayurvedic products at prices accessible to everyone.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChoose;