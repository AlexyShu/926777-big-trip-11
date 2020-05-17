import AbstractComponent from "./abstract-component.js";
import moment from "moment";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const TitleName = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME: `TIME SPENT`
};

const LabelPrefix = {
  EURO: `€`,
  TIMES: `x`,
  HOURS: `h`
};

const generateChartsData = (events) => {
  const moneyStatistics = {};
  const transportStatistics = {
    taxi: 0,
    bus: 0,
    train: 0,
    ship: 0,
    transport: 0,
    drive: 0
  };
  const timeStatictics = {};

  events.forEach((event) => {
    if (event.type in moneyStatistics) {
      moneyStatistics[event.type] += Number(event.price);
    } else {
      moneyStatistics[event.type] = Number(event.price);
    }

    if (event.type in transportStatistics) {
      transportStatistics[event.type] += 1;
    }

    if (event.type in timeStatictics) {
      timeStatictics[event.type] += event.endDate - event.startDate;
    } else {
      timeStatictics[event.type] = event.endDate - event.startDate;
    }
  });

  const moneyData = Object.entries(moneyStatistics).sort((a, b) => b[1] - a[1]);

  const transportData = Object.entries(transportStatistics)
    .sort((a, b) => b[1] - a[1])
    .filter((item) => item[1] !== 0);

  const timeData = Object.entries(timeStatictics)
    .sort((a, b) => b[1] - a[1])
    .map((item) => {
      return [
        item[0],
        Math.round(moment.duration(item[1], `milliseconds`).asHours())
      ];
    })
    .filter((item) => item[1] !== 0);

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
          label: legend.toUpperCase(), // название заголовка
          data: data.map((item) => item[1]), // данные
          backgroundColor: `#ffffff`,
          borderColor: `#ffffff`,
          borderWidth: 1,
          barThickness: 30,
          barPercentage: 1.0
        }
      ]
    },
    options: {
      responsive: false,
      aspectRatio: 2.2,
      legend: {
        position: `left`,
        labels: {
          fontSize: 16,
          fontStyle: `bold`
        }
      },
      tooltips: {
        mode: `nearest`,
        titleAlign: `left`
      },
      scales: {
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
        }]
      },
      plugins: {
        datalabels: {
          labels: {
            title: {
              font: {
                weight: `bold`,
                size: 16
              }
            }
          },
          anchor: `end`,
          align: `left`,
          formatter(value) {
            return isLabelPositonLeft ? `${label}${value}` : `${value}${label}`;
          }
        }
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

export default class StatisticsComponent extends AbstractComponent {
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

    // this._resetCharts();

    const {moneyData, transportData, timeData} = generateChartsData(
        this._pointsModel.getEvents()
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


}
