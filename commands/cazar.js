module.exports = {
	nombre: 'cazar',
	alias: ['cz'],
	descripcion: 'Funcionamiento del comando cazar',
	enfriamiento: 60,
	soloServidor: true,
	ejecutar(message){
		message
			.reply("Caceria en proceso...")
			.then(mensajeEnviado => { mensajeEnviado.react('👍'); })
	},
};