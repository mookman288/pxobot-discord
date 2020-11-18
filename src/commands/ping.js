const { Command } = require('discord-akairo');

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
		});
	}

	exec(message) {
		const args = message.content.slice(__config.prefix.length).trim().split(' ').slice(1);

		if (args.length < 1) {
			return message.reply("I'm here and standing by.");
		} else {
			return message.reply('"' + args.join(', ') + '"? Huh? What does that mean?');
		}
	}
}

module.exports = PingCommand;