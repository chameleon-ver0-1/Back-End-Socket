rooms = (mongoose) => {
    const schema = new mongoose.Schema({
        roomId: String,
        participant: [String],
        startTime: Date,
        endTime: Date,
        mainTopics: [{type: mongoose.Schema.Types.ObjectId, ref: 'topics'}]
    });

    return mongoose.model('rooms', schema);
};

topics = (mongoose) => {
    const schema = new mongoose.Schema({
        topicName: String,
        logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'logs'}]
    });

    return mongoose.model('topics', schema);
};

logs = (mongoose) => {
    const schema = new mongoose.Schema({
        time: Date,
        person: String,
        content: String
    });

    return mongoose.model('logs', schema);
};

module.exports = (mongoose) => {
    return stt_log = {
        rooms: rooms(mongoose),
        topics: topics(mongoose),
        logs: logs(mongoose)
    };
}
