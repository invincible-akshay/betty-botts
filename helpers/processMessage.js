const API_AI_TOKEN = '9f5448b4d9334061866bfb699b7e5487';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAJD5KyNDNoBAOO2ei7obmSPzrfr0uW6nnWq6y46CoQWu6kpH8jzUWaLCd2XMKx30CBk9lpActfEi9fJlqHkmJ4a44UnJQu3JW0QYXcyNNd6OvTDQVmdt3hhRWMDY9ZBun3NfTibOsfAA6Y9bNtvcGlJyHKpVdn5sr0POdAZDZD';
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