const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Store connected clients
const clients = new Set();

// Handle GET requests to '/'
app.get('/', (req, res) => {
    res.json({ message: 'Hello from webhook handler!' });
});

// Handle POST requests to '/'
app.post('/', (req, res) => {
    const webhookData = req.body;
    console.log('Received webhook data:', webhookData);
    
    // Send the received data to all connected clients
    clients.forEach(client => {
        client.write(`data: ${JSON.stringify(webhookData)}\n\n`);
    });

    res.sendStatus(200);
});

// Handle GET requests to '/events'
app.get('/events', (req, res) => {
    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Store the client connection
    clients.add(res);

    // Handle client disconnection
    req.on('close', () => {
        clients.delete(res);
    });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Webhook handler listening at http://localhost:${port}`);
});
