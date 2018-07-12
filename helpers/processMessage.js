const API_AI_TOKEN = '9f5448b4d9334061866bfb699b7e5487';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAJD5KyNDNoBAPMzz0C4tJW4HDljjZB140LpNEThRL6sulf1Gh6IfKrZAiPBIFHg1D7zHhicUcP6RTOA8GuOE1xOd7oLbajoK9rtetgZACyytlwyAitq8SiRQIZA9XBpLn31fP169uvFeCQlUjZBe8WyqH2vIXSRDzQe6uQUGwwZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url:    'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json:   {
            recipient:  { id: senderId },
            message:    { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'exbotics'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};