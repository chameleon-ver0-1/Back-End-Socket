room = (mongoose) => {
    const schema = new mongoose.Schema({
        roomId: String,
        participant: [String],
        startTime: Date,
        endTime: Date,
        mainTopics: [{type: mongoose.Schema.Types.ObjectId, ref: 'topic'}]
    });

    return mongoose.model('room', schema);
};

topic = (mongoose) => {
    const schema = new mongoose.Schema({
        topicName: String,
        logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'log'}]
    });

    return mongoose.model('topic', schema);
};

log = (mongoose) => {
    const schema = new mongoose.Schema({
        time: Date,
        person: String,
        content: String
    });

    return mongoose.model('log', schema);
};

module.exports = (mongoose) => {
    return stt_log = {
        room: room(mongoose),
        topic: topic(mongoose),
        log: log(mongoose)
    };
}
