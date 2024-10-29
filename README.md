# BlackList - Bot de Discord

Este es un bot de Discord creado con `discord.js` en motivo de aprendizaje. 
Responde a comandos específicos ubicado en la carpeta `comandos` y utiliza Railway para despliegue automático.

## Requisitos previos

Antes de comenzar, se necesitan tener los siguientes componentes:

- Node.js
- Una cuenta en Discord Developer Portal para obtener el token del bot.

## Pasos para configurar y probar el bot de forma local

- Clonar el Repositorio.
- Instalar las dependencias de node con el comando `npm install`.
- Crear un archivo `.env` para configuraciones con las variables `DISCORD_TOKEN`(con los valores obtenidos desde Discord Developer Portal) y `PREFIX`("!" como sugerencia).
- Ejecutar en terminal el comando `npm start` para correrlo de forma local.
- Una vez establecida la conexion, se puede invitar el bot al servidor correspondiente y escribir en cualquier canal de texto: PREFIX+COMANDO (Ejemplo: !ping).

Opcional: Si se busca utilizar Railway para el despliegue automatico y en la nube, se debera configurar dentro de la app las mismas variables del punto 3.