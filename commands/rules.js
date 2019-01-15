const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'rules',
	description: 'Give a link to the rules!',
	args: true,
	aliases: ['regler'],

	execute(message, args) {
		const danEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Pokedraft Regler](https://docs.google.com/document/d/e/2PACX-1vRQkzGRrCeuzmClkEzFYWCalRGtQOegKWxa3ybFme9hYTJIlOKGwF_fzMIFhgOsy4hwQpnsX1sIYoRM/pub)', true)
			.setTimestamp()
			.setFooter(`Use [${prefix}rules eng] to see the rules in English.`);

		const engEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Pokedraft Rules](https://docs.google.com/document/d/e/2PACX-1vQd_K7DIpe6gco0Ft75ujHxzIbFf9iJtoYI9qsW_L3UmYllgmX2ndZYhGmBwmLerJFBgxTU0F58wUdj/pub)', true)
			.setTimestamp()
			.setFooter(`Use [${prefix}regler] to see the rules in Danish.`);

		if (args[0] === 'eng' || 'english') {
			message.channel.send(engEmbed);
		}
		else {
			message.channel.send(danEmbed);
		}
	},
};
