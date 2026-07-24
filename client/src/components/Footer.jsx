import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer id="contact" className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Ojasvi 🌿
            </h2>

            <p className="mt-3 text-green-100">
              Bringing the goodness of Ayurveda to your daily life through
              natural and authentic wellness products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-green-100">
              <li>
                <Link to="/" className="hover:text-white">
                 Home
              </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-white">
                  Products
              </Link>
              </li>

              <li>
                <Link to="/wishlist" className="hover:text-white">
                 WishList
              </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-white">
                  Cart
              </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Contact
            </h3>

            <p className="text-green-100">
              📧 support@ojasvi.com
            </p>

            <p className="text-green-100 mt-2">
              📍 Pune, Maharashtra
            </p>
          </div>

        </div>

        <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-200 text-sm">
          © 2026 Ojasvi. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;