var model = require('./models');
var mongoXlsx = require('mongo-xlsx')
var fs = require('fs');

exports.writeMessage = async (person, content) => {
    await model.Stt_log.log.create({
        date: new Date(Date.now()),
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
};

// FIXME: roomId 받아야 함
exports.exportFile = async () => {
    await model.Stt_log.log.find().sort('createdAt').then(data => {
        let model = mongoXlsx.buildDynamicModel(data);

        mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
            console.log('File saved at:', data.fullPath); 
        });
    });
};