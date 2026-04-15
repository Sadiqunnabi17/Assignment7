import { useEffect, useState } from "react";
import { FaPhone, FaCommentDots, FaVideo } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeline = JSON.parse(localStorage.getItem("timeline")) || [];

    const counts = {
      Call: 0,
      Text: 0,
      Video: 0,
    };

    timeline.forEach((entry) => {
      if (counts[entry.type] !== undefined) {
        counts[entry.type]++;
      }
    });

    const chartData = [
      { name: "Call", value: counts.Call },
      { name: "Text", value: counts.Text },
      { name: "Video", value: counts.Video },
    ];

    setData(chartData);
  }, []);

  // ✅ Match your app colors
  const COLORS = ["#3b82f6", "#eab308", "#22c55e"];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-blue-500">
          Friendship Analytics
        </h1>
        <p className="text-xl text-gray-500 mt-1">
          By interaction types
        </p>
      </div>

      {/* Empty State */}
      {data.every((d) => d.value === 0) ? (
        <p className="text-gray-500">
          No interaction data available.
        </p>
      ) : (
        <>
          {/* Chart */}
          <div className="w-full h-80 flex justify-center items-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend with Icons */}
          <div className="flex justify-center gap-6 mt-4 flex-wrap">

            {/* Call */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <FaPhone className="text-blue-500" />
              <span className="text-gray-600 text-sm">Call</span>
            </div>

            {/* Text */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <FaCommentDots className="text-yellow-500" />
              <span className="text-gray-600 text-sm">Text</span>
            </div>

            {/* Video */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <FaVideo className="text-green-500" />
              <span className="text-gray-600 text-sm">Video</span>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default Stats;