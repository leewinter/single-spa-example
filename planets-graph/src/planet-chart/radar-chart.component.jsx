import { useWindowResize } from "./use-window-resize";
import { Chart, registerables } from "chart.js";
import { Radar } from "react-chartjs-2";
import SkeletonGraphLoader from "./skeleten-graph-loader";
import { normalisePlanet } from "./chart-helpers";

export default function PlanetChartRadar(props) {
  const { planets, graphTitle, dataLabel, dataKey, loading } = props;

  const { dimensions } = useWindowResize();

  if (loading) return <SkeletonGraphLoader chartType="pie" />;

  Chart.register(...registerables);

  const data = planets
    .map(normalisePlanet)
    .filter((p) => p[dataKey])
    .sort((a, b) => a[dataKey] - b[dataKey]);

  return (
    <Radar
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
