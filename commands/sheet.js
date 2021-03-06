const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'sheet',
	description: 'Give a link to the spreadsheets!',
	args: true,
	execute(message, args) {
		const indigoEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Indigo League Leaderboard](https://docs.google.com/spreadsheets/d/1IfDET4jUZE5lPigO_dLKRaBADyVNiRQ0DjZ_B9Qwyo0)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet to see the current season leaderboard.`);

		const orangeEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Orange League Leaderboard](https://docs.google.com/spreadsheets/d/17FKNfuy6Lm1gf5iTTHEEst3zorAD0Obkbvfw-pUM41E)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet to see the current season leaderboard.`);

		const johtoEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Johto League Leaderboard](https://docs.google.com/spreadsheets/d/1EkZL4tGPxCgSG7-NfzLH0DtYaO6axSKeD_qNiFbSNIA)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet [season name] to get a link for previous season leaderboards.`);

		const hoennEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Hoenn League Leaderboard](https://docs.google.com/spreadsheets/d/1YI2EFMvXn4uCSejEds0zBmhSUz1ikJYs_NpLNLUuPyg)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet [season name] to get a link for previous season leaderboards.`);

		const sinnohEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Sinnoh League Leaderboard](https://docs.google.com/spreadsheets/d/1tDVFpMYSbPpXahlNo4QXyrkvj0KN1rB8uQ9E55TS19E)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet [season name] to get a link for previous season leaderboards.`);

		const unovaEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Unova League Leaderboard](https://docs.google.com/spreadsheets/d/1ZnuIjEIdYeRjPaBp1i76a3W9cuVuahswB-zbS0i-qYc)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet [season name] to get a link for previous season leaderboards.`);

		const kalosEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.addField('Pip!', 'Here ya go! [Kalos League Leaderboard](https://docs.google.com/spreadsheets/d/1HSGsI_6jnpuJMyMGyMZvXkv-IeiD_IGAX98P_A3lKIU)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet [season name] to get a link for previous season leaderboards.`);

		if (args[0] === 'indigo') {
			message.channel.send(indigoEmbed);
		}
		else if (args[0] == 'orange') {
			message.channel.send(orangeEmbed);
		}
		else if (args[0] == 'johto') {
			message.channel.send(johtoEmbed);
		}
		else if (args[0] == 'hoenn') {
			message.channel.send(hoennEmbed);
		}
		else if (args[0] == 'sinnoh') {
			message.channel.send(sinnohEmbed);
		}
		else if (args[0] == 'unova') {
			message.channel.send(unovaEmbed);
		}
		else {
			message.channel.send(kalosEmbed);
		}
	},
};
