const ws = require('ws');

const ws_server = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))

ws_server.on('connection', function connection(ws) {
    // ws.id = Date.now()
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch(message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message) {
// function broadcastMessage(message, ws_id) {
    ws_server.clients.forEach(client => {
        // if(client.id === ws_id) {
        //     client.send(JSON.stringify(message))
        // }
        client.send(JSON.stringify(message))
    })
}

const message = {
    event: 'message/connection',
    id: 1,
    date: '26.01.2021',
    username: 'Oleksandr',
    message: 'test message'
}