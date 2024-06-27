const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    authors: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    fileCover: {
        type: String
    },
    fileName: {
        type: String
    },
});

module.exports = model("Books", booksSchema);