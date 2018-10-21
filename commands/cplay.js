const Discord = require('discord.js');
const ytdl = require('ytdl-core');




exports.run = async (client, message, args, active) => {

    if(!message.member.voiceChannel) return message.channel.send("Pirmiausia prisijunkite prie kanalo!");

    if(!args[0]) return message.channel.send('Įklijuokite dainos nuorodą!');

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) return message.channel.send('Neteisinga nuoroda!')

    let info = await ytdl.getInfo(args[0]);
    
    let data = active.get(message.guild.id) || {};


    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    try{
        if(!data.queue) data.queue = [];
        data.guildID = message.guild.id;
    }catch(error) {
        console.log(error);
    }

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });


    if(!data.dispatcher) play(client, active, data);
    else {
        message.channel.send(`🎧 **${message.author.username}** pridėjo dainą **${info.title}** į eilę!`);
    }

    active.set(message.guild.id, data);

 }

async function play(client, active, data) {

    try{

    client.channels.get(data.queue[0].announceChannel).send(`🔊 Dabar groja: **${data.queue[0].songTitle}** | 🎧 Pageidauta nario: **${data.queue[0].requester}**`);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        end(client, active, this);
    });


    }catch(error){
        console.log(error);
    }

}

function end(client, active, dispatcher) {

    try{

    let fetched = active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {

        active.set(dispatcher.guildID, fetched);

        play(client, active, fetched);
        
    } else {

        active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();

    }
    }catch(error){
        console.log(error);
    }
}

 /*

     let connection = await message.member.voiceChannel.join().then(connection => {

        connection.playStream(ytdl(args[0], {filter: 'audioonly'}));


        message.channel.send(`Dabar groja: **${info.title}**`);
        message.delete();

    });
    
    */