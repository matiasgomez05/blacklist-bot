const { MessageEmbed } = require('discord.js');
const prefix = process.env.PREFIX;
module.exports = {
	nombre: 'avatar',
	descripcion: `Muestra el avatar personal o de cada usuario si se escribe ${prefix}(usuario)`,
	ejecutar(message){
		const embedRango = new MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("`TARJETA PERSONAL`")
            .addField("Avatar de ", "<a:corazon:829429724320235581> Vitalidad: 100/100\n <a:diamante:829473237850128426> Energia: 20/20", true)
            .addField("Arma principal", ":dagger: Espada de Bronce", false)
            .addField("Equipamiento", ":military_helmet: Casco Militar\n :coat: Sweeter Azul\n :ring: Anillo de Diamante", true)
            .addField("Inventario", "`(2)` :mushroom: Hongo Rojo\n `(6)` :blueberries: Bayas Azules")
            .setColor(0x9b8018)
            .setImage("https://cdn.discordapp.com/attachments/829784324810342450/829813058595061780/luffy28.gif")
            .setFooter(message.author.username +", esta es tu tarjeta personal.")
            message.channel.send(embedRango);
	},
};