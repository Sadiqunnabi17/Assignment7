import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHistory, FaPhone, FaCommentDots, FaVideo } from "react-icons/fa";

const getStatusStyle = (status) => ({
  padding: "2px 12px",
  borderRadius: "9999px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#ffffff",
  backgroundColor:
    status === "overdue"
      ? "#ef4444"
      : status === "almost due"
      ? "#eab308"
      : "#22c55e",
});

const FriendDetails = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const foundFriend = data.find((f) => f.id === parseInt(id));
        setFriend(foundFriend);
        setLoading(false);
      });
  }, [id]);

  const handleCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      friendName: friend.name,
      type: type,
      date: new Date().toLocaleDateString(),
      title: `${type} with ${friend.name}`,
    };

    const existing = JSON.parse(localStorage.getItem("timeline")) || [];
    const updated = [newEntry, ...existing];
    localStorage.setItem("timeline", JSON.stringify(updated));

    setToast(`${type} logged successfully!`);
    setTimeout(() => setToast(""), 2000);
  };

  const timeline = JSON.parse(localStorage.getItem("timeline")) || [];

  const friendTimeline = timeline
    .filter((entry) => entry.friendName === friend?.name)
    .sort((a, b) => b.id - a.id);

  const displayedInteractions = showAll
    ? friendTimeline
    : friendTimeline.slice(0, 3);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!friend) {
    return <p className="text-center mt-10">Friend not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT COLUMN */}
      <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center">

        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-base-300 mb-4">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">{friend.name}</h2>

        {/* Status */}
        <span style={getStatusStyle(friend.status)}>
          {friend.status}
        </span>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {friend.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-500 text-sm">{friend.bio}</p>

        {/* Email */}
        <p className="mt-2 text-sm font-medium">{friend.email}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-6 w-full">
          <button className="btn btn-outline">⏰ Snooze 2 Weeks</button>
          <button className="btn btn-outline">📦 Archive</button>
          <button className="btn btn-error">🗑️ Delete</button>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-2 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="card bg-base-100 shadow-md p-4 text-center">
            <h3 className="text-xl font-bold">{friend.days_since_contact}</h3>
            <p className="text-sm text-gray-500">Days Since Contact</p>
          </div>

          <div className="card bg-base-100 shadow-md p-4 text-center">
            <h3 className="text-xl font-bold">{friend.goal}</h3>
            <p className="text-sm text-gray-500">Goal (days)</p>
          </div>

          <div className="card bg-base-100 shadow-md p-4 text-center">
            <h3 className="text-xl font-bold">{friend.next_due_date}</h3>
            <p className="text-sm text-gray-500">Next Due Date</p>
          </div>

        </div>

        {/* Relationship Goal */}
        <div className="card bg-base-100 shadow-md p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Relationship Goal</h3>
            <button className="btn btn-sm w-10 h-10 bg-green-600 text-white hover:bg-green-700 border-none">
              Edit
            </button>
          </div>
          <p className="text-gray-500">
            Stay in touch every {friend.goal} days
          </p>
        </div>

        {/* Quick Check-In */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Check-In</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleCheckIn("Call")}
              className="btn btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <FaPhone className="text-blue-500" />
              Call
            </button>
            <button
              onClick={() => handleCheckIn("Text")}
              className="btn btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <FaCommentDots className="text-yellow-500" />
              Text
            </button>
            <button
              onClick={() => handleCheckIn("Video")}
              className="btn btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <FaVideo className="text-green-500" />
              Video
            </button>
          </div>
        </div>

        {/* Recent Interactions */}
        <div className="card bg-base-100 shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Recent Interactions
            </h3>
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:opacity-60"
            >
              <FaHistory className="text-xs" />
              {showAll ? "Show Less" : "Full History"}
            </button>
          </div>

          {displayedInteractions.length === 0 ? (
            <p className="text-gray-500 text-sm">No interactions yet</p>
          ) : (
            <div className="space-y-3">
              {displayedInteractions.map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center text-sm gap-4"
                >
                  <span className="truncate">{entry.title}</span>
                  <span className="text-gray-400 whitespace-nowrap">
                    {entry.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default FriendDetails;