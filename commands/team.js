const request = require('request');
const _ = require('underscore');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'team',
	description: 'List the team of a given trainer!',
	args: true,
	aliases: ['t'],

	execute(message, args) {
		let trainer;
		if(args[0]) {
			trainer = args[0];
		}
		else {
			trainer = message.author.username;
		}

		request.get('http://gsx2json.com/api?id=1EkZL4tGPxCgSG7-NfzLH0DtYaO6axSKeD_qNiFbSNIA&sheet=1', function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('Fetched JSON successfully!');
				console.log(response.statusCode);
				const data = JSON.parse(body);
				if (data.columns.trainer.includes(trainer)) {
					const trainer_data = _.where(data.rows, { trainer: trainer });
					const teamlist = [];
					teamlist.push(trainer_data[0].pick1);
					teamlist.push(trainer_data[0].pick2);
					teamlist.push(trainer_data[0].pick3);
					teamlist.push(trainer_data[0].pick4);
					teamlist.push(trainer_data[0].pick5);
					teamlist.push(trainer_data[0].pick6);
					teamlist.push(trainer_data[0].pick7);
					teamlist.push(trainer_data[0].pick8);
					teamlist.push(trainer_data[0].pick9);
					teamlist.push(trainer_data[0].pick10);

					const teamEmbed = new Discord.RichEmbed()
						.setColor('#0099ff')
						.addField('Pip! I know that!', `**${trainer}**'s team is:\n${teamlist.join('\n')}`)
						.setTimestamp()
						.setFooter(`Use ${prefix}team [trainer] to see another trainer's draft team.`);

					message.channel.send(teamEmbed);
				}
				else {
					message.channel.send(`Pip? I couldn't find a trainer with the name **${trainer}** in the current season.`);
				}
			}
			else {
				message.channel.send('Something went wrong! Help, @daadyrbarn!');
				console.log(error);
				console.log(response.statusCode);
			}
		});
	},
};
