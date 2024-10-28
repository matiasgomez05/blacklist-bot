const Discord = require('discord.js');
module.exports = {
	nombre: 'rango',
	descripcion: 'Tarjeta personal de cada usuario.',
	ejecutar(message){
		const embedRango = new Discord.MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("`TARJETA PERSONAL`")
            .addField("Estadisticas", "<a:corazon:829429724320235581> Vitalidad: 100/100\n <a:diamante:829473237850128426> Energia: 20/20", true)
            .addField("Arma principal", ":dagger: Espada de Bronce", false)
            .addField("Equipamiento", ":military_helmet: Casco Militar\n :coat: Sweeter Azul\n :ring: Anillo de Diamante", true)
            .addField("Inventario", "`(2)` :mushroom: Hongo Rojo\n `(6)` :blueberries: Bayas Azules")
            .setColor(0x9b8018)
            .setImage("https://cdn.discordapp.com/attachments/829784324810342450/829813058595061780/luffy28.gif")
            .setFooter(message.author.username +", esta es tu tarjeta personal.")
            message.channel.send(embedRango);
	},
};