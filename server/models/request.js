var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RequestSchema = new Schema({
    case_id: {
        type: Schema.Types.ObjectId,
        ref: "Case"
    },
    device_id: Schema.Types.Number,
    longitude: Schema.Types.Number,
    latitude: Schema.Types.Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { 
    versionKey: false, 
    minimize: false
})

module.exports = mongoose.model('Request', RequestSchema)