var model = require('./models');

exports.writeMessage = async (person, content) => {
    await model.Stt_log.log.create({
        date: new Date.now(),
        person: person,
        content: content
    }).then(result => {
        if (result){
            return true
        }

        return false
    }).catch(err => {
        console.log(err);
        return false
    });
}

// FIXME: roomId 받아야 함
exports.exportFile = async () => {

}