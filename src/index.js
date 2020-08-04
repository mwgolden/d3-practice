import "./main.css"
import data from '../data/nyc_weather_data.json'
import { scatterPlot } from './scatter-plot.js'
import { lineChart } from './line-chart.js'
import { barChart } from './bar-chart.js'
import config from '../chart-config/bar-chart.json'

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
let mDewPoint = data.map(
  d => d.dewPoint
)
let mMoonPhase = data.map(
  d => d.moonPhase
)
wrapper = document.getElementById("wrapper")
wrapper.append(scatterPlot(observations))
wrapper.append(barChart(humidityMeasurements, config))

config.xAxisLabel.text = "Dew Point"
const dewpointdiv = document.createElement("div")
dewpointdiv.append(barChart(mDewPoint, config))
document.body.append(dewpointdiv)

config.xAxisLabel.text = "Moon Phase"
const moonPhaseDiv = document.createElement("div")
moonPhaseDiv.append(barChart(mMoonPhase, config))
document.body.append(moonPhaseDiv)

//lineChart(data)
