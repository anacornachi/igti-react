import api from "../services/api.js";
import { convertNumber } from "../utils/convertNumber.js";
import { formatDate } from "../utils/formatDate.js";

export class CovidData {
  constructor(selectors) {
    this.executeIfIsPage("/index", () => {
      this.summary = JSON.parse(localStorage.getItem("summary"));
      this.boardKpi = document.querySelector(selectors.canvaKpi);
      this.boardPizza = document.querySelector(selectors.canvaPizza);
      this.boardPareto = document.querySelector(selectors.canvaPareto);
    });

    this.executeIfIsPage("/country", async () => {
      this.form = document.querySelector(selectors.dataForm);
      this.applyButton = document.querySelector(selectors.applyButton);
      this.isChartLoaded = false;
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.applyFilters();
      });
      this.kpiCountryTotal = document.querySelector(selectors.kpiCountry);

      this.initialDate = document.querySelector(selectors.startDate);
      this.endDate = document.querySelector(selectors.endDate);
      this.selectCountry = document.querySelector(selectors.selectCountry);
      this.selectStatus = document.querySelector(selectors.statusData);
      await this.loadCountry();
      const past = new Date().setFullYear(2021, 8, 30);
      const today = new Date();
      this.initialDate.value = new Date(past).toISOString().substr(0, 10);
      this.endDate.value = today.toISOString().substr(0, 10);
      this.applyFilters();
    });
  }

  executeIfIsPage(pagename, callback) {
    if (
      typeof window !== undefined &&
      window.location.pathname.replace(".html", "") === pagename
    ) {
      callback();
    }
  }

  async loadHome() {
    if (!this.localData) {
      const { data } = await api.get("/summary");
      localStorage.setItem("summary", JSON.stringify(data));
      this.summary = JSON.parse(localStorage.getItem("summary"));
    }

    this.canvaKpi();
    this.canvaPizza();
    this.canvaBar();
  }

  canvaKpi() {
    this.boardKpi.innerHTML = `<div class="flex flex-col items-center justify-center bg-gray-300 h-1/3 rounded-2xl w-full h-1/3 gap-2"><h2 class="font-semibold">Total de Casos Confirmados:</h2><div class="">${convertNumber(
      this.summary.Global.TotalConfirmed
    )}</div></div><div class="flex flex-col items-center justify-center bg-gray-300 h-1/3 rounded-2xl w-full h-1/3 gap-2"><h2 class="font-semibold">Total de Mortos:</h2><div class="">${convertNumber(
      this.summary.Global.TotalDeaths
    )}</div></div><div class="flex flex-col items-center justify-center bg-gray-300 h-1/3 rounded-2xl w-full h-1/3 gap-2"><h2 class="font-semibold">Total de Recuperados:</h2><div class="">${convertNumber(
      this.summary.Global.TotalRecovered
    )}</div></div><div class="h-5 w-full flex justify-center text-xs mt-3">Data da última atualização: ${formatDate(
      this.summary.Global.Date
    )}</div>`;
  }

  canvaPizza() {
    const data = {
      labels: ["Novos confirmados", "Novas mortes", "Novas recuperações"],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            `${this.summary.Global.NewConfirmed}`,
            `${this.summary.Global.NewDeaths}`,
            `${this.summary.Global.NewRecovered}`,
          ],
          backgroundColor: [
            "rgb(5,103,117)",
            "rgb(195,53,28)",
            "rgb(37, 194, 38)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
    };

    const pizzaChart = new Chart(
      document.getElementById("chart-pizza"),
      config
    );
  }

  canvaBar() {
    const filteredArray = this.summary.Countries.map((item) => {
      return [item.TotalDeaths, item.Country];
    });

    const dataBar = filteredArray
      .sort(function (a, b) {
        if (a[0] < b[0]) return 1;
        if (a[0] > b[0]) return -1;
        return 0;
      })
      .slice(0, 10);

    const labels = dataBar.map((item) => item[1]);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Total de mortes por país",
          data: dataBar.map((item) => item[0]),
          backgroundColor: ["rgba(5,103,117, 0.8)"],
          borderColor: ["rgb(5,103,117)"],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const paretoChart = new Chart(
      document.getElementById("chart-pareto"),
      config
    );
  }

  async loadCountry() {
    const { data } = await api.get("/countries");

    const countries = data.map((item) => {
      return `<option value="${item.Country}" ${
        item.Country === "Brazil" ? "selected" : ""
      }>${item.Country}</option>`;
    });
    this.selectCountry.innerHTML = countries.sort();
  }

  async applyFilters() {
    const { data } = await api.get(
      `/country/${this.selectCountry.value}?from=${this.initialDate.value}&to=${this.endDate.value}`
    );

    const status = this.selectStatus.value;

    function analyzeCase(status) {
      if (status === "Deaths") {
        return { label: "óbitos", data: data.map((item) => item.Deaths) };
      } else if (status === "Recovered") {
        return {
          label: "recuperados",
          data: data.map((item) => item.Recovered),
        };
      } else {
        return {
          label: "novos casos",
          data: data.map((item) => item.Confirmed),
        };
      }
    }

    const labels = data.map((item) => formatDate(item.Date, true));
    const info = {
      labels: labels,
      datasets: [
        {
          label: `Número diário de ${Object.values(analyzeCase(status))[0]} `,
          data: Object.values(analyzeCase(status))[1],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    const config = {
      type: "line",
      data: info,
    };

    if (this.isChartLoaded) {
      this.countries.destroy();
      this.isChartLoaded = false;
    }
    this.countries = new Chart(document.getElementById("chart-daily"), config);
    this.isChartLoaded = true;
  }
}
