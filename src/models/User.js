const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: {
        type: String
    },
    name: {
        type: String
    },
    email: { type: String }
});

module.exports = model("User", userSchema);
