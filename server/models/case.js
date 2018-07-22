var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CaseSchema = new Schema({
    case_id: Schema.Types.Number,
    resolved: Schema.Types.Boolean
}, { 
    versionKey: false, 
    minimize: false
})

module.exports = mongoose.model('Case', CaseSchema)