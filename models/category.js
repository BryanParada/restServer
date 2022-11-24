const { Schema, model} = require('mongoose')
 
const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Category is required']
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Category', CategorySchema);