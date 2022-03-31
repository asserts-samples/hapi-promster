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
