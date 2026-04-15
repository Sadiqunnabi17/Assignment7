import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
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

  const COLORS = ["#6366f1", "#f59e0b", "#22c55e"];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Friendship Analytics
      </h1>
      <p className="text-xl text-gray-500 mt-1">
        By interaction types
      </p>

      {data.every((d) => d.value === 0) ? (
        <p className="text-gray-500">
          No interaction data available.
        </p>
      ) : (
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
              <Legend iconType="circle" />

            </PieChart>
          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
};

export default Stats;