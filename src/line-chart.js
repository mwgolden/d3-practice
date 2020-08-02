import * as d3 from 'd3'

export function lineChart(data) {
  const dateParser = d3.timeParse("%Y-%m-%d")
  const yAccessor = d => d.temperatureMax
  const xAccessor = d => dateParser(d.date)

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60
    }
  }
  dimensions.boundedWidth = dimensions.width
      - dimensions.margin.right
      - dimensions.margin.left

  dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom

  const svg = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = svg.append("g")
      .style("transform", `translate(
            ${dimensions.margin.left}px,
            ${dimensions.margin.top}px
            )`)
  const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yAccessor))
      .range([dimensions.boundedHeight, 0])

  const xScale = d3.scaleTime()
      .domain(d3.extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])

  const freezingTempPlacement = yScale(32)

  const freezingTemperatures = bounds.append("rect")
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", freezingTempPlacement)
      .attr("height", dimensions.boundedHeight- freezingTempPlacement)
      .attr("fill","#e0f3f3")

  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

  const line = bounds.append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

  const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
  const yAxis = bounds.append("g")
  yAxisGenerator(yAxis)

  const xAxisGenerator = d3.axisBottom()
      .scale(xScale)
  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
}
