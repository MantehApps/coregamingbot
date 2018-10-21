const Discord = require('discord.js');
const fs = require("fs");
let guildInfo = require("../guildInfo.json");
const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {

    if(message.channel.id != "466354784170016768") return message.reply(`šiame kanale draudžiama peržiūrėti pasiūlytus filmus!\nNaudokite <#466354784170016768> kanalą!`).then(msg => {
        msg.delete(10000)
        message.delete();
      });

    if(!args[0]) {

        var guildx = client.guilds.find("id", "431185190044434432");

        let movieEmbed = new Discord.RichEmbed()
        .setAuthor(guildx.name, "https://cdnb.artstation.com/p/assets/images/images/010/045/825/large/khaled-reese-mascot-recovered-large.jpg?1522259473")
        .setTitle("Pasiūlyti filmai")
        .setThumbnail("http://www.pngmart.com/files/5/Movie-PNG-Image.png")
        .setColor(0x00E5EE)
        .setFooter("Daugiau informacijos apie filmą rasite parašę !filmai <filmo skaičius eilėje>")



        let amountObj = (guildInfo.Movies).length;


        try{

        for(var i = 0; i < amountObj; i++) {

            let movies = guildInfo.Movies[i];
            movieEmbed.addField(i+1,`📀 | ${movies[Object.keys(movies)[0]].movieTitle} `);

        }

        }catch(err){
            console.log(err);
        }

        message.channel.send(movieEmbed).then(msg => {msg.delete(15000)});


    } else {
        
        let moviesArray= guildInfo.Movies;
        let number = parseInt(args[0]);

        if(number > 0 && number <= moviesArray.length + 1) {

            let movies = moviesArray[(number - 1)];
            let ratingStars = parseInt(movies[Object.keys(movies)[0]].rating);
            let stars = "";

            for (var i = 0; i<ratingStars; i++) {
                stars = stars + "⭐"
            }


            let searchedMovie = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle("Apie filmą")
            .addField("Filmo pavadinimas", movies[Object.keys(movies)[0]].movieTitle)
            .addField("Filmo ištrauka", movies[Object.keys(movies)[0]].url)
            .addField("Įvertinimas", `${stars} [${(movies[Object.keys(movies)[0]].rating).substring(0,4)}/5]`)
            .setThumbnail("http://www.pngmart.com/files/5/Movie-PNG-Image.png")
            .setImage(`https://img.youtube.com/vi/${movies[Object.keys(movies)[0]].videoid}/mqdefault.jpg`)
            .setColor(0x00E5EE)
            .setFooter("Visus filmus galite rasti parašę !filmai");

            if(movies[Object.keys(movies)[0]].author.verified) {
                searchedMovie.addField("Leidėjas", movies[Object.keys(movies)[0]].author.name);
                searchedMovie.setThumbnail(movies[Object.keys(movies)[0]].author.avatar);
            }
      
            message.channel.send(searchedMovie).then(msg => {msg.delete(15000)});

        }

    }

    message.delete();


}


