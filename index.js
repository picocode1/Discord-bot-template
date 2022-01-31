//Requirements
const {Client} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs')

//Getting prefix, token from settings.json
const settings = require('./settings.json');

//Initializing discord bot with intents
const bot = new Client({
	intents: Object.values(Discord.Intents.FLAGS)
});

//Clear console on load
console.clear()

//Custom error function with red text.
console.err = function(text){
	return console.log("\x1b[31mERROR\x1b[0m:", text)
}

//Creating new collection for bot commands
bot.commands = new Discord.Collection();

//Setting prefix
let prefix = settings.prefix;

fs.readdir('./commands/', (error, files) => {
	if (error) console.err(error);

	//Array of javascipt files in ./commands/
	let jsfile = files.filter(files => files.split('.').pop() === 'js')
	if (jsfile.length <= 0)  {
		console.err("Could not find any commands."); 
		return process.exit(1)
	}
	
	//For every javascript file in ./commands/ add it to the collection.
	jsfile.forEach((files) => {
		//Require the module
		let module = require(`./commands/${files}`);
		console.log(`${files.slice(0, -3)} loaded - ${module.help.description}`);
		bot.commands.set(module.help.name, module);
	});
});

//Command Manager
bot.on('messageCreate', async message => {
	if (!message.content.startsWith(settings.prefix) || message.author.bot) return;

	// if (message.channel.type == 'dm') return message.reply('Command do not work in DM')

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	
	if (message.content == prefix) {
		message.channel.send('Please specify a command.');
	}
	
	let commandfile = bot.commands.get(command);
	
	if (commandfile) {
		//Execute the module with all discord variables
		commandfile.run(Discord, command, args, message.channel, message);
	}
});



bot.on('ready', async (message) => {
	bot.user.setPresence({		
		activities: [{
			name: `${settings.prefix}help`,
			type: "LISTENING" // PLAYING STREAMING LISTENING WATCHING COMPETING
		}],
		status: 'online' //idle dnd online
	})

	console.log(`Logged in as ${bot.user.tag} current prefix: ${settings.prefix}`);
});

bot.login(settings.token);