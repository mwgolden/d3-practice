import * as d3 from 'd3'

export function barChart(data){

  /* Access Data */
  const metric = d => d //.humidity
  const yAccessor = d => d.length
  /* Chart Dimensions */
  const width = 600

  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50
    }
  }

  dimensions.boundedWidth = dimensions.width
      - dimensions.margin.right
      - dimensions.margin.left

  dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom
  /* Chart Canvas */
  const svg = d3.create("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = svg.append("g")
      .style("transform", `translate(
        ${dimensions.margin.left}px,
        ${dimensions.margin.top}px
      )`)
  /* Create Scales */
  const xScale = d3.scaleLinear()
      .domain(d3.extent(data, metric))
      .range([0, dimensions.boundedWidth])
      .nice()

  const barGenerator = d3.histogram()
      .domain(xScale.domain())
      .value(metric)
      .thresholds(12)

  const bars = barGenerator(data)

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(bars, yAccessor)])
      .range([dimensions.boundedHeight, 0])
      .nice()
  /* Draw Data */
  const barsGroup = bounds.append("g")

  const barGroups = barsGroup.selectAll("g")
      .data(bars)
      .enter().append("g")
  console.log(bars)
  const barPadding = 1

  const barRects = barGroups.append("rect")
      .attr("x", d => xScale(d.x0) + barPadding / 2)
      .attr("y", d => yScale(yAccessor(d)))
      .attr("width", d => d3.max([
        0, xScale(d.x1) - xScale(d.x0) - barPadding
      ]))
      .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr("fill", "dodgerblue")

  const barText = barGroups.filter(yAccessor)
    .append("text")
      .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr("y", d => yScale(yAccessor(d)) - 5)
      .attr("fill", "lightgrey")
      .text(yAccessor)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")

  /* Draw Peripherals */
  const xAxisGenerator = d3.axisBottom()
      .scale(xScale)
  const xAxis = bounds.append("g")
      .style("transform", `translateY(
        ${dimensions.boundedHeight}px
      )`)
  xAxisGenerator(xAxis)
  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .attr("font-size", "1.4em")
      .text("Humidity")
      .style("text-anchor", "middle")
  /* Set up interactions */

  return svg.node()
}
