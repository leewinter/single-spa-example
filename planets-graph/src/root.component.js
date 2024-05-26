import PlanetsGraphPage from "./planets-graph-page/planets-graph-page.component.js";
import { BrowserRouter, Route } from "react-router-dom";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route path="/planets-graph" component={PlanetsGraphPage} />
    </BrowserRouter>
  );
}
