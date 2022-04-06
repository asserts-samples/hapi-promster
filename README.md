# Hapi.dev Promster Sample App

## [Hapi.dev](https://hapi.dev/)
- Javascript Framework
## [Promster](https://github.com/tdeekens/promster)
- A Prometheus exporter for Hapi, express and Marble.js servers to automatically measure request timings

## Start example app
1. Install dependencies
```
npm install
```
2. Run hapi server
```
npm start
```
3. Check /metrics endpoint to get metrics: GET http://localhost:3030/metrics

## Adding Promster to Hapi project

1. Install dependencies:
```
npm i @promster/hapi prom-client --save
```

2. Register promster plugin:
```
const { createPlugin } = require('@promster/hapi');
await server.register(createPlugin());
```
3. Then add a new endpoint for collecting metrics:
```
const { getSummary, getContentType } = require('@promster/hapi');

async function response(req, h) {
    const summary = await getSummary();

    return h.response(summary).type(getContentType());
}

module.exports = {
  method: 'GET',
  path: '/metrics',
  options: {
    handler: response,
  },
};
```
