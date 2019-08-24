const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'rules',
	description: 'Give a link to the rules!',
	args: true,
	aliases: ['regler', 'r'],

	execute(message, args) {
		const danEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Jeg tale god dansk! [Pokedraft Regler](https://docs.google.com/document/d/e/2PACX-1vQExQk6I9o8josav1W_A4GO1DONHSY3xv6m63cqM7QQRLDijE-JwZkUmvK7fuutLar4yFNF4qMW8dMg/pub)', true)
			.setTimestamp()
			.setFooter(`Use [${prefix}rules eng] to see the rules in English.`);

		const engEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Pokedraft Rules in English](https://docs.google.com/document/d/e/2PACX-1vRidum6ZeZ7DCtqzQH2b1VqqxaOT5p4Z5ge7Xva2Ats5tUpZbh1bXmO9eLCzFdgJ2ZCwx8_Z-efXo5Q/pub)', true)
			.setTimestamp()
			.setFooter(`Use [${prefix}regler] to see the rules in Danish.`);

		if (args[0] === 'eng') {
			message.channel.send(engEmbed);
		}
		else {
			message.channel.send(danEmbed);
		}
	},
};
