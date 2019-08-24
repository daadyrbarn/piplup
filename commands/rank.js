const Discord = require('discord.js');
const { prefix, data_url } = require('../config.json');
const request = require('request');
const _ = require('lodash');
const us = require('underscore');

module.exports = {
	name: 'rank',
	description: 'List the rank of a given trainer!',
	args: true,
	aliases: ['r'],

	execute(message, args) {

		// console.log(data_url);
		if (args[0]) {
			request.get(data_url, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					const data = JSON.parse(body);

					let division_found;
					const division_arg = args[0];

					const division_list = _.uniq(data.columns.division);
					for (const d in division_list) {
						const d_lower = division_list[d].toLowerCase();
						if (d_lower == division_arg) {
							division_found = division_list[d];
						}
					}

					// console.log(division_found);

					if (division_list.includes(division_found)) {
						const division_data = us.where(data.rows, { division: division_found });
						// console.log(division_data);
						const trainer_list = [];
						for (const t in division_data) {
							trainer_list.push(division_data[t].trainer);
						}
						// console.log(trainer_list);
						const rank_list = [];
						for (const r in division_data) {
							rank_list.push(division_data[r].rank);
						}
						// console.log(rank_list);
						const score_list = [];
						for (const s in division_data) {
							score_list.push(division_data[s].scoretotal);
						}
						// console.log(score_list);
						const ranks = _.zip(rank_list, trainer_list, score_list);
						const sorted_ranks = ranks.sort(function(a, b) {
							return a[0] - b[0];
						});
						// console.log(sorted_ranks);
						// så langt så godt!
						const rank_output = [];
						const score_output = [];
						for (let i = 0; i < sorted_ranks.length; i++) {
							rank_output.push(`${sorted_ranks[i][0]} | ${sorted_ranks[i][1]}\t|\t${sorted_ranks[i][2]}`);
							// score_output.push(`${sorted_ranks[i][2]}`);
						}

						const rankEmbed = new Discord.RichEmbed()
							.setTitle('Sinnoh League scoreboard')
							.setURL('https://docs.google.com/spreadsheets/d/1tDVFpMYSbPpXahlNo4QXyrkvj0KN1rB8uQ9E55TS19E')
							.setColor('#0099ff')
							.setTimestamp()
							.setFooter(`Use ${prefix}rank [division] to see the rankings in a different division.`)
							.addField('Rank | Trainer | Score', `\`\`\`${rank_output.join('\n')}\`\`\``);
							// .addField('Score', `${score_output.join('\n')}`, true);

						message.channel.send(`Pip! <@${message.author.id}> here are the rankings for **${_.startCase(division_found.toLowerCase())}** division!`, rankEmbed);
					}
				}
				else {console.log(error);}
			});
		}
		else {
			message.channel.send('Pip? You need to include the name of a division.');
		}
	},
};
