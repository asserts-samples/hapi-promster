// ./src/server.js
'use strict';

const Hapi = require('@hapi/hapi');
const filepaths = require('filepaths');
const hapiBoomDecorators = require('hapi-boom-decorators');
const { createPlugin } = require('@promster/hapi');

const config = require('../config');

async function createServer() {
  const server = await new Hapi.Server(config.server);

  await server.register(createPlugin({ options: config.promster }));
  await server.register([hapiBoomDecorators]);

  let routes = filepaths.getSync(__dirname + '/routes/');
  for (let route of routes) server.route(require(route));

  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(JSON.stringify(err));
  }

  return server;
}

module.exports = createServer;
