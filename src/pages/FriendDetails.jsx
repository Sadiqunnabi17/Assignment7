import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhone, FaCommentDots, FaVideo } from "react-icons/fa";

const FriendDetails = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

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

    // Toast
    setToast(`${type} logged successfully!`);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  // loading check
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT COLUMN */}
      <div className="card bg-base-100 shadow-md p-6 flex flex-col items-center text-center">

        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-base-300 mb-4">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold">{friend.name}</h2>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold mt-2 ${friend.status === "overdue"
            ? "bg-red-100 text-red-600"
            : friend.status === "almost due"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
            }`}
        >
          {friend.status}
        </span>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {friend.tags.map((tag, index) => (
            <span key={index} className="badge badge-outline">
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-500 text-sm">{friend.bio}</p>

        {/* Email */}
        <p className="mt-2 text-sm font-medium">{friend.email}</p>

        {/* Action Buttons (no functionality required) */}
        <div className="flex flex-col gap-2 mt-6 w-full">
          <button className="btn btn-outline">⏰ Snooze 2 Weeks</button>
          <button className="btn btn-outline">📦 Archive</button>
          <button className="btn btn-error">🗑️ Delete</button>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-2 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="card bg-base-100 shadow-md p-4 text-center">
            <h3 className="text-xl font-bold">
              {friend.days_since_contact}
            </h3>
            <p className="text-sm text-gray-500">Days Since Contact</p>
          </div>

          <div className="card bg-base-100 shadow-md p-4 text-center">
            <h3 className="text-xl font-bold">{friend.goal}</h3>
            <p className="text-sm text-gray-500">Goal (days)</p>
          </div>

          <div className="card bg-base-100 shadow-md p-4 text-center">
            <h3 className="text-xl font-bold">
              {friend.next_due_date}
            </h3>
            <p className="text-sm text-gray-500">Next Due Date</p>
          </div>

        </div>

        {/* Relationship Goal */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-bold mb-2">
            Relationship Goal
          </h3>
          <p className="text-gray-500 mb-4">
            Stay in touch every {friend.goal} days
          </p>
          <button className="btn btn-primary btn-sm">Edit</button>
        </div>

        {/* Quick Check-In */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">
            Quick Check-In
          </h3>

          <div className="flex gap-4">

            <button
              onClick={() => handleCheckIn("Call")}
              className="btn btn-outline flex-1 gap-2"
            >
              📞 Call
            </button>

            <button
              onClick={() => handleCheckIn("Text")}
              className="btn btn-outline flex-1 gap-2"
            >
              💬 Text
            </button>

            <button
              onClick={() => handleCheckIn("Video")}
              className="btn btn-outline flex-1 gap-2"
            >
              🎥 Video
            </button>

          </div>

        </div>

      </div>
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