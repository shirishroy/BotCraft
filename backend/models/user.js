const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    interest: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
