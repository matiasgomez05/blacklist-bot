var array = []
    array[usuario] = {
        nombre: message.author.username,
        avatar: message.author.displayAvatarURL()
    }
    array[server] = {
        nombre: message.guild,
        icono: message.guild.iconURL()
    }
    array[imagen] = {
        corazon: "<a:corazon:829429724320235581>",
        diamante: "<a:diamante:829473237850128426>"
    };

module.export = array;
