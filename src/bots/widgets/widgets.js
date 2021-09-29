const triggers = ["enojado", "triste", "sorprendido", "!tachat", "space", "feliz", "alegre"];
function handleCommand(socketInstance, tmiClient, message, tags){
    console.log("Se disparó un comando de widgets");
    socketInstance.emit("widget_message", message)
}
module.exports = {  triggers, handleCommand } 