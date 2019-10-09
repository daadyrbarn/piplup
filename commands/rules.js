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
			.addField('Pip!', 'Jeg tale god dansk! [Pokedraft Regler](https://docs.google.com/document/d/e/2PACX-1vRs_hRjSfeFtLYZhfzEHB8_xGxttjdq4Rfg8T7suLSMIJO_96BHiVpGDZOXtKm7U_8ckW0FVZjpt9Ni/pub)', true)
			.setTimestamp()
			.setFooter(`Use [${prefix}rules eng] to see the rules in English.`);

		const engEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Pokedraft Rules in English](https://docs.google.com/document/d/e/2PACX-1vTIiqiM5Ylus58Gro2vhZshSvrGHF-GYkawpvYEAJBYKrdOylsgSBQ2sKoYLGZWjIVtqqF59TN_DWBZ/pub)', true)
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
