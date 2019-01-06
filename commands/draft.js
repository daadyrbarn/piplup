const Discord = require('discord.js');

module.exports = {
	name: 'draft',
	description: 'Info about next draft!',
	execute(message, args) {
		const info = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip pip!', 'Drafting for the next season\'s ranked divisions will take place Saturday 12/1 starting at 17:00.\n')
			.addField('Location', 'The draft will take place at Trine\'s house! Here\'s a handy link with [directions](https://www.google.com/maps/dir/?api=1&destination=Hans+Broges+Gade+43,+8000+Aarhus)!');
		message.channel.send(info);
	},
};
