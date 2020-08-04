import * as d3 from 'd3'


export function barChart(data, config){

  /* Access Data */
  const metric = d => d //.humidity
  const yAccessor = d => d.length
  const mean = d3.mean(data, metric)
  /* Chart Dimensions */

  config.dimensions.boundedWidth = config.dimensions.width
      - config.dimensions.margin.right
      - config.dimensions.margin.left

  config.dimensions.boundedHeight = config.dimensions.height
      - config.dimensions.margin.top
      - config.dimensions.margin.bottom
  /* Chart Canvas */
  const svg = d3.create("svg")
      .attr("width", config.dimensions.width)
      .attr("height", config.dimensions.height)

  const bounds = svg.append("g")
      .style("transform", `translate(
        ${config.dimensions.margin.left}px,
        ${config.dimensions.margin.top}px
      )`)
  /* Create Scales */
  const xScale = d3.scaleLinear()
      .domain(d3.extent(data, metric))
      .range([0, config.dimensions.boundedWidth])
      .nice()

  const barGenerator = d3.histogram()
      .domain(xScale.domain())
      .value(metric)
      .thresholds(12)

  const bars = barGenerator(data)

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(bars, yAccessor)])
      .range([config.dimensions.boundedHeight, 0])
      .nice()
  /* Draw Data */
  const barsGroup = bounds.append("g")

  const barGroups = barsGroup.selectAll("g")
      .data(bars)
      .enter().append("g")

  const barPadding = config.bars.padding

  const barRects = barGroups.append("rect")
      .attr("x", d => xScale(d.x0) + barPadding / 2)
      .attr("y", d => yScale(yAccessor(d)))
      .attr("width", d => d3.max([
        0, xScale(d.x1) - xScale(d.x0) - barPadding
      ]))
      .attr("height", d => config.dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr("fill", config.bars.color)

  const barText = barGroups.filter(yAccessor)
    .append("text")
      .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr("y", d => yScale(yAccessor(d)) - 5)
      .attr("fill", config.bars.label.fontColor)
      .text(yAccessor)
      .style("text-anchor", config.bars.label.textAnchor)
      .style("font-size", config.bars.label.fontSize)
      .style("font-family", config.bars.label.fontFamily)

  /* Draw Peripherals */
  const xAxisGenerator = d3.axisBottom()
      .scale(xScale)
  const xAxis = bounds.append("g")
      .style("transform", `translateY(
        ${config.dimensions.boundedHeight}px
      )`)
  xAxisGenerator(xAxis)
  const xAxisLabel = xAxis.append("text")
      .attr("x", config.dimensions.boundedWidth / 2)
      .attr("y", config.dimensions.margin.bottom - 10)
      .attr("fill", config.xAxisLabel.fontColor)
      .attr("font-size", config.xAxisLabel.fontSize)
      .text(config.xAxisLabel.text)

  const meanLine = bounds.append("line")
      .attr("x1", xScale(mean))
      .attr("x2", xScale(mean))
      .attr("y1", -15)
      .attr("y2", config.dimensions.boundedHeight)
      .attr("stroke", "maroon")
      .attr("stroke-dasharray", "2px 4px")

  const meanLabel = bounds.append("text")
      .attr("x", xScale(mean))
      .attr("y", -20)
      .text("mean")
      .attr("fill", "maroon")
      .style("font-size", "12px")
      .style("text-anchor", "middle")
  /* Set up interactions */

  return svg.node()
}
