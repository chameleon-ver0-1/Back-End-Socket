const io = require('socket.io').listen(50000);
io.set('origins', '*:*');

io.sockets.on('connection', socket => {

    // connection 수신되면 Client에 connected 송신
    socket.emit('connection', {
        color: '#' + (Math.round()*0xffffff).toString(16),
        type : 'connected'
    });

    socket.on('connection', data => {

        // 새로 들어온 사용자면 해당 사용자에게는 welcome message와 color, 채팅방에는 해당 사용자 연결 메시지 송신
        if(data.type === 'join') {

            socket.join(data.room);
            socket.room = data.room;

            socket.emit('system', {
                message: '회의실에 입장하셨습니다.'
            });

            // TODO: 로컬 DB에 데이터 쌓기
            socket.broadcast.to(data.room).emit('system', {
                message : `${data.name} 님이 회의에 참여하셨습니다.`
            });
        }
    });

    // 유저가 보낸 data(color, name, message) 그대로 채팅방에 echo
    socket.on('user', data => {
        var room = socket.room;

        if (room) {
            // TODO: 로컬 DB에 데이터 쌓기
            socket.broadcast.to(room).emit('message', data);
        }
    });

});