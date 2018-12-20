const handle = require("../handler");

const buildEvent = (params) => {
  return {
    body: JSON.stringify(params)
  };
};

test("that a chart is created when params are correctly given", async (done) => {
  const event = buildEvent({
    "chart":{
      "type":"area",
      "spacingRight":0,
      "spacingLeft":0,
      "plotShadow":false,
      "renderTo":"visitsChartContainer"
    },
    "credits":{
      "enabled":false
    },
    "title":{
      "text":"",
      "x":-20
    },
    "xAxis":{
      "type":"datetime",
      "dateTimeLabelFormats":{
        "month":"%e. %b",
        "year":"%b"
      },
      "labels":{
        "overflow":"justify"
      }
    },
    "yAxis":{
      "showFirstLabel":false,
      "gridLineColor":"#f5f5f5",
      "gridLineDashStyle":"Dash",
      "title":"",
      "min":0,
      "plotLines":[
        {
          "value":0,
          "width":1,
          "color":"#f5f5f5",
          "dashStyle":"Dash"
        }
      ],
      "labels":{
        "align":"left",
        "y":13,
        "x":1
      }
    },
    "plotOptions":{
      "area":{
        "fillColor":"#E6F3FB",
        "size":"100%"
      },
      "series":{
        "threshold":0,
        "negativeColor":"#1b94ad",
        "color":"#dc4276",
        "lineWidth":2,
        "shadow":false,
        "marker":{
          "lineWidth":0,
          "lineColor":"#dc4276",
          "enabled":true,
          "fillColor":"#dc4276"
        },
        "events":{

        }
      }
    },
    "tooltip":{
      "shared":true,
      "crosshairs":true,
      "borderColor":"#dc4276",
      "valueDecimals":0
    },
    "legend":{
      "onclick":null,
      "layout":"vertical",
      "align":"top",
      "verticalAlign":"top",
      "x":0,
      "y":0,
      "itemStyle":{
        "font":"18px/1.4 700 \"Gotham Rounded A\", \"Gotham Rounded B\", \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        "color":"#000",
        "fontWeight":"700",
        "width":350
      },
      "borderWidth":0
    },
    "series":[
      {
        "name":"Visits",
        "data":[
          [
            1542585600000,
            14866
          ],
          [
            1542672000000,
            10593
          ],
          [
            1545177600000,
            11274
          ]
        ]
      }
    ]
  });
  const response = await handle.graph(event, null);
  expect(response.statusCode).toEqual(200);
  expect(response.headers['Content-Type']).toEqual('image/png');
  expect(response.body).toMatchSnapshot();
  done();
});

test("that an empty ok is returned for a blank request", async (done) => {
  const event = buildEvent({});
  const response = await handle.graph(event, null);
  expect(response.statusCode).toEqual(200);
  expect(response.headers['Content-Type']).toEqual('image/png');
  expect(response.body).toMatchSnapshot();
  done();
});

test("that a bad request is returned for an invalid request", async (done) => {
  const event = buildEvent(undefined);
  const response = await handle.graph(event, null);
  expect(response.statusCode).toEqual(400);
  expect(response.headers['Content-Type']).toEqual('text/plain');
  expect(response.body).toMatchSnapshot();
  done();
});
