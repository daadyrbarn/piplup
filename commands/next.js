const Discord = require('discord.js');

module.exports = {
	name: 'next',
	description: 'Info about next season!',
	execute(message, args) {
		const date = '2019-01-15';
		const countdown = date - Date.now();
		const info = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor('Piplup', 'https://vignette.wikia.nocookie.net/pkmnshuffle/images/1/11/Piplup.png')
			.addField('Pip pip!', `Next season starts in ${countdown} days!`)
			.addField('Pip pip!', 'If you haven\'t already signed up, you can do it [here](https://goo.gl/forms/rSn7n3byrdKRIPgq1)!')
			.setTimestamp();
		message.channel.send(info);
	},
};
