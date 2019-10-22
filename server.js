var randomColor = require('randomcolor');
var controller = require('./controller');

var rooms_users = {};

const io = require('socket.io').listen(50000);

io.set('origins', '*:*');

io.sockets.on('connection', socket => {

    // connection 수신되면 Client에 connected 송신
    socket.emit('connection', {
        color: randomColor(),
        type : 'connected'
    });

    socket.on('connection', data => {

        // 새로 들어온 사용자면 해당 사용자에게는 welcome message와 color, 채팅방에는 해당 사용자 연결 메시지 송신
        if(data.type === 'join') {
            const room = data.room;
            console.log('join to room -*-*-> ' + room);

            socket.join(room);
            socket.room = room;

            if (!rooms_users[room]) {
                rooms_users[room] = ['member'];
                controller.createRoom(room);
            } else {
                // push defatut str value (to count)
                rooms_users[room].push('member');
            }

            console.log('in this room, ', rooms_users[room].length, ' people here.');

            // notice to me
            socket.emit('system', {
                message: '회의실에 입장하셨습니다.'
            });

            // notice to others
            name = 'system';
            message = `${data.name} 님이 회의에 참여하셨습니다.`;

            socket.broadcast.to(room).emit(name, {
                message : message
            });

            // log to DB
            try {
                controller.writeMessage(name, message);
            } catch (err) {
                console.log(err);
            }
        }
    });

    // 유저가 보낸 data(color, name, message) 그대로 채팅방에 echo
    socket.on('user', data => {
        var room = socket.room;

        console.log('==== topic: ', data.topic, '====');
        console.log('room = ' + room + ', name = ' + data.name + ', message = ' + data.message);

        if (room) {
            socket.broadcast.to(room).emit('message', data);

            // log to DB
            try {
                controller.writeMessage(data.name, data.message);
            } catch (err) {
                console.log(err);
            }
        }
    });

    socket.on('topic', data => {
        console.log("change topic!");
        socket.broadcast.to(room).emit('changeTopic', data);
    });

    socket.on('disconnect', data => {
        console.log('disconnect from room: ', socket.room);
        rooms_users[socket.room].pop();

        if (rooms_users[socket.room].length === 0) {
            controller.endLogging(socket.room);
        }
    });
});