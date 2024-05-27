export const normalisePlanet = (planet) => ({
  ...planet,
  gravity: parseFloat(planet.gravity),
  surface_water: parseInt(planet.surface_water),
  diameter: parseInt(planet.diameter),
  orbital_period: parseInt(planet.orbital_period),
  population: parseInt(planet.population),
  rotation_period: parseInt(planet.rotation_period),
});
