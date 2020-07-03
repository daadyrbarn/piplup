const Discord = require('discord.js');

module.exports = {
	name: 'code',
	description: 'Toilet code for Espresso House!',
	args: true,
	aliases: ['kode'],

	execute(message, args) {
		const msg = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip pip!', `The code to the toilet is still 1706. Have a nice poop, ${message.author.username}!`);
		message.channel.send(msg);
	},
};
