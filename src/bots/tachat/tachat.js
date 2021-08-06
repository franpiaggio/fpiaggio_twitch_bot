const fs = require('fs');
const wisdom = require('./wisdom.json');
const commands = ["tachat", "sugerir"];
const channel = process.env.TWITCH_CHANNEL;
function handleCommand(clientInstance, fullMessage, command, args, tags){
    if(command === 'tachat') {
        const random = Math.floor(Math.random() * wisdom.phrases.length)
        const randomTachat = wisdom.phrases[random]
        clientInstance.say(channel, tags.username + " " + randomTachat);
    }
    if(command === "sugerir"){
        const text = fullMessage.slice(9);
        const message = `\n ${tags.username} sugiere: ${text},`;
        const path = './src/bots/tachat/sugerencias.txt';
        fs.appendFile(path, message, function (err) {
            if (err) throw err;
            const responses = ["Apa...", "No la tenía esa","Tuqui", "Mira vos...", "Anotadísima" ]
            const randomNumber = Math.floor(Math.random() * responses.length)
            const randomText = responses[randomNumber]
            clientInstance.say(channel, tags.username + " " + randomText);
            console.log('Se agregó una sugerencia');
        });
    }
}
module.exports = { commands, handleCommand } 