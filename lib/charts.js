var objectAssignDeep = require('object-assign-deep')

module.exports = {
  getConfig(data, options={}, rawConfig={}) {
    const type      = options.type || 'area'
    const color     = parseVal(options.color, 'color')
    const bgColor   = parseVal(options.bg || 'rgba(0, 0, 0, 0)', 'color')
    const height    = parseVal(options.height, 'integer')
    const width     = parseVal(options.width, 'integer')
    const opacity   = parseVal(options.opacity, 'float')
    const lineWidth = parseVal(options.linewidth || 2, 'integer')

    return objectAssignDeep({
      chart: {
        type: type,
        backgroundColor: bgColor,
        margin: [ 0, 0, 0, 0 ],
        height: height,
        width: width
      },
      plotOptions: {
        area: {
          fillOpacity: opacity
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: '',
      },
      series: [{
        lineWidth: lineWidth,
        color: color,
        data: data.map(d => ({ y: parseVal(d, 'integer'), marker: { enabled: false }}))
      }]
    }, rawConfig)
  },

  async createChart(exporter, config) {
    return new Promise((resolve, reject) => {
      exporter.export({ type: 'png', options: config }, function(err, response) {
        if (err)
          return reject(err)

        resolve(response.data)
      })
    })
  }
}
