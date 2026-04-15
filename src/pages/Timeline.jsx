import { useEffect, useState } from "react";
import { FaPhone, FaCommentDots, FaVideo } from "react-icons/fa";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("timeline")) || [];
    setTimeline(stored);
  }, []);

  const filteredTimeline =
    filter === "All"
      ? timeline
      : timeline.filter((entry) => entry.type === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6">

      {/* Filter Buttons */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Timeline</h1>

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

      {filteredTimeline.length === 0 ? (
        <p className="text-gray-500">No interactions yet.</p>
      ) : (
        <div className="space-y-4">
          {filteredTimeline.map((entry) => (
            <div
              key={entry.id}
              className="card bg-base-100 shadow-md p-4"
            >
              <div className="flex items-start gap-4">

                {/* Icon */}
                <div className="flex w-15 h-15 item-center text-xl mt-1">
                  {entry.type === "Call" && <FaPhone className="text-blue-500"/>}
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