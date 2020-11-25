const { Command } = require('discord-akairo');

class EightBall extends Command {
	constructor() {
		super('8ball', {
			aliases: ['8ball'],
		});
	}

	exec(message) {
		const responses = [
			'It. Is. Certain.',
			'Sources say no.',
			'Not sure, ask again later?',
			'Decidedly so!',
			'Doubtful.',
			'You do not want to know.',
			'No doubt. Rock steady.',
			'No way!',
			'Maybe?',
			'Signs point to sure.',
			'You should not count on it.',
			'The response is hazy, concentrate harder and try again!',
			'Yes.',
			'No.',
			'Most likely...',
			'Not likely...',
			'If you are a good person, yes.',
			'Sure.'
		];

		var response = responses[Math.floor(Math.random() * responses.length)];

		return message.reply(response);
	}
}

module.exports = EightBall;