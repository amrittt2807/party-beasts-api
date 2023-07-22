const mongoose = require('mongoose');


const bookmarkedSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    bookmarks:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Venue",
            required: true,
        }
    ]
})

module.exports = mongoose.model("Bookmarks", bookmarkedSchema);