import "./main.css"
import data from '../data/nyc_weather_data.json'
import { scatterPlot } from './scatter-plot.js'
import { lineChart } from './line-chart.js'
import { barChart } from './bar-chart.js'

let observations = data.map(
  d => {
      return {
        "humidity": d.humidity,
        "dewPoint": d.dewPoint,
        "cloudCover": d.cloudCover
      }
  }
)
let humidityMeasurements = data.map(
  d => d.humidity
)
wrapper = document.getElementById("wrapper")
wrapper.append(scatterPlot(observations))
wrapper.append(barChart(humidityMeasurements))
//lineChart(data)
