const request = require('request');
const _ = require('underscore');
const lo = require('lodash');
const Discord = require('discord.js');
const { prefix } = require('../config.json');
const data_url = 'http://localhost:5000/api?id=1tDVFpMYSbPpXahlNo4QXyrkvj0KN1rB8uQ9E55TS19E&sheet=1';

module.exports = {
	name: 'team',
	description: 'List the team of a given trainer!',
	args: true,
	aliases: ['t'],

	execute(message, args) {
		// Find teams that have a specific pokemon.
		// Tested the first conditional and it seems to work!
		//
		// Check if first argument is 'has'
		if (args[0] == 'has') {
			// remove first argument
			args.splice(0, 1);
			// check if any arguments remain
			if (!args.length) return;
			// initiate empty variable to hold name of pokemon
			let pokemon;
			// check if pokemon name is 1 word
			if (args.length == 1) {
				// set pokemon variable to = argument
				pokemon = args[0];
			}
			// check if argument is moire than 1 word
			else if (args.length > 1) {
				// join multiple words into a string
				pokemon = args.join(' ');
			}

			// Something here doesn't work :(
			// load data as JSON object via gsx2json
			request.get(data_url, function(error, response, body) {
				// check if data is loaded correctly
				if (!error && response.statusCode == 200) {
					// log confirmation
					console.log('JSON loaded...');
					// load data into variable
					const data = JSON.parse(body);
					// create list to hold trainers with the pokemon in their team
					const trainers = [];
					// loop trhough the rows in data
					for (let i = 0; i < data.rows.length; i++) {
						// create variable for the current row
						const datarow = data.rows[i];
						// create empty list to hold the picks
						const picks = [];
						// loop through the datarow and add all picks to the list
						for (let j = 1; j < 11; j++) {
							const pick = 'pick' + j;
							picks.push(datarow[pick]);
						}
						// if the list includes pokemon add trainer name to trainers list
						if (picks.includes(lo.startCase(pokemon))) trainers.push(datarow['trainer']);
					}
					console.log(trainers);
					// create embed
					if (trainers.length) {
						const trainerEmbed = new Discord.RichEmbed()
							.setColor('#0099ff')
							.addField('Pip! Found it!', `The trainers with **${lo.startCase(pokemon)}** in their teams are:\n${trainers.join('\n')}`)
							.setTimestamp()
							.setFooter(`Use ${prefix}team has [pokemon] to see who drafted a specific pokemon.`);

						message.channel.send(trainerEmbed);
					}
					else {
						message.channel.send(`Pip? I couldn't find a trainer with **${pokemon}** in their current team.`);
					}
				}
				else {
					message.channel.send('Piiiip! Something went wrong! Help, @daadyrbarn#8000!');
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
						const div_name = trainer_data[0].division;
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
							.addField('Pip! I know that!', `**${trainer_found}**'s ${div_name} division team is:\n${teamlist.join('\n')}`)
							.setTimestamp()
							.setFooter(`Use ${prefix}team [trainer] to see another trainer's draft team.`);

						message.channel.send(teamEmbed);
					}
					else {
						message.channel.send(`Pip? I couldn't find a trainer with the name **${trainer}** in the current season.`);
					}
				}
				else {
					message.channel.send('Something went wrong! Help, @daadyrbarn#8000!');
					console.log(error);
					console.log(response.statusCode);
				}
			});
		}
	},
};
