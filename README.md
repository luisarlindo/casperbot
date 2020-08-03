# Casper-bot
Chatbot para reunir notícias. Mini-Projeto realizado como etapa do processo seletivo do time de bots.

## Fufillments
O chatbot foi feito utilizando um agente do Dialogflow integrado com o Facebook Messenger. Para fazer as solicitações de notícias foi necessário um Webhook de fufillments.

Foi implementado uma Firebase Function para retornar um carrousel com as notícias do tema escolhido.

Para coletar as notícias, esta função faz chamadas à [News API](https://newsapi.org/) retornando notícias em português do tema selecionado.
