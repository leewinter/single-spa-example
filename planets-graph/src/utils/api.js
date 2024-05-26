import { fetchWithCache } from "@react-mf/api";
import { combineLatest } from "rxjs";

export function getPlanets(pageNum = 1) {
  return fetchWithCache(`planets?page=${pageNum}`);
}

export function getPlanet(id) {
  return fetchWithCache(`planets/${id}/`);
}
