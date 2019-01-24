const Discord = require('discord.js');

module.exports = {
	name: 'draft',
	description: 'Info about next draft!',
	execute(message, args) {
		const info = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip pip!', 'Drafting for Johto League is over! Good luck with the raids!')
			.addField('Teams', 'You can use ?team [trainer] to see people\'s draft teams.');
		message.channel.send(info);
	},
};
