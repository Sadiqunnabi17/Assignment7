import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">

      <h1 className="text-4xl font-bold text-red-500">404</h1>

      <p className="mt-4 text-2xl font-bold text-blue-600">
        Page not found !!
      </p>

      <p className="mt-4 text-gray-500">
        Looks like this page doesn't exist. Tap the button below to go back home.
      </p>

      <Link to="/" className="btn bg-green-500 hover:bg-green-400 text-white border-none mt-6">
        Go to Home
      </Link>

    </div>
  );
};

export default NotFound;