const Discord = require('discord.js');

module.exports = {
	name: 'next',
	description: 'Info about next season!',
	execute(message, args) {
		const date = new Date('January 15, 2019 22:00:00 GMT+01:00');
		const now = Date.now();
		const msLeft = date - now;
		const daysLeft = Math.floor(msLeft / (60 * 60 * 24 * 1000) + 1);
		const info = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip pip!', `Next season starts in ${daysLeft} days!\nIf you haven't already signed up, you can do it [here](https://goo.gl/forms/rSn7n3byrdKRIPgq1)!`);
		message.channel.send(info);
	},
};
