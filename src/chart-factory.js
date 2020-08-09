export const Chart = ({
    selector = '#domElement',
    chartType = 'bar',
    title = '',
    dimensions = {
      width: 600,
      height: 360,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60
      }
    },
    data } = {}) => ({
  selector,
  chartType,
  title,
  dimensions,
  data,
  render: (renderer) => {
    renderer({selector, dimensions, title, data })
  }
})
