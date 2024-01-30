const mongoose = require("mongoose")
const User = require("./User")
const ContactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    name: String,
    email: String,
    phone: String
})

module.exports = mongoose.model("Contact", ContactSchema)