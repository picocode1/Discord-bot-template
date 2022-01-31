//Define date once, so we don't update this value on every command
var date = new Date();

module.exports.run = async (Discord, command, args, channel, message) => {
    message.channel.send("The bot is online since " + date.toLocaleString());
};

module.exports.help = {
    name: __filename.slice(__dirname.length + 1, -3),
    description: "Displays bot online time"
}