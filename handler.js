var charter = require('./lib/charts.js')
var exporter = require('highcharts-export-server')

module.exports.graph = async (event, context) => {

  try {
    var data;
    if (event.httpMethod === 'GET') {
      data = JSON.parse(event.queryStringParameters.data);
    } else {
      data = JSON.parse(event.body);
    }
  } catch (err) {
    console.error(err);
    return {
      headers: {
        "Content-Type": 'text/plain'
      },
      statusCode: 400,
      isBase64Encoded: false,
      body: "Bad Request"
    }
  }

  try {
    exporter.initPool({ maxWorkers: 1 })
    const chart = await charter.createChart(exporter, data);
    exporter.killPool();

    return {
      headers: {
        "Content-Type": 'image/png'
      },
      statusCode: 200,
      isBase64Encoded: true,
      body: chart
    }
  } catch (err) {
    console.error(err);
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
