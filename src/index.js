import { Chart } from './chart-factory.js'
import { barChart } from './bar-chart.js'
import weatherData from '../data/nyc_weather_data.json'

let chart = Chart({
  selector: '#barchart',
  data: weatherData.map(d => d.humidity),
  title: "Humidity"
})

const chartOptions = [
  { value: 'humidity', label: "Humidity" },
  { value: 'dewPoint', label: "Dew Point" },
  { value: 'sunriseTime', label: "Sunrise Time" },
  { value: 'sunsetTime', label: "Sunset Time" },
  { value: 'pressure', label: "Pressure" }
]
function updateChart(option){
  chart.title = option.label
  console.log(option.label)
  switch(option.value) {
    case 'humidity':
      chart.data = weatherData.map(d => d.humidity)
      console.log(chart)
    break
    case 'dewPoint':
      chart.data = weatherData.map(d => d.dewPoint)
      console.log(chart)
    break
  }
}

function onSelectChange(event) {
  const selectedOption = chartOptions[event.target.selectedIndex]
  console.log(selectedOption)
  updateChart(selectedOption)
}

const chartSelector = document.createElement('select')
chartOptions.id = 'barchart-select'
chartOptions.forEach(
  option => {
    let el = document.createElement('option')
    el.value = option.value
    el.innerText = option.label
    chartSelector.append(el)
  }
)
document.body.append(chartSelector)
chartSelector.addEventListener('change', onSelectChange)

chart.render(barChart)
