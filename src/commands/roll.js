const { Command } = require('discord-akairo');

class Role extends Command {
	constructor() {
		super('roll', {
			aliases: ['roll'],
		});
	}

	exec(message) {
		let textRoll = message.content.slice(__config.prefix.length).trim().split(' ').slice(1).join(' ');
		let roll = 0;
		let addition = 0;
		let subtraction = 0;

		textRoll = (!textRoll) ? '1d20' : textRoll;

		const args = textRoll.split('d');
		const multiplier = args[0];
		const leftHand = args[1].split('+');

		if (typeof leftHand[1] !== 'undefined') {
			roll = leftHand[0];
			addition = leftHand[1];
		} else {
			const rightHand = leftHand[0].split('-');
			roll = rightHand[0];

			if (typeof rightHand[1] !== 'undefined') {
				subtraction = rightHand[1];
			}
		}

		const rollValue = Math.floor(Math.random() * ((roll - 1) + 1)) + 1;
		const subValue = (!multiplier) ? rollValue : Math.floor(multiplier * rollValue);
		const totalValue = parseInt(subValue) + parseInt(addition) - parseInt(subtraction);

		if (typeof totalValue !== 'undefined') {
			let fields = [
				{
					name: 'Roll Value',
					value: totalValue
				}
			];

			if (totalValue != rollValue) {
				fields.push({
					name: 'Dice Roll (1..' + roll + ')',
					value: rollValue
				});
			}

			if (multiplier && multiplier != 1) {
				fields.push({
					name: 'Multiplier (' + multiplier + ')',
					value: subValue
				})
			}

			if (addition && !subtraction) {
				fields.push({
					name: 'Add (' + addition + ')',
					value: parseInt(subValue) + parseInt(addition)
				})
			} else if (subtraction && !addition) {
				fields.push({
					name: 'Subtract (' + subtraction + ')',
					value: parseInt(subValue) - parseInt(subtraction)
				})
			} else if (addition & subtraction) {
				fields.push({
					name: 'Add and Subtract (+ ' + addition + ' - ' + subtraction + ')',
					value: parseInt(subValue) + parseInt(addition) - parseInt(subtraction)
				})
			}

			message.reply({
				embed: {
					color: 3447003,
					title: textRoll,
					fields: fields
				}
			});
		} else {
			return message.reply("I can't understand you.");
		}
	}
}

module.exports = Role;