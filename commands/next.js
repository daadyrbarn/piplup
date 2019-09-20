const Discord = require('discord.js');

module.exports = {
	name: 'next',
	description: 'Info about next season!',
	execute(message, args) {
		const date = new Date('October 1, 2019 23:59:59 GMT+01:00');
		const now = Date.now();
		const msLeft = date - now;
		const daysLeft = Math.floor(msLeft / (60 * 60 * 24 * 1000) + 1);
		const info = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip pip!', `Remember to sign up no later than October 1st! Only ${daysLeft} days left!\nIf you haven't already signed up, you can do it [here](https://forms.gle/HVqfrGtz1QQQw1YQA)!`);
		message.channel.send(info);
	},
};
