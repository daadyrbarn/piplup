const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'hug',
	description: 'Want a hug?',
	args: true,
	execute(message, args) {
		const hugger = message.author;
		const huggee = args[0];

		if (huggee === 'me') {
			message.react('🤗');
		}
		else {
			// const userID = client.users.find(user => user.username == huggee).id;
			message.channel.send(`${hugger} wants you to have a hug @${huggee} :hugging:`);
		}
	},
};
