import { getAllProducts } from "../services/getAllProducts.js";
import { convertToBRL } from "../utils/convertToBRL.js";
import { findByBrand } from "../services/findByBrand.js";

export class Ecommerce {
  constructor(selectors) {
    this.input = document.querySelector(selectors.input);
    this.brands = document.querySelector(selectors.brands);
    this.types = document.querySelector(selectors.types);
    this.products = document.querySelector(selectors.products);
    this.filters = document.querySelector(selectors.filters);
    this.filtersList = [];
    this.clearButtons = document.querySelectorAll(selectors.clearButtons);
    this.localProducts = JSON.parse(localStorage.getItem("allProducts"));
    this.productsInScreen = [];

    this.loadProducts();
    this.loadBrands();
    this.loadTypes(this.localProducts);

    this.brands.addEventListener("change", (event) =>
      this.showBrandList(event)
    );

    this.types.addEventListener("change", (event) => this.showTypesList(event));
  }

  renderProducts(productsList) {
    this.products.innerHTML = productsList
      .map(
        (item) =>
          `
        <div
            class="
              flex flex-col
              bg-white
              w-64
              h-96
              bg-gray-100
              p-2
              items-center
              transform
              transition
              duration-700
              hover:scale-105 hover:shadow-xl
              rounded
            "
          >
            <img
              class="h-3/4 w-full bg-cover"
              src="${item.image_link}"
              alt="${item.name}"
            />
            <div class="h-1/4 w-full flex flex-col gap-2 items-center justify-center">
            <h2 class="flex items-center justify-center text-md font-bold">${
              item.name
            }</h2>
            <div class="flex flex-col w-full justify-around items-center">
              <div class=" w-full h-full px-2 bg-indigo-400 text-white rounded flex items-center justify-center mb-2">
                ${item.brand}
              </div>
              <div class=" w-full h-full px-2 bg-pink-400 text-white rounded flex items-center justify-center">
                ${convertToBRL(item.price)}
              </div>
              </div>
            </div>
          </div>
        
      `
      )
      .join("");
  }

  async loadProducts() {
    if (!this.localProducts) {
      const allProducts = await getAllProducts();
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
      this.localProducts = JSON.parse(localStorage.getItem("allProducts"));
    }

    this.renderProducts(this.localProducts.slice(0, 16));

    this.productsInScreen = this.localProducts;
  }

  loadBrands() {
    const unfilteredBrands = this.localProducts.map((item) => item.brand);

    const filteredBrands = unfilteredBrands.filter((item, index) => {
      return unfilteredBrands.indexOf(item) === index;
    });

    const renderedBrands = filteredBrands.map((item) => {
      return `<option value="${item}">${item}</option>`;
    });
    this.brands.innerHTML += renderedBrands.join("");
  }
  loadTypes(productsList) {
    const unfilteredTypes = productsList.map((item) => item.product_type);
    console.log({ productsList });
    const filteredTypes = unfilteredTypes.filter((item, index) => {
      return unfilteredTypes.indexOf(item) === index;
    });

    const renderedTypes = filteredTypes.map((item) => {
      return `<option value="${item}">${item}</option>`;
    });
    this.types.innerHTML = renderedTypes.join("");
  }

  clearFilters() {
    this.loadProducts();
    this.filters.innerHTML = "";
    this.brands.value = "all";
  }

  addFilterPills(filters) {
    console.log({ filters });
    this.filters.innerHTML = filters
      .map(
        (filter) => `
    <div class="rounded-xl px-4 py-2 text-white bg-gradient- border border-rebeccapurple bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md flex items-center gap-4"><span>${filter.value}</span><button class="clear-filter">x</button></div>
    `
      )
      .join("");
    this.clearButtons = document.querySelectorAll(".clear-filter");
    this.clearButtons.forEach((button) => {
      button.addEventListener("click", () => this.clearFilters());
    });
  }

  addFilter(filter) {
    if (this.filtersList.length === 0) {
      this.filtersList = [filter];
    } else {
      this.filtersList = this.filtersList.filter((savedFilter) => {
        if (savedFilter.product_type === filter.product_type) {
          return filter;
        }
        return savedFilter;
      });
    }
    this.addFilterPills(this.filtersList);
  }
  async showBrandList(event) {
    const query = event.target.value;

    this.addFilter({ type: "brand", value: query });
    console.log(this.clearButtons);

    // AQUI EU PEGUEI O VALOR E PASSEI PRA CONST QUERY
    const filteredProducts = await findByBrand(query);
    this.loadTypes(filteredProducts);
    this.renderProducts(filteredProducts);

    this.productsInScreen = filteredProducts;
  }

  showTypesList(event) {
    const query = event.target.value;

    this.addFilter({ type: "type", value: query });

    // AQUI EU PEGUEI O VALOR E PASSEI PRA CONST QUERY
    const filteredProducts = this.productsInScreen.filter(
      (product) => product.product_type === query
    );
    this.loadTypes(filteredProducts);
    this.renderProducts(filteredProducts);

    this.productsInScreen = filteredProducts;
  }
}
