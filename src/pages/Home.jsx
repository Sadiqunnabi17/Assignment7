import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => ({
    padding: "2px 10px",
    borderRadius: "9999px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#ffffff",
    backgroundColor:
        status === "overdue"
            ? "#ef4444"
            : status === "almost due"
            ? "#eab308"
            : "#22c55e",
});

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

    if (loading) {
        return (
            <div className="text-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const total = friends.length;
    const overdue = friends.filter((f) => f.status === "overdue").length;
    const almostDue = friends.filter((f) => f.status === "almost due").length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;

    return (
        <div className="space-y-10">

            {/* Banner */}
            <div className="text-center py-16 bg-base-100 rounded-xl">

                {/* Decorative circles */}
                
                <div className="relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-6">

                    
                    <h1 className="text-4xl font-bold text-gray-600 mb-4 leading-tight">
                        Friends to Keep Close in Your Life
                    </h1>

                    <p className="text-gray-500 text-base mb-8 leading-relaxed">
                        Your personal shelf connections. Browse, tend, and nurture the
                        relationships that matter most.
                    </p>

                    <button className="btn gap-2 bg-green-500 hover:bg-green-400 text-white border-none w-44 shadow-lg">
                        <FaUserPlus />
                        Add a Friend
                    </button>

                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold">{total}</h2>
                    <p className="text-sm text-gray-500 mt-1">Total Friends</p>
                </div>
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold text-red-500">{overdue}</h2>
                    <p className="text-sm text-gray-500 mt-1">Overdue</p>
                </div>
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold text-yellow-500">{almostDue}</h2>
                    <p className="text-sm text-gray-500 mt-1">Almost Due</p>
                </div>
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold text-green-500">{onTrack}</h2>
                    <p className="text-sm text-gray-500 mt-1">On Track</p>
                </div>
            </div>

            {/* Friends Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {friends.map((friend) => (
                    <Link
                        to={`/friend/${friend.id}`}
                        key={friend.id}
                        className="card bg-base-100 shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer"
                    >
                        {/* Circular Avatar */}
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-base-300 mb-3 flex-shrink-0">
                            <img
                                src={friend.picture}
                                alt={friend.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name */}
                        <h2 className="text-sm font-bold leading-tight mb-1">
                            {friend.name}
                        </h2>

                        {/* Days Since Contact */}
                        <p className="text-xs text-gray-400 mb-2">
                            {friend.days_since_contact}d ago
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                            {friend.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Status */}
                        <span style={getStatusStyle(friend.status)}>
                            {friend.status}
                        </span>

                    </Link>
                ))}
            </div>

        </div>
    );
};

export default Home;