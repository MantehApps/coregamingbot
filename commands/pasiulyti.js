const Discord = require('discord.js');
const fs = require("fs");
const guildInfo = require("../guildInfo.json");
const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {

    //!pasiulyti <trailer url> 

    var guildx = client.guilds.find("id", "431185190044434432");
    var youtubeCheck = "https://www.youtube.com/watch?v"
    let validate = await ytdl.validateURL(args[0]);

    if(message.channel.id != "466354784170016768") return message.reply(`šiame kanale draudžiama siūlyti filmus!\nNaudokite <#466354784170016768> kanalą!`).then(msg => {
        msg.delete(10000)
        message.delete();
      });

    if(!args[0] || !validate) return message.channel.send('Įklijuokite filmo ištraukos nuorodą! **!pasiulyti <www.youtube.com/filmo-ištrauka>**').then(msg => {
        msg.delete(10000)
        message.delete();
      });

    if(!args[0].includes(youtubeCheck)) return message.channel.send('Filmo ištrauka turi būti iš **www.youtube.com**!').then(msg => {
        msg.delete(10000)
        message.delete();
      });

    let info = await ytdl.getInfo(args[0]);
    let infoTitle = info.title;
    let infoTrailerL = info.length_seconds;
    let infoRating = info.avg_rating;
    let infoAuthor = info.author;
    let verifiedAuthor = info.author.verified;
      
    if(!infoTitle.includes("Trailer")) return message.channel.send('Šis video klipas nėra filmo ištrauka! Pabandyk įkelti kitą anglišką filmo ištrauką!').then(msg => {
            msg.delete(10000)
            message.delete();
      });


      let movies = guildInfo.Movies;
      let checkForExistingUrl = (movies.find(existURL => existURL.videoID.url === args[0]));


      if(checkForExistingUrl == undefined) {

      let newMovie = new Object({videoID: {movieTitle: infoTitle, url: args[0], videoid: info.video_id, rating: infoRating, author: infoAuthor, verified: verifiedAuthor}});

      movies.push(newMovie);

      await fs.writeFileSync("./guildInfo.json", JSON.stringify(guildInfo, null, 4), (err) => {
        if (err) console.log(err);
      });

      let ratingStars = parseInt(movies[(movies.length)-1].videoID.rating);
      let stars = "";

      for (var i = 0; i<ratingStars; i++) {
          stars = stars + "⭐"
      }

      try{

      let newMovieEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username} pridėjo filmą!`, message.author.avatarURL)
      .setDescription("Filmas buvo pridėtas prie duomenų bazės!")
      .addField("Filmo pavadinimas", infoTitle)
      .addField("Filmo ištrauka", movies[(movies.length)-1].videoID.url)
      .addField("Įvertinimas", `${stars} [${(movies[(movies.length)-1].videoID.rating).substring(0,4)}/5]`)
      .setImage(`https://img.youtube.com/vi/${movies[(movies.length)-1].videoID.videoid}/mqdefault.jpg`)
      .setColor(0x00E5EE)
      .setFooter("Visus filmus galite rasti parašę !filmai");

      if(movies[(movies.length)-1].videoID.author.verified) {
        newMovieEmbed.addField("Leidėjas", movies[(movies.length)-1].videoID.author.name);
        newMovieEmbed.setThumbnail(movies[(movies.length)-1].videoID.author.avatar);
      }

      message.channel.send(newMovieEmbed).then(msg => {msg.delete(15000)}); 
      message.delete();

      }catch(err){
          console.log(err);
      }

    } else {
        message.channel.send("Šis filmas jau yra pasiūlytas!");
    }


}

module.exports.help = { 

    name: "username",
    name: "movieTitle"

}