// Main file for the bot

// import fs library to allow browsing the file-system
const fs = require('fs');
// import discord library
const Discord = require('discord.js');
// import prefix and discord token
const { prefix, token } = require('./config.json');
// initiate a client object from the Discord library
const client = new Discord.Client();
// create a collection to hold the commands
client.commands = new Discord.Collection();
// create another collection to manage cooldowns
const cooldowns = new Discord.Collection();
// create a list of all the command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// loop through the commands folder and add each file to the collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// initiate a ready check and log it to the console
client.once('ready', () => {
	console.log('Ready!');
});

// run the application and await a command in the form of a discord message
client.on('message', message => {
	// if the message does not start with the prefix or was sent by a bot, do nothing
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// slice away the prefix and split the command into arguments with <space> as separator
	const args = message.content.slice(prefix.length).split(/ +/);
	// shift the command to lower case
	const commandName = args.shift().toLowerCase();
	// not entirely sure how this works. apparently you can pass an array to a collection
	// and it will search for the items. also checks for aliases.
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	// if command is unknown, do nothing.
	if (!command) return;

	// if the command isn't already in the cooldowns collection, add it.
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	// get current time.
	const now = Date.now();
	// get the command object from the cooldowns collection.
	const timestamps = cooldowns.get(command.name);
	// get the specified cooldown time or default to 3 seconds.
	const cooldownAmount = (command.cooldown || 3) * 1000;

	// again not exactly sure of the mechanics, but this checks if the cooldown is
	// active and if so, prevents the command from running
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before re-using the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	console.log(`${message.author.username} ran ${message.content} in ${message.channel}.`);
	// attempts to execute the command. if there's an error, it is logged to the console
	// and the user is notified.
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

	// set "playing" text
	client.user.setActivity('Hello Kitty Island Adventure');
});
// logs the client in. apparently this is done at the end of the file for some reason.
client.login(token);
