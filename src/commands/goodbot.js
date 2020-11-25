const { Command } = require('discord-akairo');

class AuthorCommand extends Command {
	constructor() {
		super('goodbot', {
			aliases: ['goodbot'],
		});
	}

	exec(message) {
		return message.reply("Thank you for the high praise! If you want to contact my creator, use the `author` command.");
	}
}

module.exports = AuthorCommand;