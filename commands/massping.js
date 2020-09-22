module.exports = {
    name: 'massping',
    description: "ping someone a lot",
    execute(message, cmnds){
        let personping = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(cmnds[2]));
        if (!personping) return message.channel.send('Please specify member to ping');

        var pingnum = cmnds[1]
        if(!cmnds[2]) return message.channel.send('Please specify number of pings');

        for (var a = 1; a <= pingnum; a++){
            message.channel.send(`${personping}`)
        }

        message.channel.send(`Pinged by ${message.author}`);
    }
}