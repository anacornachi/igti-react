import { CovidData } from "./CovidData.js";

const selectors = {
  canvaPizza: "[data-chart-pizza]",
  canvaKpi: "[data-chart-kpi]",
  canvaPareto: "[data-chart-pareto]",
};

const covidData = new CovidData(selectors);
covidData.loadHome();
