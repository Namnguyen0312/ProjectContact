const mongoose = require('mongoose');
mongoose.set('debug', true);
const Schema = mongoose.Schema;

const ContactSchame = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: String, require: true },
        favorite: { type: String, require: true},
        description: { type: String, require: true},
    },
    {
        versionKey: false,
    },
);
module.exports = mongoose.model('Contact', ContactSchame);