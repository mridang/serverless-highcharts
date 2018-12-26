# serverless-highcharts

Generates charts using and embedded highcharts server.

##### Caching

All the responses are cached for a day and varied by the `Accept-Encoding` and the `Origin`.

##### CORS

CORS is enabled by default for all endpoints and allows any origin i.e. `*`

## Getting started

Ensure you have `node` and either `npm` or `yarn` installed globally. Serverless requires Node 8.10.0.

------

##### NVM

If you are using a different version of Node, we recommend using `nvm` to run different versions. Set up the correct Node environment bar running `nvm use`. This will automatically read the contained `.nvmrc` file and set the appropriate version.

------

Run `yarn install`to fetch all  the dependencies and once done, run `yarn serve` to start a local server at `http://localhost:3000`. 

## Deployment

Highcharts allows deployment to AWS Lambda with a single command. Run `sls deploy --stage [STAGE]` to deploy the function. 

**Note:** If the `--stage` parameter is not specified, Serverless will default to `dev`.

**Note:** The `NODE_ENV` variable is always forced to be `production` irrespective of whether the service is running offline or in the cloud. This is so that the Highcharts service will run in production mode. 

This will trigger output that looks something like:

```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (57.17 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: highcharts
stage: production
region: us-west-2
stack: highcharts-production
api keys:
  None
endpoints:
  GET - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/production/polyfill
functions:
  graph: highcharts-production-graph
```

## Usage

The service requires a POST request with a entire JSON payload as the body. If the JSON is malformed, a 400 Bad Request will be returned. If the JSON is well formed but incompatible with the Highcharts params, a 500 Server Error will be returned.

##### HTML

View the source of the included `debug.html` file to see how to make requests against the Highcarts server and embed the resultant image on a page.

##### cURL

```shell
curl -o m1.png -v -X POST http://localhost:3000/ \
    -d @- << EOF
{
  "type":"png",
  "callback":"function(chart) {chart.yAxis[0].update({ labels: { enabled: true, formatter: function() { return this.value + '%' } }}); }",
  "options":{
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
        "name":"Woogasfaa",
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
            1542758400000,
            12957
          ],
          [
            1542844800000,
            10026
          ],
          [
            1542931200000,
            18351
          ],
          [
            1543017600000,
            13230
          ],
          [
            1543104000000,
            14350
          ],
          [
            1543190400000,
            13720
          ],
          [
            1543276800000,
            12631
          ],
          [
            1543363200000,
            9426
          ],
          [
            1543449600000,
            7399
          ],
          [
            1543536000000,
            11346
          ],
          [
            1543622400000,
            7579
          ],
          [
            1543708800000,
            14691
          ],
          [
            1543795200000,
            9133
          ],
          [
            1543881600000,
            11180
          ],
          [
            1543968000000,
            8622
          ],
          [
            1544054400000,
            6953
          ],
          [
            1544140800000,
            11621
          ],
          [
            1544227200000,
            7900
          ],
          [
            1544313600000,
            10967
          ],
          [
            1544400000000,
            8809
          ],
          [
            1544486400000,
            11385
          ],
          [
            1544572800000,
            8127
          ],
          [
            1544659200000,
            7186
          ]
        ]
      }
    ]
  }
}
EOF
```

## Linting

This service uses Prettier to format and lint it's sources. Run `yarn build` to prettify all the sources.

## Testing

Serverless uses Jest for testing. Run the entire test suite by executing `yarn test`. 