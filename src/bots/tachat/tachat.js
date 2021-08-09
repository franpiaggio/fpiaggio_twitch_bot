const fs = require('fs');
const wisdom = require('./wisdom.json');
const commands = ["tachat", "sugerir"];
const channel = process.env.TWITCH_CHANNEL;
let lastTachat = null;
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
function getRandomTachat(){
    const random = Math.floor(Math.random() * wisdom.phrases.length)
    const list = shuffle(wisdom.phrases)
    return list[random]
}

function handleCommand(clientInstance, fullMessage, command, args, tags){
    if(command === 'tachat') {
        // Generauna nueva frase
        let currentTachat = getRandomTachat()
        // Si la frase es igual a la anterior, volvela a genera
        while(currentTachat === lastTachat){
            currentTachat = getRandomTachat()
        }
        lastTachat = currentTachat;

        clientInstance.say(channel, tags.username + " " + currentTachat);
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
        });
    }
}
module.exports = { commands, handleCommand } 