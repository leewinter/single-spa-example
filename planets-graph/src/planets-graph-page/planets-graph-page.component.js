import React, { useReducer, useEffect } from "react";
import { getPlanets } from "../utils/api.js";
import PlanetChartPie from "../planet-chart/pie-chart.component";
import PlanetChartBar from "../planet-chart/bar-chart.component";
import PlanetChartRadar from "../planet-chart/radar-chart.component";

export default function PlanetsGraphPage(props) {
  const initialState = {
    planets: [],
    loading: true,
    page: 0,
    nextPage: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "fetchPlanets" });
  }, []);
  const { page, nextPage, loading } = state;

  useEffect(() => {
    if (page > 0) {
      const req$ = getPlanets(page).subscribe((results) => {
        dispatch({
          type: "addPlanets",
          payload: {
            nextPage: !!results.next,
            results: results.results,
          },
        });
      });
    }
  }, [page]);

  useEffect(() => {
    if (nextPage && page > 0) {
      const timeout = setTimeout(function () {
        dispatch({ type: "fetchPlanets" });
      }, 100);

      return function () {
        clearTimeout(timeout);
      };
    }
  }, [nextPage, page]);

  return (
    <div>
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-3 md:p-5 lg:p-10">
          <PlanetChartPie
            graphTitle="Planet Diameter Kilometers"
            dataLabel="Diameter"
            dataKey="diameter"
            planets={state.planets}
            loading={loading || nextPage}
          />
        </div>
        <div className="p-3 md:p-5 lg:p-10">
          <PlanetChartRadar
            graphTitle="Gravity"
            dataLabel="Gravity"
            dataKey="gravity"
            planets={state.planets}
            loading={loading || nextPage}
          />
        </div>
        <div className="p-3 md:p-5 lg:p-10">
          <PlanetChartPie
            graphTitle="Surface Water"
            dataLabel="Surface Water"
            dataKey="surface_water"
            planets={state.planets}
            loading={loading || nextPage}
          />
        </div>
        <div className="p-3 md:p-5 lg:p-10">
          <PlanetChartPie
            graphTitle="Population"
            dataLabel="Population"
            dataKey="population"
            planets={state.planets}
            loading={loading || nextPage}
          />
        </div>
        <div className="p-3 md:p-5 lg:p-10">
          <PlanetChartBar
            graphTitle="Orbital Period"
            dataLabel="Orbital Period"
            dataKey="orbital_period"
            planets={state.planets}
            loading={loading || nextPage}
          />
        </div>
        <div className="p-3 md:p-5 lg:p-10">
          <PlanetChartBar
            graphTitle="Rotation Period"
            dataLabel="Rotation Period"
            dataKey="rotation_period"
            planets={state.planets}
            loading={loading || nextPage}
          />
        </div>
      </div>
    </div>
  );
}

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "addPlanets":
      const { payload } = action;
      newState.loading = false;
      newState.nextPage = payload.nextPage;
      newState.planets = [...newState.planets, ...payload.results];
      return newState;
    case "fetchPlanets":
      newState.loading = true;
      newState.page = newState.page + 1;
      return newState;
    default:
      return state;
  }
}
