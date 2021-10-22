import { Ecommerce } from "./Ecommerce.js";

const selectors = {
  input: "[data-input-name]",
  brands: "[data-select-brands]",
  types: "[data-select-types]",
  products: "[data-products]",
  filters: "[data-filters-pills]",
  clearButtons: "[data-clear-filters]",
};

const ecommerce = new Ecommerce(selectors);
