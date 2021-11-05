import { CovidData } from "./CovidData.js";

const selectors = {
  startDate: "[data-start-date]",
  endDate: "[data-end-date]",
  selectCountry: "[data-country]",
  statusData: "[data-status]",
  applyButton: "[data-apply-button]",
  dataForm: "[data-form]",
  kpiCountry: "[data-chart-total]",
};

const covidData = new CovidData(selectors);
