var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8000;

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    var emitir = (pos, val = 1) => {
        io.emit('novaPosicao', {
            pos: pos,
            val: val
        });
    }

    socket.on('direta', (data) => {
        console.log(data);
        emitir('direta', data.counter);
    });

    socket.on('esquerda', (data) => {
        console.log(data);
        emitir('esquerda', data.counter);
    });

    socket.on('cima', (data) => {
        console.log(data);
        emitir('cima', data.counter);
    });

    socket.on('baixo', (data) => {
        console.log(data);
        emitir('baixo', data.counter);
    });

    socket.on('zerar', (data) => {
        console.log(data);
        emitir('zerar', data.counter);
    });

});

server.listen(port, () => {
    console.log("Listening on port " + port);
});