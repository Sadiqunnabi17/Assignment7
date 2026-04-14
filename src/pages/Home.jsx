import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const Home = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/friends.json")
            .then((res) => res.json())
            .then((data) => {
                setFriends(data);
                setLoading(false);
            });
    }, []);

    // Loading state (Required for marks)
    if (loading) {
        return (
            <div className="text-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Dynamic calculations
    const total = friends.length;
    const overdue = friends.filter((f) => f.status === "overdue").length;
    const almostDue = friends.filter((f) => f.status === "almost due").length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;

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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-2xl font-bold">{total}</h2>
                    <p>Total Friends</p>
                </div>

                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-2xl font-bold text-red-500">{overdue}</h2>
                    <p>Overdue</p>
                </div>

                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-2xl font-bold text-yellow-500">{almostDue}</h2>
                    <p>Almost Due</p>
                </div>

                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-2xl font-bold text-green-500">{onTrack}</h2>
                    <p>On Track</p>
                </div>

            </div>
            {/* Friends Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {friends.map((friend) => (
                    <div key={friend.id} className="card bg-base-100 shadow-md p-4">

                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="rounded-xl mb-3"
                        />

                        <h2 className="text-lg font-bold">{friend.name}</h2>

                        <p className="text-sm">
                            Days Since Contact: {friend.days_since_contact}
                        </p>

                        <div className="flex flex-wrap gap-2 my-2">
                            {friend.tags.map((tag, index) => (
                                <span key={index} className="badge badge-outline">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p
                            className={`mt-2 font-semibold ${friend.status === "overdue"
                                    ? "text-red-500"
                                    : friend.status === "almost due"
                                        ? "text-yellow-500"
                                        : "text-green-500"
                                }`}
                        >
                            {friend.status}
                        </p>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;