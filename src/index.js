const debug = require('debug')('api:index');

const { promisify } = require('util');
const { Server } = require('./bin');

const serverListen = promisify(Server.listen.bind(Server));

const production = !(process.env.NODE_ENV === 'production');

const { SERVER_PORT } = process.env;

(async () => {
  try {
    await serverListen(SERVER_PORT);

    const { address, port } = Server.address();

    // eslint-disable-next-line no-console
    console.log(`Server: ${address}:${port}, development: ${production}`);

    debug(`Server ${address}:${port}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error happened during server start', err);
    process.exit(1);
  }
})();
