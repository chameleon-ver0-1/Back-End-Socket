room = (mongoose) => {
    const schema = new mongoose.Schema({
        roomId: String,
        topics: [String],
        logs: [{type: mongoose.Schema.Types.ObjectId, ref: 'log'}]
    },
    {
      timestamps: true
    });

    return mongoose.model('room', schema);
};

log = (mongoose) => {
    const schema = new mongoose.Schema({
        person: String,
        content: String,
        topic: String,
        roomId: String
    },
    {
      timestamps: true
    });

    return mongoose.model('log', schema);
};

module.exports = (mongoose) => {
    return stt_log = {
        room: room(mongoose),
        log: log(mongoose)
    };
}
