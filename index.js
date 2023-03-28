const { Client } = require('discord.js-selfbot-v13');
const { spam } = require('./manager/spam.js')
const { token, accountConfig, poketwo, admins } = require('./manager/config.js')
const config = require('./manager/config.js');
const { Nexion } = require('./NexionAI/index.js');
const { log } = require('./manager/util.js');
const { solveHint } = require('./NexionAI/hint.js');
console.clear = () => {};


const client = new Client(accountConfig);
let ai = null;

client.on('ready', async () => {
  log(`${client.user.username} is ready!`, `yellow`, true);
  if(config.autoCatchAI) {
    ai = new Nexion();
    await ai.loadModel(); //Loading model
  }
  if(config.spam.toggle) {
    try {
        let channel = await client.channels.cache.get(config.spam.channel)
        if(!channel) return;
        log(`Started spamming in ${channel.name}`, `yellow`, true)
        setInterval(() => {
            channel.send({content: `${spam(16)}`})
        }, config.spam.interval);
    } catch (error) {
        log(`Encountered an error while spamming!\n ${error.stack}`, `red`, true)
    }   
}
})

client.on('messageCreate', async (message) => {
    if(message.guild.id != `1089438794102612078`) return;
    if((message.author.id != poketwo) || admins.includes(message.author.id)) return;
    if(config.autoCatchAI || config.autoCatchHint) {
        if(message.embeds?.length > 0) {
            let embed = message.embeds[0];
            if(!embed?.title) return;
            if(embed.title.includes(`has appeared`)) {
                if(config.autoCatchHint) {
                    if(message.guild.id === `716390832034414685`) return; //Dont ever try to do this in here
                    //message.channel.send({ content: `<@${poketwo}> hint`})
                    //Autocatch with hint
                } else if(config.autoCatchAI) {
                    let url = embed.image.url;
                    let pokemon = await ai.inference(url);
                    //message.channel.send({ content: `<@${poketwo}> catch ${pokemon}`})
                    //Autcatch with AI
                } else {
                    //Dont catch this shit.
                }
            }
        } else if(message.content.includes(`The pokémon`)) {
            let pokemon = solveHint(message.content);
            pokemon.forEach(async (p) => {
                if(p == `` || !p) return;
                //message.channel.send({ content: `<@${poketwo}> catch ${pokemon}` });
            })
            console.log(pokemon)
        }
    }
})

client.login(token);