const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const db = {};

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var mongodb = mongoose.connection;

mongodb.on('error', console.error);
mongodb.once('open', function() {
    console.log("Connected to mongodb server");
});
mongoose.connect('mongodb://localhost/develop', {useNewUrlParser : true});

db.mongoose = mongoose;
db.Stt_log = require('./stt_log')(db.mongoose);

module.exports = db;