const request = require('request');
const _ = require('underscore');
const Discord = require('discord.js');
const { prefix } = require('../config.json');
const data_url = 'http://localhost:5000/api?id=1EkZL4tGPxCgSG7-NfzLH0DtYaO6axSKeD_qNiFbSNIA&sheet=1';

module.exports = {
	name: 'team',
	description: 'List the team of a given trainer!',
	args: true,
	aliases: ['t'],

	execute(message, args) {
		// Tested the first conditional and it seems to work!
		if (args[0] == 'has') {
			args.splice(0, 1);
			if (!args.length) return;
			let pokemon;
			if (args.length == 1) {
				pokemon = args[0];
			}
			else if (args.length > 1) {
				pokemon = args.join(' ');
			}

			// Something here doesn't work :(
			request.get(data_url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log('JSON loaded...');
					const data = JSON.parse(body);
					let trainers = [];
					let i;
					for (i; i < data.rows.length; i++) {
						const datarow = data.rows[i];
						console.log(datarow);
						if (datarow.includes(pokemon)) trainers += datarow[0];
					}

					if (trainers.length) {
						const trainerEmbed = new Discord.RichEmbed()
							.setColor('#0099ff')
							.addField('Pip! Found it!', `The trainers with **${pokemon}** in their teams are:\n${trainers.join('\n')}`)
							.setTimestamp()
							.setFooter(`Use ${prefix}team has [pokemon] to see who drafted a specific pokemon.`);

						message.channel.send(trainerEmbed);
					}
					else {
						message.channel.send(`Pip? I couldn't find a trainer with **${pokemon}** in their current team.`);
					}
				}
				else {
					message.channel.send('Piiiip! Something went wrong! Help, @daadyrbarn#9450!');
					console.log(error);
					console.log(response.statusCode);
				}
			});
		}
		else {
			let trainer;
			if(args[0]) {
				trainer = args[0].toLowerCase();
			}
			else {
				trainer = message.author.username.toLowerCase();
			}

			request.get(data_url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					//	console.log('Fetched JSON successfully!');
					//	console.log(response.statusCode);
					const data = JSON.parse(body);
					let trainer_found;
					const trainer_list = data.columns.trainer;
					// console.log(trainer_list);
					for (const n in trainer_list) {
					//	console.log(trainer_list[n]);
						const t_lower = trainer_list[n].toLowerCase();
						// console.log(t_lower);
						if (t_lower == trainer) {
							trainer_found = trainer_list[n];
						}
					}
					if (trainer_list.includes(trainer_found)) {
						const trainer_data = _.where(data.rows, { trainer: trainer_found });
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
							.addField('Pip! I know that!', `**${trainer_found}**'s team is:\n${teamlist.join('\n')}`)
							.setTimestamp()
							.setFooter(`Use ${prefix}team [trainer] to see another trainer's draft team.`);

						message.channel.send(teamEmbed);
					}
					else {
						message.channel.send(`Pip? I couldn't find a trainer with the name **${trainer}** in the current season.`);
					}
				}
				else {
					message.channel.send('Something went wrong! Help, @daadyrbarn#9450!');
					console.log(error);
					console.log(response.statusCode);
				}
			});
		}
	},
};
