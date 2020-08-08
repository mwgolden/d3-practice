import "./main.css"
import data from '../data/nyc_weather_data.json'
import { scatterPlot } from './scatter-plot.js'
import { lineChart } from './line-chart.js'
import { barChart } from './bar-chart.js'
import config from '../chart-config/bar-chart.json'
import { pieChart } from './pie-chart.js'


let observations = data.map(
  d => {
      return {
        "humidity": d.humidity,
        "dewPoint": d.dewPoint,
        "cloudCover": d.cloudCover
      }
  }
)

function selectEvent(event) {
  let measure = event.target.selectedOptions[0].value
  drawBarChart(measure)
}
function drawBarChart(measure) {

  let chart = document.getElementById("barchart")
  chart.querySelectorAll('*').forEach(n => n.remove())
  switch(measure) {
    case 'humidity':
      let humidityMeasurements = data.map(
        d => d.humidity
      )
      config.xAxisLabel.text = "Humidity"
      chart.append(barChart(humidityMeasurements, config))
    break;
    case 'dewPoint':
      let mDewPoint = data.map(
        d => d.dewPoint
      )
      config.xAxisLabel.text = "Dew Point"
      chart.append(barChart(mDewPoint, config))
    break;
    case 'moonPhase':
      let mMoonPhase = data.map(
        d => d.moonPhase
      )
      config.xAxisLabel.text = "Moon Phase"
      chart.append(barChart(mMoonPhase, config))
    break;
  }

}

const barChartSelect = document.getElementById("barchart-select")
barChartSelect.addEventListener("change", selectEvent)
drawBarChart('humidity')

const pieDiv = document.createElement("div")
pieDiv.append(pieChart())
document.body.append(pieDiv)
//lineChart(data)
