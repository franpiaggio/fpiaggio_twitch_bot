const tmi = require('tmi.js');
const tachat = require('./tachat/tachat');
const notes = require('./notes/notes');
const widgets = require('./widgets/widgets');
const tmiClient = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USER,
		password: process.env.TWITCH_BOT_KEY
	},
	channels: [ process.env.TWITCH_CHANNEL, "fpiaggio"]
});
function init(socketInstance){
    tmiClient.connect();
    tmiClient.on('message', (channel, tags, message, self) => {
        const runWidgetCommand = widgets.triggers.some( word => message.includes(word.toLowerCase()) )
        if(runWidgetCommand){
            widgets.handleCommand(socketInstance, tmiClient, message, tags);
        }
        if(message && self || !message.startsWith('!')) return;
        const args = message.slice(1).split(' ');
        const command = args.shift().toLowerCase();
        // Tachat
        const tachatCommands = tachat.commands.find(text => command === text);
        if(tachatCommands){
            tachat.handleCommand(tmiClient, message, command, args, tags);
        } 
        // Notes Bot
        const notesCommands = notes.commands.find(text => command === text)
        if(notesCommands){
            notes.handleCommand(socketInstance, tmiClient, message, command, args, tags);
        }
    });
}
module.exports = { init } 