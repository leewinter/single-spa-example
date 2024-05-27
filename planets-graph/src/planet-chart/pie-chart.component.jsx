import React from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useWindowResize } from "./use-window-resize";
import SkeletonGraphLoader from "./skeleten-graph-loader";
import { normalisePlanet } from "./chart-helpers";

export default function PlanetChartPie(props) {
  const { planets, graphTitle, dataLabel, dataKey, loading } = props;

  const { dimensions } = useWindowResize();

  if (loading) return <SkeletonGraphLoader chartType="pie" />;

  Chart.register(...registerables);

  const data = planets
    .map(normalisePlanet)
    .filter((p) => p[dataKey])
    .sort((a, b) => a[dataKey] - b[dataKey]);

  return (
    <Pie
      key={`planets-graph-${dataKey}-${dimensions.height}-${dimensions.width}`}
      datasetIdKey="name"
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: graphTitle,
          },
          legend: {
            display: false,
          },
        },
        indexAxis: "y",
        animation: {
          delay: ({ type, mode, dataIndex }) => {
            let delay = 0;
            if (type === "data" && mode === "default") {
              // Adapt the data point index animation delay according to the quantity. This will make different size datasets consistent
              delay = dataIndex * (1300 / data.length);
            }
            return delay;
          },
        },
      }}
      data={{
        labels: data.map((planet) => planet.name),
        datasets: [
          {
            data: data.map((planet) => planet[dataKey]),
            label: dataLabel,
          },
        ],
      }}
    />
  );
}
