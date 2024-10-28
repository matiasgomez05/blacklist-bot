module.exports = {
	nombre: 'ping',
	descripcion: 'El bot responde con la latencia si se encuentra funcionando',
	ejecutar(mensaje){
		const tiempoRespuesta = Date.now() - mensaje.createdTimestamp;
        mensaje.reply(`Pong! 🏓 El mensaje tiene una latencia de ${tiempoRespuesta}ms.`);
	},
};