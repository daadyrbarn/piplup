const Discord = require('discord.js');
const client = new Discord.client();

module.exports = {
	name: 'hug',
	description: 'Want a hug?',
	args: true,
	execute(message, args) {
		const hugger = message.author;
		const huggee = args[0];
		const userID = client.users.find(user => user.username == huggee).id;

		if (huggee === 'me') {
			message.react('🤗');
		}
		else {
			message.channel.send(`${hugger} wants you to have a hug @${userID} :hugging:`);
		}
	},
};
