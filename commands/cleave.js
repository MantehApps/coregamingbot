const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {

    if(!message.member.voiceChannel) return message.channel.send("Pirmiausia prisijunkite prie kanalo!");

    if(!message.guild.me.voiceChannel) return mesage.channel.send("Botas neprisijungęs prie jokio kanalo!");

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Turite būti tame pačiame kanale kaip ir botas!");

    message.guild.me.voiceChannel.leave();  

}