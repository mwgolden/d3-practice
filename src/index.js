import "./main.css"
import data from '../data/nyc_weather_data.json'
import { scatterPlot } from './scatter-plot.js'
import { lineChart } from './line-chart.js'

let observations = data.map(
  d => {
      return {
        "humidity": d.humidity,
        "dewPoint": d.dewPoint
      }
  }
)
wrapper = document.getElementById("wrapper")
wrapper.append(scatterPlot(observations))
//lineChart(data)
