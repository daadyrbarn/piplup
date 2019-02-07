const Discord = require('discord.js');

module.exports = {
	name: 'rank-old',
	description: 'Query the scoreboard.',
	args: true,
	execute(message, args) {

		const fs = require('fs');
		const readline = require('readline');
		const { google } = require('googleapis');

		// If modifying these scopes, delete token.json.
		const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
		// The file token.json stores the user's access and refresh tokens, and is
		// created automatically when the authorization flow completes for the first
		// time.
		const TOKEN_PATH = 'token.json';

		// Here are all the initial constants.
		const season = 'indigo';
		const division = '';
		const trainer = 'daadyrbarn';
		const johtoID = '1EkZL4tGPxCgSG7-NfzLH0DtYaO6axSKeD_qNiFbSNIA';
		const archiveID = '19DW4OaF34Hx853i6dqoOlXoM9CUx7r65ZuYl3Jy4Wcc';
		const prevSeasons = ['indigo', 'orange'];
		const allDivisions = [['div1', 'div2', 'div3'], ['coral', 'jade', 'sea', 'cake']];

		// Column ranges for all bosses.
		// boss N of season M is in the range: allBosses[M][N]
		const allBosses = [[['E', 'H'], ['I', 'L'], ['M', 'P'], ['Q', 'T'], ['U', 'X'], ['Y', 'AB'], ['AC', 'AF'], ['AG', 'AJ'], ['AK', 'AN']], [['E', 'H'], ['I', 'L'], ['M', 'P'], ['Q', 'S'], ['T', 'W'], ['X', 'AA']], [['E', 'H'], ['I', 'L'], ['M', 'P'], ['Q', 'T'], ['U', 'X'], ['Y', 'AB']]];

		let activeID = '';
		let activeSheet = '';
		let fullRange = '';

		if (prevSeasons.includes(season)) {
			activeID = archiveID;
			// Use regex to capitalize the first letter and set the active sheet.
			activeSheet = season.replace(/^\w/, c => c.toUpperCase());
			console.log(activeSheet);

			if (season == 'indigo') {
				fullRange = 'A1:AN33';
			}
			else {
				fullRange = 'A1:AA43';
			}
			console.log(`${activeSheet} => ${fullRange}`);
		}
		else {
			activeID = johtoID;
			activeSheet = 'Pointtavle';
			// CHANGE THIS WHEN SEASON STARTS!!!
			fullRange = 'A1:AA45';
			console.log(fullRange);
		}

		// Define a vlookup function.
		function vlookup(data, index, value) {
			for (i = 0; i < data.length; i++) {
				if (data[i][0] == value) {
					return data[i][index];
				}
			}
		}



		// Load client secrets from a local file.
		fs.readFile('credentials.json', (err, content) => {
			if (err) return console.log('Error loading client secret file:', err);
			// Authorize a client with credentials, then call the Google Sheets API.
			// Add if-statements to react to different arguments.
			if (division == 'coral') {
				authorize(JSON.parse(content), listCoral);
			}
			else if (division == 'daadyrbarn') {
				authorize(JSON.parse(content), listMe);
			}
			else {
				authorize(JSON.parse(content), listMe);
			}
		});

		/**
		 * Create an OAuth2 client with the given credentials, and then execute the
		 * given callback function.
		 * @param {Object} credentials The authorization client credentials.
		 * @param {function} callback The callback to call with the authorized client.
		 */
		function authorize(credentials, callback) {
			const { client_secret, client_id, redirect_uris } = credentials.installed;
			const oAuth2Client = new google.auth.OAuth2(
				client_id, client_secret, redirect_uris[0]);

			// Check if we have previously stored a token.
			fs.readFile(TOKEN_PATH, (err, token) => {
				if (err) return getNewToken(oAuth2Client, callback);
				oAuth2Client.setCredentials(JSON.parse(token));
				callback(oAuth2Client);
			});
		}

		/**
		 * Get and store new token after prompting for user authorization, and then
		 * execute the given callback with the authorized OAuth2 client.
		 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
		 * @param {getEventsCallback} callback The callback for the authorized client.
		 */
		function getNewToken(oAuth2Client, callback) {
			const authUrl = oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: SCOPES,
			});
			console.log('Authorize this app by visiting this url:', authUrl);
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});
			rl.question('Enter the code from that page here: ', (code) => {
				rl.close();
				oAuth2Client.getToken(code, (err, token) => {
					if (err) return console.error('Error while trying to retrieve access token', err);
					oAuth2Client.setCredentials(token);
					// Store the token to disk for later program executions
					fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
						if (err) console.error(err);
						console.log('Token stored to', TOKEN_PATH);
					});
					callback(oAuth2Client);
				});
			});
		}

		/**
		 * This function returns the name, rank, and score of the trainers in Coral Eye.
		 * This is the basic format that should be used when reading a range from the
		 * spreadsheet. if-statements should be written at the top of the file to decide
		 * which of these functions is called, based on the arguments given with the command.
		 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
		 */
		function listCoral(auth) {
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId: activeID,
				range: `${activeSheet}!A7:D13`,
			}, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					console.log('Name, Rank, Score:');
					console.log(rows);
					// Print columns A and E, which correspond to indices 0 and 4.
					rows.map((row) => {
						console.log(`${row[0]}\t${row[1]}\t${row[2]}`);
					});
				}
				else {
					console.log('No data found.');
				}
			});
		}

		function listMe(auth) {
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId: activeID,
				range: `${activeSheet}!${fullRange}`,
			}, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					console.log('Name, Rank, Score:');
					let line = [];
					let i = 0;
					for (i; i < rows.length; i++) {
						const row = rows[i];
						if (row[0] == trainer) break;
					}
					line = rows[i];
					console.log(`${line[0]}\t${line[1]}\t${line[2]}`);
					// const name = rows[i][0];
					// console.log(name.toLowerCase());
				}
				else {
					console.log('No data found.');
				}
			});
		}
	},
};
