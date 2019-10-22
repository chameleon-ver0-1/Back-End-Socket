var model = require('./models');
var request = require('request');

exports.writeMessage = async (roomId, person, content, topic) => {
    try {
        var logId;

        // insert log
        await model.Stt_log.log.create({
            person: person,
            content: content,
            topic: topic,
            roomId: roomId
        }).then(result => {
            if (result){
                logId = result._id;
            }

            return false;
        });

        // insert into room
        await model.Stt_log.room.findOneAndUpdate(
            { roomId: roomId },
            { $push: { logs : logId }}
        ).then(result => {
            if (result){
                console.log(result);
                return true;
            }

            console.log('Error!');
            return false;
        });

    } catch (err) {
        console.log('Internal Server Error');

        return false;
    }
};

exports.createRoom = async (roomId) => {
    await model.Stt_log.room.create({
        roomId: roomId
    }).then(result => {
        if (result) {
            return true
        }

        return false
    });
}

exports.endLogging = async (roomId) => {
    console.log('here is roomId for summary => '+roomId);

    var OPTIONS = {
        headers: {'Content-Type': 'application/json'},
        json: true,
        url: 'https://s.chameleon4switch.cf/flask/summary',
        body: {roomId: roomId}
    };

    request.post(OPTIONS, (err, res, result) => {
        if (err) {
            // console.log('Error occured during endLogging');
            console.log('Error occured during Testing: ', err);
        }

        console.log('====By TextRank====');
        console.log(res);
        console.log(result);
    });
};
