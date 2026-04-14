import { useEffect, useState } from "react";
import { FaPhone, FaCommentDots, FaVideo } from "react-icons/fa";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("timeline")) || [];
    setTimeline(stored);
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Timeline</h1>

      {timeline.length === 0 ? (
        <p className="text-gray-500">No interactions yet.</p>
      ) : (
        <div className="space-y-4">
          {timeline.map((entry) => (
            <div
              key={entry.id}
              className="card bg-base-100 shadow-md p-4 flex items-center gap-4"
            >

              {/* Icon */}
              <div className="text-xl">
                {entry.type === "Call" && <FaPhone />}
                {entry.type === "Text" && <FaCommentDots />}
                {entry.type === "Video" && <FaVideo />}
              </div>

              {/* Content */}
              <div>
                <p className="font-semibold">{entry.title}</p>
                <p className="text-sm text-gray-500">{entry.date}</p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Timeline;