require('dotenv').config()
const axios = require('axios');

const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js')


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.on('ready', (c) => {
    console.log(`${c.user.username} is Online`)

    client.user.setActivity({
        name: 'Q1 QMK ISO Barebone - Spacy Grey',
        type: ActivityType.Watching
    })
})


client.on('messageCreate', async (message) => {
    if (message.content === '!show') {
        try {
            const queryParams  = { target: 'https://www.maxgaming.se/sv/gaming-tangentbord/q1-qmk-barebone-spacy-grey'}

            const res = await axios.get('http://localhost:5000/api/check', {
                params: queryParams,
            })

            const product = res.data.product;

            if (product) {
                const embed = new EmbedBuilder()
                .setTitle(product.title)
                .setFields(
                {
                    name: 'Status:', 
                    value: product.stock,
                    inline: true
                },
                {
                    name: 'Pris:', 
                    value: `${product.price}kr`,
                    inline: true
                })
                .setColor('#c70000')
                .setImage(product.image)
                .setThumbnail('https://www.maxgaming.se/themes/maxgaming/design/bilder/maxgaming.png')
                .setURL(product.url);;
    
                await message.reply({ embeds: [embed] });
            }
            else {
                await message.reply('failed to get the product')
            }
        }
        catch(error) {
            console.log('error on getting the product and sending the response', error)
        }
    }

    if(message.content == '!check'){
        try {
            const queryParams  = { target: 'https://www.maxgaming.se/sv/gaming-tangentbord/q1-qmk-barebone-spacy-grey'}

            const res = await axios.get('http://localhost:5000/api/check', {
                params: queryParams,
            })

            const product = res.data.product;

            if (product) {
                await message.reply(product.title + ' är ' + product.stock);
            }
            else {
                await message.reply('failed to get the product')
            }
        }
        catch(error) {
            console.log('error on getting the product and sending the response', error)
        }
    }

})


// /help
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'help') {
        const embed = new EmbedBuilder()
            .setTitle('Commands to use')
            .setFields(
            {
                name: '/help', 
                value: 'List of commands',
            },
            {
                name: '!show', 
                value: 'Show the product and status',
            },
            {
                name: '!check', 
                value: 'Get status',
            }
            )

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }


});





client.login(process.env.TOKEN)
