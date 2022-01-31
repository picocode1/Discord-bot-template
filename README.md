# Discord bot
Advanced Discord bot with modules.

### Feature list

- [x] Custom error function.
- [x] Auto-updated help command.
- [x] Simple module design.
- [x] Auto-updated discord intents.
- [x] Few basic commands.
- [ ] Slash commands.
- [ ] Buttons.

## Requirements
Packages:
```console
npm i discord.js
```

## Example module

```js
module.exports.run = async (Discord, command, args, channel, message) => {
   console.log(`New message! ${message} ${args}`)
   message.channel.send(`Command: "${command}" arguments: "${args}" channel: "${channel}"`);
};

module.exports.help = {
   name: __filename.slice(__dirname.length + 1, -3),
   description: "Example command",
   arguments: "Example argument"
}
```

`help` is an object with the following properties:

* `name`: String (default), this will be automaticly set to the filename.
* `description`: String (required), this will be the description of the command.
* `arguments`: String (optional), this is the example text for arguments.

### Settings

In the file `settings.json` you can define a custom prefix, and color for the bot.

```json
{
   "prefix": "!",
   "token": "DISCORD_TOKEN_HERE",
   "color": "#FF0000"
}

```


## Commands

You can create your own commands super easy and put them in the commmands folder.

The filename will be the command for the bot.

## Contributing

Found a bug or problem? File an issue or submit a pull request with the fix.
