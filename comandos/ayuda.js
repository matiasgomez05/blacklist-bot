const Discord = require('discord.js');
const prefix = process.env.PREFIX;
module.exports = {
	nombre: 'ayuda',
    alias: ["help", "comandos", "comando"],
	descripcion: 'Lista de todos los comandos o informacion especifica sobre el uso de cada uno de ellos.',
    enfriamiento: 3,
    soloServidor: false,
	ejecutar(message, args){
		let explicar = args.join(" ").toLowerCase();
        const { comandos } = message.client;
        
        if(!explicar){
            message.reply("se te envió un mensaje privado :inbox_tray:");
            const embedAyuda = new Discord.MessageEmbed()

            .setThumbnail(message.guild.iconURL())
            .setTitle("COMANDOS BLACKLIST")
            .setDescription(`:gear: Esta es la lista completa de los comandos del BOT. Puedes utilizar ${prefix}Ayuda <comando> si necesitas informacion mas detallada de cada uno`) 
            .addField(":file_folder: Generales", "__Ping__, __Avatar__", false)
            .addField(":file_folder: Modo Aventura", "__Cazar__", false)
            .setColor(0x9b8018)
            return message.author.send(embedAyuda);
        } 
        
        const comando = comandos.get(explicar) || comandos.find(cmd => cmd.alias && cmd.alias.includes(explicar));

        if(!comando){
            const embedError = new Discord.MessageEmbed()
            .setDescription("No se encontró informacion para: `"+explicar+"`. Intenta nuevamente...")
            .setColor(0x9b8018)
            return message.channel.send(embedError);
        }

        (comando.alias)? agregarAlias = "\n**Alias:** "+comando.alias : agregarAlias = "";
        (comando.enfriamiento)? agregarEnfriamiento = "\n**Enfriamiento:** "+comando.enfriamiento+"seg." : agregarEnfriamiento = "";

        const embedExplicar = new Discord.MessageEmbed()
        .setTitle("Informacion de comando: `"+comando.nombre+"`")
        .setDescription("**Descripcion: **"+comando.descripcion+agregarAlias+agregarEnfriamiento)
        .setColor(0x9b8018)
        return message.channel.send(embedExplicar);       
    }
}  