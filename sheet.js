const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'sheet',
	description: 'Give a link to the spreadsheets!',
	args: true,
	execute(message, args) {
		const indigoEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor('Piplup', 'https://vignette.wikia.nocookie.net/pkmnshuffle/images/1/11/Piplup.png')
			.addField('Pip!', 'Here ya go! [Indigo League Leaderboard](https://docs.google.com/spreadsheets/d/1IfDET4jUZE5lPigO_dLKRaBADyVNiRQ0DjZ_B9Qwyo0)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet to see the current season leaderboard.`);

		const orangeEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setAuthor('Piplup', 'https://vignette.wikia.nocookie.net/pkmnshuffle/images/1/11/Piplup.png')
			.addField('Pip!', 'Here ya go! [Orange League Leaderboard](https://docs.google.com/spreadsheets/d/17FKNfuy6Lm1gf5iTTHEEst3zorAD0Obkbvfw-pUM41E)', true)
			.setTimestamp()
			.setFooter(`Use ${prefix}sheet [season name] to get a link for previous season leaderboards.`);

		if (args[0] === 'indigo') {
			message.channel.send(indigoEmbed);
		}
		else {
			message.channel.send(orangeEmbed);
		}
	},
};
