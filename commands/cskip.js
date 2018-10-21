


exports.run = async (client, message, args, active) => {

    try {

    let fetched = active.get(message.guild.id);

    if(!fetched) return message.channel.send("Negroja jokia muzika!");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Turite būti tame pačiame kanale kaip ir botas!");

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);

    if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if(fetched.queue[0].voteSkips.includes(message.author.id)) return message.channel.send(`Jau esate prabalsavęs! **${fetched.queue[0].voteSkips.length}/${required}**`);

    fetched.queue[0].voteSkips.push(message.author.id);

    active.set(message.guild.id, fetched);

    if(fetched.queue[0].voteSkips.length >= required) {

        return fetched.dispatcher.emit('end');

    }
    
    message.channel.send(`Prabalsavote už !skip **${fetched.queue[0].voteSkips.length}/${required}**`)

    } catch(err) {
        console.log(err);
    }

}