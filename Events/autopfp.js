// const { Client, Message, EmbedBuilder, PermissionsBitField, ActionRowBuilder,ButtonBuilder } = require("discord.js");
// const Discord = require("discord.js");
// const axios = require('axios');
// const megadb = require('megadb')
// const autopfp = new megadb.crearDB("autopfp", "data_guilds")
// const cheerio = require('cheerio')
// const client = require('../index')
// client.once("ready", async () => {
//   const sendImages = async () => {
//     client.guilds.cache.forEach(async (guild) => {
//       if (!autopfp.tiene(guild.id)) {
//         return;
//       }
      
//       const pfp = await autopfp.obtener(guild.id);
//       if (!pfp) {
//         return;
//       }
      
//       const canalrendered = client.channels.cache.get(pfp);
//       if (!canalrendered || (!canalrendered.isTextBased() && canalrendered.type !== 'GUILD_NEWS')) {
//         return;
//       }

//       const websiteUrls = [
//         'https://www.pinterest.com/derekzimmerman_9469/christmas-pfp/',
//         'https://www.pinterest.com/TaylorGracieSturniolotriplets/christmas-pfpwallpaper/',
//         'https://www.pinterest.com/L0SER_R4T/christmas-pfp/'
//       ];

//       for (const websiteUrl of websiteUrls) {
//         try {
//           const response = await axios.get(websiteUrl);
//           const html = response.data;
//           const $ = cheerio.load(html);

//           const mediaUrls = []; 

//           $('img, video').each((index, element) => {
//             const mediaUrl = $(element).attr('src');
//             mediaUrls.push(mediaUrl);
//           });

//           for (let i = 0; i < mediaUrls.length; i++) {
//             const mediaUrl = mediaUrls[i];
//             const embed = new EmbedBuilder()
//               .setAuthor({ name: 'follow the pinterest', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png', url: websiteUrl })
              

//             if (isGif(mediaUrl)) {
//               embed.setImage(mediaUrl);
//             } else {
//               embed.setImage(mediaUrl);
//             }

//             setTimeout(() => {
//               canalrendered.send({ embeds: [embed] });
//             }, i * 4 * 60 * 1000);
//           }
//         } catch (error) {
//             return;
//         }
//       }
//     });
//   };

//   sendImages();

//   setInterval(sendImages, 5 * 60 * 60 * 1000);
// });

// function isGif(url) {
//   const regex = /\.gif$/i;
//   return regex.test(url);
// }
