module.exports = {
	name: 'hug',
	description: 'Want a hug?',
	args: true,
	execute(message, args) {
		const huggee = args[0];
		if (huggee === 'me') {
			message.react('🤗');
		}
		else {
			message.channel.send(`@${huggee} :hug:`);
		}
	},
};
