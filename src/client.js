const { AkairoClient, CommandHandler } = require('discord-akairo');

class PxOClient extends AkairoClient {
	constructor() {
		super({
			ownerID: ''
		}, {
			disableMentions: 'everyone'
		});

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__basedir, '/src/commands'),
			prefix: __config.prefix
		});

		this.commandHandler.loadAll();
	}
}

module.exports = { PxOClient };