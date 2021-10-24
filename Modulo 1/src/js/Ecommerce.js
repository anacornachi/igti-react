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
    this.buttonFilterName = document.querySelector(selectors.filterByName);

    this.loadProducts();
    this.loadBrands();
    this.loadTypes(this.localProducts);

    this.input.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const query = this.input.value;
        this.filterByName(query);
      }
    });

    this.buttonFilterName.addEventListener("click", (event) => {
      event.preventDefault();
      const query = this.input.value;
      this.filterByName(query);
    });

    this.brands.addEventListener("change", (event) => {
      this.showBrandList(event);

      this.filtersList = this.filtersList.filter(
        (filter) => filter.type !== "type"
      );

      this.addFilterPills(this.filtersList);
      return this.renderProducts(this.productsInScreen);
    });

    this.types.addEventListener("change", (event) => {
      const value = event.target.value;

      if (value === "all") {
        console.log(this.productsInScreen);

        this.filtersList = this.filtersList.filter(
          (filter) => filter.type !== "type"
        );

        this.addFilterPills(this.filtersList);
        return this.renderProducts(this.productsInScreen);
      }

      this.showTypesList(event);
    });
  }

  renderProducts(productsList) {
    this.products.innerHTML = productsList
      .map(
        (item) =>
          `
        <div class="flip-card" id="card-${item.id}">
          <div class="product-card w-64 h-96">
            <div class="flip-front flex flex-col bg-white bg-gray-100 p-2 items-center transform transition duration-700 hover:scale-105 hover:shadow-xl rounded">
              <img
                class="h-3/4 w-full bg-cover" 
                onerror="handleImageError(event)" 
                src="${item.image_link}"
                alt="${item.name ?? ""}"
              />
              <div class="h-1/4 w-full flex flex-col gap-2 items-center justify-center">
              <h2 class="flex items-center justify-center text-sm font-bold">${
                item.name ?? ""
              }</h2>
              <div class="flex flex-col w-full justify-around items-center">
                <div class=" w-full h-full px-2 bg-indigo-400 text-white rounded flex items-center justify-center mb-1">
                  ${item.brand ?? ""}
                </div>
                <div class=" w-full h-full px-2 bg-pink-400 text-white rounded flex items-center justify-center">
                  ${convertToBRL(item.price ?? 0)}
                </div>
                </div>
              </div>
            </div>
            <div class="flip-back flex flex-col bg-white bg-gray-100 p-2 items-center transform transition duration-700 hover:scale-105 hover:shadow-xl rounded">
              <div class="relative h-40 w-full mb-1">
                <h2 class="h-16 w-full flex items-center justify-center p-3 font-bold text-md rounded absolute bg-red-800 text-white bg-opacity-40 text-shadow inset-x-0 bottom-0">${
                  item.name ?? ""
                }</h2>
                <img
                     class="h-full w-full bg-cover" 
                    onerror="handleImageError(event)" 
                    src="${item.image_link}"
                    alt="${item.name ?? ""}"
                />
              </div>
              <div class="flex flex-col w-full h-14 gap-1">
                <div class=" w-full h-6 px-2 bg-indigo-400 text-white rounded flex items-center justify-center">
                ${item.brand ?? ""}
                </div>
                <div class=" w-full h-6 px-2 bg-pink-400 text-white rounded flex items-center justify-center">
                    ${convertToBRL(item.price ?? 0)}
                </div>
              </div>
              <div class="flex flex-col gap-1 w-full h-1/4 p-2 items-center">
                <div class="flex justify-around w-full">
                  <h3 class="w-2/4 flex items-center justify-left">Marca:</h3>
                  <p class="bg-gray-200 w-2/4 flex justify-center">${
                    item.brand ?? ""
                  }</p>
                </div>
                <div class="flex justify-around w-full">
                  <h3 class="w-2/4 flex items-center justify-left">Preço:</h3>
                  <p class="bg-gray-200 w-2/4 flex justify-center"> ${convertToBRL(
                    item.price ?? 0
                  )}</p>
                </div>
                <div class="flex justify-around w-full">
                  <h3 class="w-2/4 flex items-center justify-left">Avaliação:</h3>
                  <p class="bg-gray-200 w-2/4 flex justify-center">${
                    item.rating ?? 0
                  }</p>
                </div>
                <div class="flex justify-around w-full">
                  <h3 class="w-2/4 flex items-center justify-left">Categoria:</h3>
                  <p class="bg-gray-200 w-2/4 flex justify-center">${
                    item.category ?? ""
                  }</p>
                </div>
                <div class="flex justify-around w-full">
                  <h3 class="w-2/4 flex items-center justify-left">Tipo:</h3>
                  <p class="bg-gray-200 w-2/4 flex justify-center">${
                    item.product_type ?? ""
                  }</p>
                </div>
              </div>



            </div>
          </div>
        </div>
            `
      )
      .join("");

    const cards = document.querySelectorAll(".flip-card");

    cards.forEach((item) =>
      item.addEventListener("click", (event) => {
        event.target.closest(".flip-card").classList.toggle("active");
      })
    );
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
      if (item === null) {
        return;
      }
      return unfilteredBrands.indexOf(item) === index;
    });

    const renderedBrands = filteredBrands.sort().map((item) => {
      return `<option value="${item}">${item}</option>`;
    });
    this.brands.innerHTML += renderedBrands.join("");
  }
  loadTypes(productsList) {
    const unfilteredTypes = productsList.map((item) => item.product_type);
    const filteredTypes = unfilteredTypes.filter((item, index) => {
      return unfilteredTypes.indexOf(item) === index;
    });

    const renderedTypes = filteredTypes.map((item) => {
      return `<option value="${item}">${item}</option>`;
    });

    this.types.innerHTML = [
      `<option value="all">Todos</option>`,
      ...renderedTypes,
    ].join("");
  }

  clearFilters(filter) {
    this.loadProducts();

    if (filter === "type") {
      console.log({ filter });
      this.filtersList = this.filtersList.filter((savedFilter) => {
        console.log(savedFilter.type !== "type");
        return savedFilter.type !== "type";
      });

      this.addFilterPills(this.filtersList);
      this.types.value = "all";
      return;
    }
    this.filtersList = [];
    this.filters.innerHTML = "";
    this.types.value = "all";
    this.brands.value = "all";
  }

  addFilterPills(filters) {
    console.log({ filters });
    this.filters.innerHTML = filters
      .map(
        (filter) => `
    <div class="rounded-xl px-4 py-2 text-white bg-gradient- border border-rebeccapurple bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md flex items-center gap-4"><span>${filter.value}</span><button id="${filter.type}" class="clear-filter">x</button></div>
    `
      )
      .join("");
    this.clearButtons = document.querySelectorAll(".clear-filter");
    this.clearButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.clearFilters(event.target.id);
      });
    });
  }

  addFilter(filter) {
    if (this.filtersList.length === 0) {
      this.filtersList = [filter];
    } else {
      const filterExists =
        this.filtersList.filter(
          (savedFilter) => savedFilter.type === filter.type
        ).length > 0;

      if (filterExists) {
        this.filtersList = this.filtersList.map((savedFilter) =>
          savedFilter.type === filter.type ? filter : savedFilter
        );

        return this.addFilterPills(this.filtersList);
      }

      this.filtersList.push(filter);
    }

    this.addFilterPills(this.filtersList);
  }
  async showBrandList(event) {
    const query = event.target.value;
    this.input.value = "";

    this.addFilter({ type: "brand", value: query });
    console.log(this.clearButtons);

    const filteredProducts = await findByBrand(query);
    this.loadTypes(filteredProducts);
    this.renderProducts(filteredProducts);

    this.productsInScreen = filteredProducts;
  }

  showTypesList(event) {
    const query = event.target.value;

    this.addFilter({ type: "type", value: query });

    const filteredProducts = this.productsInScreen.filter(
      (product) => product.product_type === query
    );

    this.renderProducts(filteredProducts);
  }

  filterByName(query) {
    const filteredNames = this.productsInScreen.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

    this.renderProducts(filteredNames);
  }
}
