import { useEffect, useState } from "react";
import { FaUserPlus, FaSync } from "react-icons/fa";
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
    const [refreshing, setRefreshing] = useState(false);

    const fetchFriends = () => {
        return fetch("/friends.json")
            .then((res) => res.json())
            .then((data) => {
                setFriends(data);
            });
    };

    useEffect(() => {
        fetchFriends().then(() => setLoading(false));
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchFriends().then(() => {
            setTimeout(() => setRefreshing(false), 800);
        });
    };

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
                <div className="relative z-10 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-6">

                    <h1 className="text-4xl font-bold text-blue-500 mb-4 leading-tight">
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
                    <h2 className="text-3xl font-bold text-blue-500">{total}</h2>
                    <p className="text-sm text-blue-500 mt-1">Total Friends</p>
                </div>
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold text-red-500">{overdue}</h2>
                    <p className="text-sm text-red-500 mt-1">Overdue</p>
                </div>
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold text-yellow-500">{almostDue}</h2>
                    <p className="text-sm text-yellow-500 mt-1">Almost Due</p>
                </div>
                <div className="card bg-base-100 shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold text-green-500">{onTrack}</h2>
                    <p className="text-sm text-green-500 mt-1">On Track</p>
                </div>
            </div>

            {/* Friends Grid Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Friends</h2>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 btn btn-sm btn-outline border-green-500 text-green-600 hover:bg-green-500 hover:text-white hover:border-none"
                >
                    <FaSync className={refreshing ? { animation: "spin 2s linear infinite" } : {}} />
                    {refreshing ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {/* Refreshing Overlay */}
            {refreshing ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <span className="loading loading-spinner loading-lg text-green-500"></span>
                    <p className="text-gray-400 text-sm">Refreshing your friends list...</p>
                </div>
            ) : (
                /* Friends Grid */
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
            )}

        </div>
    );
};

export default Home;