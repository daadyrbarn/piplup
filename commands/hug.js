const Discord = require('discord.js');
const guild = Discord.Guild;


module.exports = {
	name: 'hug',
	description: 'Want a hug?',
	args: true,
	execute(message, args) {
		const hugger = message.author;
		const huggee = args[0];
		guild.Fetchmembers(huggee)
			.then(console.log)
			.catch(console.error);

		if (huggee === 'me') {
			message.react('🤗');
		}
		else {
			message.channel.send(`${hugger} wants you to have a hug @${huggee} :hugging:`);
		}
	},
};
