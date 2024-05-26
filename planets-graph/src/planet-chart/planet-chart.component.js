import React from "react";
import { withRouter } from "react-router";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useWindowResize } from "./use-window-resize";
import SkeletonGraphLoader from "./skeleten-graph-loader";

function PlanetChart(props) {
  const { planets, graphTitle, dataLabel, dataKey, loading } = props;

  const { dimensions } = useWindowResize();

  if (loading) return <SkeletonGraphLoader />;

  Chart.register(...registerables);

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
              delay = dataIndex * (1300 / planets.length);
            }
            return delay;
          },
        },
      }} // surface_water
      data={{
        labels: planets.map((planet) => planet.name),
        datasets: [
          {
            data: planets.map((planet) => planet[dataKey]),
            label: dataLabel,
          },
        ],
      }}
    />
  );
}

export default withRouter(PlanetChart);
