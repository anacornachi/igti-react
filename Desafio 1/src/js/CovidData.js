import api from "../services/api.js";
import { convertNumber } from "../utils/convertNumber.js";
import { formatDate } from "../utils/formatDate.js";

export class CovidData {
  constructor(selectors) {
    this.summary = JSON.parse(localStorage.getItem("summary"));
    this.boardKpi = document.querySelector(selectors.canvaKpi);
    this.boardPizza = document.querySelector(selectors.canvaPizza);
    this.boardPareto = document.querySelector(selectors.canvaPareto);

    this.loadHome();
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
}
