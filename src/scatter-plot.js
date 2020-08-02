import * as d3 from 'd3'

export function scatterPlot(data) {


  /* Access Data */
  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity

  /* Create Chart Dimensions */
  const width = d3.min([
    window.innerWidth * .9,
    window.innerHeight * .9
  ])
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
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

  /* Draw Canvas */
  const svg = d3.create("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = svg.append("g")
      .style("transform", `translate(
                ${dimensions.margin.left}px,
                ${dimensions.margin.top}px`)
  console.log(svg)
  /* Create Scales */
  console.log(d3.extent(data, xAccessor))
  const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yAccessor))
      .range([dimensions.boundedHeight, 0])
  /* Draw Data */
  bounds.selectAll("g")
    .data(data)
    .join("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 2)
  /* Draw Peripherals */
  const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
  const yAxis = bounds.append("g")
  yAxisGenerator(yAxis)

  const xAxisGenerator = d3.axisBottom().scale(xScale)
  const xAxis = bounds.append("g")
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)
  xAxisGenerator(xAxis)
  /* Set up Interactions */


  return svg.node()
}
