var charter = require('./src/charts.js')
var exporter = require('highcharts-export-server')

exporter.initPool()

module.exports.graph = async (event, context) => {

  var data;
  if (event.httpMethod === 'GET') {
    data = JSON.parse(event.queryStringParameters.data);
  } else {
    data = JSON.parse(event.body);
  }

  try {
    const chart = await charter.createChart(exporter, data);

    return {
      headers: {
        "Content-Type": 'image/png'
      },
      statusCode: 200,
      isBase64Encoded: true,
      body: chart
    }
  } catch (err) {
    // TODO: How to log the error
    return {
      headers: {
        "Content-Type": 'text/plain'
      },
      statusCode: 500,
      isBase64Encoded: false,
      body: "An error occurred"
    }
  }
}
