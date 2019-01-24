const request = require('request');
const _ = require('underscore');

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

		const url = 'http://gsx2json.com/api?id=1EkZL4tGPxCgSG7-NfzLH0DtYaO6axSKeD_qNiFbSNIA&sheet=1';
		const data = request.get(url, function(error, response, body) {
			if (!error && response.statuscode == 200) {
				const d = JSON.parse(body);
				return d;
			}
		});

		if (data.columns[0].includes(trainer)) {
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

			message.channel.send(teamlist);
		}
		else {
			message.channel.send(`No trainer found with the name ${trainer}`);
		}
	},
};
