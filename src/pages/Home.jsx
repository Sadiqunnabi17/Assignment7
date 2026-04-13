import { FaUserPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div className="space-y-10">

      {/* Banner */}
      <div className="text-center py-16 bg-base-200 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">
          Keep Your Friendships Alive
        </h1>

        <p className="text-lg mb-6">
          Never lose touch with the people who matter most
        </p>

        <button className="btn btn-primary gap-2">
          <FaUserPlus />
          Add a Friend
        </button>
      </div>

      {/* Summary Cards (we'll improve later) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold">6</h2>
          <p>Total Friends</p>
        </div>

        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500">2</h2>
          <p>Overdue</p>
        </div>

        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-500">2</h2>
          <p>Almost Due</p>
        </div>

        <div className="card bg-base-100 shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-green-500">2</h2>
          <p>On Track</p>
        </div>
      </div>

    </div>
  );
};

export default Home;