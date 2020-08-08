import * as d3 from 'd3'

export function pieChart(data){
  /* Access Data */
  let alpha = require('../data/alphabet.csv')
  console.log(alpha)
  /* Chart Dimensions */
  let dimensions = {
    width: 600,
    height: 600,
    margin: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15
    }
  }
  dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right

  dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom

  /* Chart Canvas */
  const svg = d3.create("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
  const arcGenerator = d3.pie()
      .sort(d => d.letter)
      .value(d => +d.frequency)
  const arcs = arcGenerator(alpha)
  console.log(arcs)
  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(d3.min([dimensions.boundedWidth / 4, dimensions.boundedHeight / 4]))
  const bounds = svg.append("g")
      .attr("stroke", "white")
      .attr("transform", `translate(${dimensions.boundedWidth / 2 }, ${dimensions.boundedHeight / 2})`)
    .selectAll("path")
    .data(arcs)
    .join("path")
        .attr("d", arc)
        .attr("fill", "dodgerblue")
  const arcLabel = () => {
    const radius = d3.min([dimensions.boundedWidth, dimensions.boundedHeight]) / 4 * 0.8
    return d3.arc().innerRadius(radius).outerRadius(radius);
  }
  
  return svg.node()
}
