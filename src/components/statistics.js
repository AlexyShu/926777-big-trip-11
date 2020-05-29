import AbstractSmartComponent from "./abstract-smart-component.js";
import {TripTypes, TitleName, LabelPrefix} from "../const.js";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const generateChartsData = (points) => {
  const moneyStatistics = {};
  const transportStatistics = {};
  for (let value of TripTypes.TRANSFER) {
    transportStatistics[value] = 0;
  }
  const timeStatictics = {};
  points.forEach((point) => {
    if (point.eventType in moneyStatistics) {
      moneyStatistics[point.eventType] += Number(point.price);
    } else {
      moneyStatistics[point.eventType] = Number(point.price);
    }
    if (point.eventType in transportStatistics) {
      transportStatistics[point.eventType] += 1;
    }
    if (point.eventType in timeStatictics) {
      timeStatictics[point.eventType] += point.endEventTime - point.startEventTime;
    } else {
      timeStatictics[point.eventType] = point.endEventTime - point.startEventTime;
    }
  });
  const moneyData = Object.entries(moneyStatistics).sort((a, b) => b[1] - a[1]);
  const transportData = Object.entries(transportStatistics)
    .filter((item) => item[1] !== 0)
    .sort((a, b) => b[1] - a[1]);
  const timeData = Object.entries(timeStatictics)
    .map((item) => {
      return [
        item[0],
        Math.round(moment.duration(item[1], `milliseconds`).asHours())
      ];
    })
    .filter((item) => item[1] !== 0)
    .sort((a, b) => b[1] - a[1]);
  return {
    moneyData,
    transportData,
    timeData
  };
};

const renderChart = (ctx, data, label, legend, isLabelPositonLeft = false) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data.map((item) => item[0].toUpperCase()),
      datasets: [
        {
          data: data.map((item) => item[1]), // данные
          backgroundColor: `#ffffff`,
          borderColor: `#ffffff`,
          anchor: `start`
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `left`,
          formatter(value) {
            return isLabelPositonLeft ? `${label}${value}` : `${value}${label}`;
          }
        }
      },
      title: {
        display: true,
        text: legend.toUpperCase(),
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (`<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>
  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>
  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _renderCharts() {
    const element = this.getElement();
    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeCtx = element.querySelector(`.statistics__chart--time`);
    const {moneyData, transportData, timeData} = generateChartsData(
        this._pointsModel.getPointsAll()
    );
    this._moneyChart = renderChart(
        moneyCtx,
        moneyData,
        LabelPrefix.EURO,
        TitleName.MONEY,
        true
    );
    this._transportChart = renderChart(
        transportCtx,
        transportData,
        LabelPrefix.TIMES,
        TitleName.TRANSPORT
    );
    this._timeChart = renderChart(
        timeCtx,
        timeData,
        LabelPrefix.HOURS,
        TitleName.TIME
    );
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }
    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }
    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }

  recoveryListeners() {}

  destroy() {
    this._resetCharts();
  }
}
