const tmi = require('tmi.js');
const tachat = require('./tachat/tachat');
const notes = require('./notes/notes');
const tmiClient = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USER,
		password: process.env.TWITCH_BOT_KEY
	},
	channels: [ process.env.TWITCH_CHANNEL ]
});
function init(socketInstance){
    tmiClient.connect();
    tmiClient.on('message', (channel, tags, message, self) => {
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

        // Twitch widgets
        // 1. Busco todos lso comandos
        // 2. Evaluo si el mensaje enviado tiene uno de esos comandos
    });
}
module.exports = { init } 