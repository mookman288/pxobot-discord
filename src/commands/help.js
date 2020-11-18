const { Command } = require('discord-akairo');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
		});
	}

	exec(message) {
		const commands = {
			'activity <date>': 'Lists the users who have been inactive since the date supplied in a private message.',
			'author': 'Provides information about who created this bot.',
			'help': 'Lists all of the commands available in a private message.',
			'ping <message>': 'Tests whether the bot is functioning.'
		}
		let fields = [];

		for (const [command, description] of Object.entries(commands)) {
			fields.push({
				name: '`' + command + '`',
				value: description
			});
		}

		return message.author.send({
			embed: {
				color: 3447003,
				title: 'Commands:',
				fields: fields
			}
		});
	}
}

module.exports = HelpCommand;