const { Command } = require('discord-akairo');

class AuthorCommand extends Command {
	constructor() {
		super('author', {
			aliases: ['author'],
		});
	}

	exec(message) {
		return message.channel.send('Hello! I was created by: https://www.pxoink.net/');
	}
}

module.exports = AuthorCommand;