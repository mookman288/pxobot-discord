const { Command } = require('discord-akairo');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
		});
	}

	exec(message) {
		const commands = {
			'8ball': 'Provides an answer to your most sought after questions.',
			'activity <date-ish>': 'Lists the users who have been inactive since the date supplied in a private message.',
			'author': 'Provides information about who created this bot.',
			'goodbot': 'Praise me! If you want to reach out to, or maybe tip, my creator, use the `author` command.',
			'help': 'Lists all of the commands available in a private message.',
			'ping <message>': 'Tests whether the bot is functioning.',
			'roll <number>d<number>(+ modifier)': 'Simple dice roller.'
		}
		let fields = [];

		for (const [command, description] of Object.entries(commands)) {
			fields.push({
				name: '`' + __config.prefix + command + '`',
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