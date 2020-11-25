const { Command } = require('discord-akairo');
const Sugar = require('sugar');
let error = false;

class ActivityCommand extends Command {
	constructor() {
		super('activity', {
			aliases: ['activity'],
		});
	}

	exec(message) {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send('You do not have permissions to use this command.');
		}

		const args = message.content.slice(__config.prefix.length).trim().split(' ').slice(1).join(' ');
		const dateFrom = (args.length > 0) ? new Sugar.Date(args) : null;
		let fields = [];

		if (args.length < 1 && !dateFrom) {
			return message.channel.send('You must include an upper date limit on activity.');
		} else {
			const server = message.guild.id;
			const channels = this.client.guilds.cache.get(server).channels.cache;
			const users = this.client.guilds.cache.get(server).members.cache;
			const total = channels.length + users.length;
			let count = 0;

			//https://stackoverflow.com/a/57190304/1617361
			let search = (channel, user, before) => {
				if (error) return;

				const limit = 50;
				const options = {
					limit: 50
				};

				if (before) {
					options.before = before;
				}

				channel.messages.fetch(options).then((messages) => {
					if (messages.size !== 0) {
						const messageDate = new Sugar.Date(messages.first().createdAt);

						if (dateFrom.isAfter(messageDate)) {
							messages.find((msg) => {
								if (msg.author.id === user.id) {
									user.__lastMessage = {
										id: search.id,
										createdAt: new Sugar.Date(msg.createdAt).full()
									};

									message.author.send({
										embed: {
											color: 3447003,
											title: 'Activity Search - ' + Math.floor((count / total) * 100) + '% Complete',
											fields: {
												name: user.username,
												value: user.__lastMessage.createdAt
											}
										}
									});
								} else {
									search(channel, user, messages.last().id);
								}
							});
						}
					}
				}).catch((err) => {
					console.log(err);

					error = true;

					return message.reply('There was an error when I attempted to search past messages.');
				});
			};

			message.channel.send("Let me fetch that for you. I'll message you when I'm done.");

			channels.forEach((channel) => {
				count++;
				if (channel.type === 'text') {
					users.forEach((user) => {
						count++;
						search(channel, user, (typeof search !== 'undefined') ? search.id : null);
					});
				}
			});
		}
	}
}

module.exports = ActivityCommand;