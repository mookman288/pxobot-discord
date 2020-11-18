global.__basedir = __dirname;
global.__config = require(__basedir + '/config.json');

const { PxOClient } = require(__basedir + '/src/client.js');

const client = new PxOClient();

client.login(__config.token).then(() => {
	console.log('Logged in and running.');
});