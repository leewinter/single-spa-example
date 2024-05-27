import { useWindowResize } from "./use-window-resize";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import SkeletonGraphLoader from "./skeleten-graph-loader";
import { normalisePlanet } from "./chart-helpers";

export default function PlanetChartBar(props) {
  const { planets, graphTitle, dataLabel, dataKey, loading } = props;

  const { dimensions } = useWindowResize();

  if (loading) return <SkeletonGraphLoader chartType="bar" />;

  Chart.register(...registerables);

  const data = planets
    .map(normalisePlanet)
    .filter((p) => p[dataKey])
    .sort((a, b) => a[dataKey] - b[dataKey]);

  return (
    <Bar
      key={`planets-graph-${dataKey}-${dimensions.height}-${dimensions.width}`}
      datasetIdKey="name"
      options={{
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
        responsive: true,
        animation: {
          delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default") {
              // Adapt the data point index animation delay according to the quantity. This will prevent massive datasets taking 3 days to load
              delay = context.dataIndex * (1300 / data.length);
            }
            return delay;
          },
        },
        scales: {
          x: {
            beginAtZero: true,
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
