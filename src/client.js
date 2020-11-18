const { AkairoClient, CommandHandler } = require('discord-akairo');

class PxOClient extends AkairoClient {
	constructor() {
		super({
			ownerID: __config.ownerID
		}, {
			disableMentions: 'everyone'
		});

		this.commandHandler = new CommandHandler(this, {
			directory: __basedir + '/src/commands',
			prefix: __config.prefix,
			defaultCooldown: 2500
		});

		this.commandHandler.loadAll();
	}
}

module.exports = { PxOClient };