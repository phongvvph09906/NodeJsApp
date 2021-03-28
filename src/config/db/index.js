const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.ala8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://localhost:27017/match_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect Successfully!!!');
    } catch (error) {
        console.log('Connect Failure!!!');
    }
}

module.exports = { connect };
