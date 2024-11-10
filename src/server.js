const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const startServer = async () => {
  const app = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  app.route(routes);
  await app.start();
};

process.on('unhandledRejection', () => {
  process.exit(1);
});

startServer();
