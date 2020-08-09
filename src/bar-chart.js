import * as d3 from 'd3'

export function barChart(chart) {
  /* Access Data */
  const data = chart.data
  const metric = d => d //.humidity
  const yAccessor = d => d.length
  const mean = d3.mean(data, metric)
  /* Chart Dimensions */
  const dimensions = chart.dimensions
    dimensions.boundedWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  const selector = d3.select(chart.selector)
  console.log(selector)
  
  const svg = selector.append("svg")
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
          .attr("fill", "darkslategray")
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
          .attr("font-size", "12px")
          .text(chart.title)

      const meanLine = bounds.append("line")
          .attr("x1", xScale(mean))
          .attr("x2", xScale(mean))
          .attr("y1", -15)
          .attr("y2", dimensions.boundedHeight)
          .attr("stroke", "maroon")
          .attr("stroke-dasharray", "2px 4px")

      const meanLabel = bounds.append("text")
          .attr("x", xScale(mean))
          .attr("y", -20)
          .text("mean")
          .attr("fill", "maroon")
          .style("font-size", "12px")
          .style("text-anchor", "middle")
}
