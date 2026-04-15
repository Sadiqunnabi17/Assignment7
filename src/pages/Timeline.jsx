import { useEffect, useState } from "react";
import { FaPhone, FaCommentDots, FaVideo, FaSearch } from "react-icons/fa";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("timeline")) || [];
    setTimeline(stored);
  }, []);

  const filteredTimeline = timeline
    .filter((entry) => filter === "All" || entry.type === filter)
    .filter((entry) =>
      entry.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-500">Timeline</h1>

        <div className="bg-purple-200 p-0.5 rounded-lg">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-40 h-10 bg-white text-black"
          >
            <option value="All">All</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search by name or interaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-base-100 text-sm focus:outline-none focus:border-green-400 shadow-sm"
        />
      </div>

      {filteredTimeline.length === 0 ? (
        <p className="text-gray-500">
          {search ? `No results for "${search}"` : "No interactions yet."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredTimeline.map((entry) => (
            <div key={entry.id} className="card bg-base-100 shadow-md p-4">
              <div className="flex items-center gap-4">

                {/* Icon */}
                <div className="flex w-15 h-15 items-center text-xl">
                  {entry.type === "Call" && <FaPhone className="text-blue-500" />}
                  {entry.type === "Text" && <FaCommentDots className="text-yellow-500" />}
                  {entry.type === "Video" && <FaVideo className="text-green-500" />}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-semibold text-base leading-tight">
                    {entry.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {entry.date}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Timeline;