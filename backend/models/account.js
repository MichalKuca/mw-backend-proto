const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const accountSchema = mongoose.Schema({
    email: {type: String, required: true, uniqe: true},
    password: { type: String, required: true},
    firstName: { type: String},
    lastName: { type: String}
})

accountSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Account", accountSchema);