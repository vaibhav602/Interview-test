const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
email: {
        type: String
       },
name: String,
gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
mobile: String,
image : String,
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
