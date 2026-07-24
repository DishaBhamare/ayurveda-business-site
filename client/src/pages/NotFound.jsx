import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-green-700">404</h1>

      <p className="text-gray-600 mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;