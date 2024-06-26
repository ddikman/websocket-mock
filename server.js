const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const maxTime = 600;
const minTime = 500;

async function handle(ws, data) {
  if (data.type == 'brew') {
    ws.send(JSON.stringify({ status: 'started' }));
    const time  = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
    setTimeout(() => {
      const status = Math.random() > 0.2 ? 'done' : 'error';
      ws.send(JSON.stringify({ status }));
    }, time);
  }
}

wss.on('connection', function connection(ws) {
  console.log('A new client connected.');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Add some delay before sending back the result
    setTimeout(() => {
      const response = 'Success';
      // const response = 'Error';
      console.log('sending: ' + response)
      ws.send(response);
    }, 5000 + Math.floor(Math.random() * 10000));

  });

  ws.on('close', function() {
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server started on ws://localhost:8080');
