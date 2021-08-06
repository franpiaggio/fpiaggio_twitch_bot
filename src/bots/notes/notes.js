const commands = ["p", "aliens", "radio10", "terraplanero", "peron"];
function emitNote(socketInstance, info){
	console.log(socketInstance)
	console.log(socketInstance.emit)
	socketInstance.emit("play_note", info)
}
function handleCommand(socketInstance, tmiClient, message, command, args, tags){
    if(command === 'p'){
		console.log("Notas: " + args)
		console.log(tags.username)
		console.log("-----")
		emitNote(socketInstance, {notes: args, user: tags})
	}
	if(command === 'aliens'){
		emitNote(socketInstance, {notes: ["g5", "a5", "f5", "f4", "c5"], user: tags})
	}
	if(command === 'radio10'){
		emitNote(socketInstance, {notes: ["b4", "d5", "e5", "d5", "f#5"], user: tags})
	}
	if(command === 'peron'){
		emitNote(socketInstance, {notes: ["e5", "c5", "a4", "e5", "c5", "a4", "e5", "e5", "c5", "c5"], user: tags})
	}
	if(command === "terraplanero"){
		// !p a4 e5 d5 e5 g5 e5
		emitNote(socketInstance, {notes: ["a4", "e5", "d5", "e5", "g5", "e5"], user: tags})
	}
	
}
module.exports = { commands, handleCommand }