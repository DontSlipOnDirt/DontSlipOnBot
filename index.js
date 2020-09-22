const Discord = require('discord.js');
const {Client, MessageAttachment} = require('discord.js');
const ms = require('ms');
const ytdl = require('ytdl-core');
//wack stuff i havent used yet:
const cheerio = require('cheerio');
const request = require('request');
//end of wack stuff
const bot = new Discord.Client();

const token = '';

const prefix = '>';

const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const cmnds = require(`./commands/${file}`);
 
    bot.commands.set(cmnds.name, cmnds);
}

var servers = {};

bot.once('ready', () => {
    console.log('This bot is now V I B I N');
    bot.user.setActivity(`${prefix}help for list of commands`);
    
})

/*-----------------------------Welcomes and default role--------------------------*/
bot.once('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if (!channel) return channel.send('Channel "welcome" not found');
    channel.send(`Hello there ${member}`)

    const defaultRole = member.guild.roles.cache.find(role => role.name === "Peasant")
    if(!defaultRole) return channel.send('Role "Peasant" not found');
    member.roles.add(defaultRole.id);

});


/*-------------------------------Member commands--------------------------------*/
bot.on('message', message => {

    if(message.content === "hello there"){
        message.channel.send('General Kenobi')
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const cmnds = message.content.slice(prefix.length).split(/ +/);
    //const args = cmnds.shift().toLowerCase();
    //const cmnds = message.content.slice(prefix.length).split(" ");

    switch(cmnds[0]){
        
        case `help`:
            bot.commands.get('help').execute(message, cmnds, Discord, prefix);
        break;
        
        case `author`:
            bot.commands.get('author').execute(message, cmnds, Discord);
        break;

        case `info`:
            let personinfo = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[1]));
            if(!personinfo) return message.channel.send('Please specify member find info on');

            const embed = new Discord.MessageEmbed()
            .setColor(0xffcc00)
            .setTitle('Profile')
            .setThumbnail(personinfo.user.avatarURL())
            .addField('Username', personinfo.user.username)
            .addField('Date account was created', personinfo.user.createdAt)
            .addField('Date joined server', personinfo.joinedAt)
            .setTimestamp(Date.now())
            .setFooter(message.author.username)
            message.channel.send(embed);
        break;

        case `love`:
            let personluv = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[1]));
            if(!personluv) return message.channel.send('Please specify member to send love to');

            var love = [
                "I like you just the way you are", 
                ":hearts: :hearts: :hearts:",
            ];

            message.channel.send(`${love[Math.floor(Math.random()*2)]} ${personluv.user}`);

        break;

        case `insult`:
            let personinsult = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[1]));
            if(!personinsult) return message.channel.send('Please specify member to send love to');

            var insult = [
                "You're as useless as the ueue in queue",
                "simp",
                "I'd agree with you, but then we would both be wrong",
            ];

            message.channel.send(`${insult[Math.floor(Math.random()*3)]} ${personinsult.user}`);

        break;

        case `massping`:
            bot.commands.get('massping').execute(message, cmnds);
        break;

        /*-------------------------------------TEST COMMAND-----------------------------------*/

        case `test`:
            message.member.voice.channel.join().then(weep => {
                const dispatcher = weep.play('C:/Users/Jacob-Josiah/Desktop/Bot/sounds/bruh.mp3');
                dispatcher.on("end", end => {message.member.voice.channel.disconnect()})
                
            })
            
        break;

        case `test2` :
            message.member.voice.channel.leave()
        break;

        /*------------------------------------------------------------------------------------*/

        case `bigox`:
            const bigox = new MessageAttachment('https://cdn.discordapp.com/attachments/702019656961097750/702021693174054922/ox-emoji-by-twitter.png')
            message.channel.send(bigox);
        break;

        /*case `${prefix}bibleversion` :
            const bibleversion = cmnds[1];
            message.channel.send(`The bible is now going to be searched in the **${bibleversion}** version`);
        break;*/

        case `bible`:
            let bibleversion = 'nlt';
            let booknumber = cmnds[1];
            let book = cmnds[2];
            let chapter = cmnds[3];
            let verse = cmnds[4];

            if(booknumber,book,chapter,verse) {
                let biblelink3 = `https://www.biblegateway.com/passage/?search=${booknumber}+${book}+${chapter}%3A${verse}&version=${bibleversion}`
                message.channel.send(`${biblelink3}`);
            } else if (booknumber,book,chapter){
                    let biblelink2 = `https://www.biblegateway.com/passage/?search=${booknumber}+${book}+${chapter}&version=${bibleversion}`
                    message.channel.send(`${biblelink2}`);
                }
                 else if (booknumber,book) {
                        let biblelink1 = `https://www.biblegateway.com/passage/?search=${booknumber}+${book}&version=${bibleversion}`
                        message.channel.send(`${biblelink1}`);
                    }

        break;

        //rock paper scissors stuff
        case `rps`:
            if (!cmnds[1]) return message.channel.send('Please use rock, paper or scissors.');
            if (!(cmnds[1] === 'scissors' || cmnds[1] === 'rock' || cmnds[1] === 'paper')) return message.channel.send('Please use rock, paper or scissors.');

            var rps = [
                ("Rock"),
                ("Paper"),
                ("Scissors")
            ];

            let botrps = Math.floor(Math.random()*3);
            message.channel.send(`${rps[botrps]}`);

            if(cmnds[1] === 'rock') {
                if(botrps === 1) {
                    message.channel.send('Haha, I beat you! Bow to my supreme power!');
                }
                if(botrps === 2) {
                    message.channel.send('Darn, you beat me.');
                }
                if(botrps === 0) {
                    message.channel.send('We\'ll call it a draw.');
                }
            }

            if(cmnds[1] === 'paper') {
                if(botrps === 2) {
                    message.channel.send('Haha, I beat you! Bow to my supreme power!');
                }
                if(botrps === 0) {
                    message.channel.send('Dang it, you beat me.');
                }
                if(botrps === 1) {
                    message.channel.send('We\'ll call it a draw.');
                }
            }

            if(cmnds[1] === 'scissors') {
                if(botrps === 0) {
                    message.channel.send('Haha, I beat you! Bow to my supreme power!');
                }
                if(botrps === 1) {
                    message.channel.send('Dang it, you beat me.');
                } 
                if(botrps === 2) {
                    message.channel.send('We\'ll call it a draw.');
                }
                    
                
            }

        break;
        //end of rock paper scissors stuff

        case `poll` :
            let pollq = cmnds[1];
            let polla1 = cmnds[2];
            let polla2 = cmnds [3];

            const poll = new Discord.MessageEmbed()
            .setTitle(`${pollq}?`)
            .setColor(0x4634a7)
            .addField('React with one of these emojis to participate',`:red_circle: - ${polla1} \n:blue_circle: - ${polla2}`)
            .setAuthor(message.author.username)
            message.channel.send(poll).then(pollreacts => {
                pollreacts.react(`🔴`)
                pollreacts.react(`🔵`)

            })
            
        break;
        
        

        /*---------------------------------Music Commands--------------------------------*/

        //this thing is so broken:
        case `p`:
        case `play`:

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
                server.queue.shift();
                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                })

            }

            if(!cmnds[1]){ 
                return message.channel.send('You must put a link after the command');
            }

            if(!message.member.voice.channel){
                return message.channel.send('You need to be in a voice channel to play');
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];
            server.queue.push(cmnds[1]);

            if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            });

        break;

        case `pause`:
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.pause();
            message.channel.send('Paused');
        break;

        case `resume`:
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.resume();
            message.channel.send('Resumed');
        break;

        case `skip`:
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            message.channel.send('Skipping current song');
        break;

        //work on showing queue
        case `$queue`:
            var server = servers[message.guild.id];
            
        break;

        case `stop`:
            var server = servers[message.guild.id];
            if (message.guild.voice.connection){
                for(var i = server.queue.length -1; i >= 0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                message.channel.send('Leaving voice channel');
            }

            if (message.guild.voice.connection) message.guild.voice.connection.disconnect();
        break;

        /*------------------------------Admin Commands---------------------------------*/

        case `mute`:
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send('You do not have permission to use this command')
            }

            let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(cmnds[2]));
            if(!person) return message.channel.send("Could not find that member");

            let mainrole = message.guild.roles.cache.find(role => role.name === "Peasant");
            let muterole = message.guild.roles.cache.find(role => role.name === "muted");

            if(!muterole) return message.channel.send('Could not find the "muted" role');

            let time = cmnds[1];

            if(!cmnds[1]){
                return message.reply("You did not specify the duration");
            }

            person.roles.add(muterole.id);
            person.roles.remove(mainrole.id);
            
            message.channel.send(`${person.user} has been muted for ${ms(ms(time, {long : true}))}`)

            setTimeout(function(){
                person.roles.add(mainrole.id);
                person.roles.remove(muterole.id);
                message.channel.send(`${person.user} has been unmuted`)
            }, ms(time))
            
        break;

        case `unmute`:
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send('You do not have permission to use this command')
            }

            let person2 = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[1]));
            if(!person2) return message.channel.send("Could not find that member");

            let mainrole2 = message.guild.roles.cache.find(role => role.name === "Peasant");
            let muterole2 = message.guild.roles.cache.find(role => role.name === "muted");

            if(!muterole2) return message.channel.send('Could not find the muted role');

            person2.roles.add(mainrole2.id);
            person2.roles.remove(muterole2.id);
            
            message.channel.send(`${person2.user} has been unmuted`)

            
        break;

        case `kick`:
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send('You do not have permission to use this command')
            }

            let personkick = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[1]));
            if(!personkick) return message.channel.send('Please specify member to kick from server');

            message.guild.member(personkick).kick('because');

            message.channel.send(`Successfully kicked ${personkick.user}`)


        break;

        case `ban`:
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send('You do not have permission to use this command')
            }

            let personban = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[1]));
            if(!personban) return message.channel.send('Please specify member to ban from server');

            message.guild.member(personban).ban('because');

            message.channel.send(`Successfully banned ${personban.user}`)

        break;

        case `purge`:
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send('You do not have permission to use this command')
            }

            var purgenum = cmnds[1];
            if (!purgenum) message.channel.send('Please specify number of messages to delete')

            message.channel.bulkDelete(purgenum);
        break;
        
        /*---------------------------------------self role stuff----------------------------*/

        case `selfrole`:
            if(!message.member.hasPermission("ADMINISTRATOR")){
                return message.channel.send('You do not have permission to use this command')
            }

            message.channel.bulkDelete(1);

            const SRchannel = message.guild.channels.cache.find(channel => channel.name === "selfrole");
            if (!SRchannel) return message.channel.send('Channel "selfrole" not found');

            const SRmenu = new Discord.MessageEmbed()
            .setColor(0x4634a7)
            .addField(`React to get a role`, `<:minecraftb:725823800381407272> - Minecraft Bedrock\n<:minecraftj:725840621759365150> - Minecraft Java`)
            SRchannel.send(SRmenu).then(SRreacts => {
                SRreacts.react('725823800381407272')
                SRreacts.react('725840621759365150')
            })

            let SRrole1 = message.guild.roles.cache.find(role => role.name === "Minecraft Bedrock");
            let SRrole2 = message.guild.roles.cache.find(role => role.name === "Minecraft Java");

            const filter = (reaction, user) => {
                return ['725823800381407272', '725840621759365150'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            message.awaitReactions(filter, {max:1, time: 60000, errors:['time']}).then(collected => {
                const reaction = collected.first

                if (reaction.emoji === '725823800381407272') {
                    message.channel.send('You want the bedrock role')
                } else if(reaction.emoji === '725840621759365150') {
                    message.channel.send('You want the java mc role')
                }
            })

            /*var roleReact = messageReaction.emoji.name;
            let SRrole1 = message.guild.roles.cache.find(role => role.name === "Minecraft Bedrock");
            let SRrole2 = message.guild.roles.cache.find(role => role.name === "Minecraft Java");

            switch(roleReact) {
                case '725840621759365150':
                    member.roles.add(SRrole1)
                break;

                case '725823800381407272':
                    member.roles.add(SRrole2)
                break;
            }*/

        break;
        
    }
})

bot.login(token);