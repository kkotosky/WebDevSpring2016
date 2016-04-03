module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        label:String,
        _id:String,
        type: {
            type: String,
            enum: ['TEXT', 'TEXTAREA', 'EMAIL','PASSWORD','OPTIONS','DATE','RADIOS','CHECKBOXES']
        },
        placeholder: String,
        options: [{label:String, value:String}]
    }, {collection: 'assignment.field'});

    return FieldSchema;
};