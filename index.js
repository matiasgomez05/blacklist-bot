//Configuracion principal:
//Biblioteca dotenv y variables de entorno
require('dotenv').config();
const prefix = process.env.PREFIX;

//Api fs para lectura de archivos
const fs = require('fs');

//Libreria de Discord
const { Client, Intents, Collection } = require('discord.js');
const cliente = new Client({ intents: [Intents.FLAGS.GUILDS] });
cliente.comandos = new Collection();
cliente.enfriamientos = new Collection();

//Lee todos los archivos de "/comandos" que terminen en .js y los guarda en la variable
const archivoComandos = fs.readdirSync('./comandos').filter(archivo => archivo.endsWith('.js'));

//Configurar cada comando encontrado en "/comandos" con el "nombre" que posee en el archivo .js y requerirlo siempre para su uso.
//Tambien lo guardamos en la coleccion creada para comandos. 
for (const archivo of archivoComandos) {
	const comando = require(`./comandos/${archivo}`);
	cliente.comandos.set(comando.nombre, comando);
}

//Conexion del bot (Se inicializa desde terminal, con "node index.js")
cliente.login(process.env.DISCORD_TOKEN);

//Si se conecta correctamente, muestra el mensaje y establece actividad
cliente.once('ready', () => {
    cliente.user.setPresence( {
        activity: {
            name: `RPG || ${prefix}Ayuda`,
            type: "PLAYING"
        },
        status: "online"
     });
    console.log(`BlackList Bot conectado satisfactoriamente! ${cliente.user.tag}`);
});

//Respuestas del bot ante un mensaje 
cliente.on("message", mensaje => {

    //Si el mensaje es del bot o no comienza con el prefix establecido, no ocurre nada
    if (!mensaje.content.startsWith(prefix) || mensaje.author.bot) return;

    //Separo el prefix del mensaje y lo transformo a minusculas para un mejor manejo
    const cuerpoComando = mensaje.content.slice(prefix.length);
    const args = cuerpoComando.trim().split(/ +/);
    const comandoIngresado = args.shift().toLowerCase();

    //Capturo el comando ingresado solo si esta en la lista de comandos o en la lista de alias del comando
    const comando = cliente.comandos.get(comandoIngresado) || 
        cliente.comandos.find(cmd => cmd.alias && cmd.alias.includes(comandoIngresado));
    
    //Si no existe el comando, no ocurre nada.
    if(!comando) return;

    //Si intenta usar comando desde mensaje privado y es solo para usarse dentro del servidor
    if (comando.soloServidor && mensaje.channel.type === 'dm') {
		return mensaje.reply('No puedes utilizar este comando en un mensaje privado.');
	}

    //Si no tiene los permisos para usar el comando, devuelvo un mensaje de error.
    if(comando.permisos) {
		const permisoAutor = mensaje.channel.permissionsFor(mensaje.author);
		if (!permisoAutor || !permisoAutor.has(comando.permisos)) {
			return mensaje.reply('No tienes los permisos para usar este comando.');
		}
	}

    //Verificacion de enfriamientos por comando
    const { enfriamientos } = cliente;

    if (!enfriamientos.has(comando.nombre)) {
        enfriamientos.set(comando.nombre, new Collection());
    }

    const tiempoActual = Date.now();
    const tiempoEnfriamiento = enfriamientos.get(comando.nombre);
    const enfriamientoTotal = (comando.enfriamiento || 3) * 1000;

    if (tiempoEnfriamiento.has(mensaje.author.id)) {
        const tiempoExpirado = tiempoEnfriamiento.get(mensaje.author.id) + enfriamientoTotal;
    
        if (tiempoActual < tiempoExpirado) {
            const tiempoRestante = (tiempoExpirado - tiempoActual) / 1000;
            return mensaje.reply(`por favor espera ${tiempoRestante.toFixed(0)} segundos para volver a usar el comando \`${comando.nombre}\`.`);
        }
    }
    
    tiempoEnfriamiento.set(mensaje.author.id, tiempoActual);
    setTimeout(() => tiempoEnfriamiento.delete(mensaje.author.id), enfriamientoTotal);

    //Finalmente ejecuto el mensaje si se cumplen todas las condiciones. 
    //Contemplo con try-catch en caso de error inesperado.
    try{
        comando.ejecutar(mensaje, args);
    } catch(error){
        console.error(error);
		mensaje.reply('ocurrió un error al ejecutar el comando. Por favor, vuelve a intentarlo.');
    }

  });

