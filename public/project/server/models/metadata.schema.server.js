module.exports = function(mongoose) {
    // use mongoose to declare a movie schema
    var MetaQuizSchema = mongoose.Schema({
        title: String,
        _id: String,
        createdBy: String,
        description: String
    }, {collection: 'project.metaQuizzes'});
    return MetaQuizSchema;
};