const mongoose = require('mongoose');
mongoose.set('debug', true);
const Schema = mongoose.Schema;

const AccountSchame = new Schema(
    {
        name: { type: String, require: true },
        username: { type: String, require: true },
        password: { type: String, require: true },
        phone: { type: String, require: true},
        mycontacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contact',
            },
        ],
    },
    {
        versionKey: false,
    },
);
module.exports = mongoose.model('Account', AccountSchame);