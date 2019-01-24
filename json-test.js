const request = require('request');
const _ = require('underscore');
const arg0 = 'daadyrbarn';
const arg1 = 'LillaTopper';
const arg2 = 'me';

request.get('http://gsx2json.com/api?id=1EkZL4tGPxCgSG7-NfzLH0DtYaO6axSKeD_qNiFbSNIA&sheet=1', function(error, response, body) {
	if (!error && response.statusCode == 200) {
		const data = JSON.parse(body);
		if(arg0) {
			const trainer_data = _.where(data.rows, { trainer: arg0 });
			const first_pick = trainer_data[0].trainer;
			console.log(first_pick);
		}
		else {console.log('Error');}
	}
});
