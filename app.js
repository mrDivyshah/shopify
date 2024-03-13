const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const webhookData = req.body;
    console.log('Received webhook data:', webhookData);
    // Process the webhook data here
    res.redirect('/webhook-handler'); // Respond to the webhook request
});


app.post('/webhook-handler', (req, res) => {
    const webhookData = req.body;
    console.log('Received webhook data:', webhookData);
    // Process the webhook data here
    res.sendStatus(200); // Respond to the webhook request
});

const server = http.createServer(app);

server.listen(port, () => {
    // console.log(`Webhook handler listening at https://localhost:${port}`);
    console.log(`Webhook handler listening at https://2d03-2402-3a80-e7a-2925-2510-db70-f432-be7d.ngrok-free.app/webhook-handler`);
});
