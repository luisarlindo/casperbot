'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

var fetch = require("node-fetch");
process.env.DEBUG = 'dialogflow:debug';


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    const agent = new WebhookClient({ request, response });
    let intentMap = new Map();
    intentMap.set('News Intent', getNews);
    agent.handleRequest(intentMap);

    async function getNews(agent) {
        
        const theme = agent.parameters.theme;
      	console.log('theme',theme);
        agent.add("Aqui estão as notícias para" + theme + " encontradas:");

        var url = "https://newsapi.org/v2/everything?q="+theme+"&sortBy=publishedAt&language=pt&apiKey=90ec852764284b6d8e9eb79f2537ff24";
        const response = await fetch(url);
        const json = await response.json();
      
        const newsSlice = json.articles.slice(0,9);
        // Carrousel
        console.log(newsSlice.length);
        if (newsSlice.length > 0){
            for (let news of newsSlice){
                
                agent.add(new Card({
                    title: news.title.substring(0,80),
                    imageUrl: news.urlToImage,
                    text: news.description.substring(0,80),
                    buttonText: 'Saiba Mais', 
                    buttonUrl: news.url
                    })
                );
            }
        }
        else{
            // No news found
            agent.setFollowupEvent("no_news_found");
        }

        const quickReplies = new Suggestion({
            title: "Você deseja buscar por mais notícias?",
            reply: "⚽ Esportes"
        });
        quickReplies.addReply_("⚖️ Política");
        quickReplies.addReply_("🎥 Entretenimento");
        quickReplies.addReply_("🤩 Famosos");
        agent.add(quickReplies);
    }

});