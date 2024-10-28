// Comando de ejemplo para la creacion de nuevos comandos
// index.js siempre captura module.export con cada variable, dentro de la carpeta comandos
module.exports = {
    //nombre: para llamar al comando con el prefix: ejemplo !prueba
	nombre: 'prueba',
    //alias: para llamar al mismo comando pero con un comando diferente: ejemplo !ex o !ej 
	alias: ['ej', 'ex'],
    //descripcion: Cuando se solicita ayuda sobre el comando: indica lo que realiza
	descripcion: 'Comando de ejemplo',
    //enfriamiento: para controlar el uso del comando, medido en segundos
	enfriamiento: 0,
    //soloServidor: para controlar si el comando puede usarse en el servidor o tambien por mensaje privado
	soloServidor: false,
    //ejecutar: define la ejecucion del comando; se guarda "mensaje" para enviar una respuesta de prueba
	ejecutar(mensaje){
		mensaje
			.reply("Comando de prueba")
			.then(mensajeEnviado => { mensajeEnviado.react('👍'); })
	},
};