const charter = require("./lib/charts");
const exporter = require("highcharts-export-server");
const pjs = require("phantomjs-prebuilt");
var fs = require("fs");

// Since the PhantomJS binary is deployed as layer, we need monkey-patch the
// exported location of the binary to point to our bundled one.
pjs.path = process.env.IS_OFFLINE !== "true" ? "/opt/phantomjs" : pjs.path;

exporter.initPool({ maxWorkers: 1, listenToProcessExits: true });

module.exports.graph = async (event, context) => {
  try {
    var data;
    if (event.httpMethod === "GET") {
      data = JSON.parse(event.queryStringParameters.data);
    } else {
      data = JSON.parse(event.body);
    }
  } catch (err) {
    console.error(err);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "text/plain"
      },
      statusCode: 400,
      isBase64Encoded: false,
      body: "Bad Request"
    };
  }

  try {
    const chart = await charter.createChart(exporter, data);

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "image/png"
      },
      statusCode: 200,
      isBase64Encoded: true,
      body: chart
    };
  } catch (err) {
    console.error(err);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "text/plain"
      },
      statusCode: 500,
      isBase64Encoded: false,
      body: "An error occurred"
    };
  }
};
