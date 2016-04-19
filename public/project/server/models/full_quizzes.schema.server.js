module.exports = function(mongoose) {
    // use mongoose to declare a movie schema
    var FullQuizSchema = mongoose.Schema({
        _id: String,
        title: String,
        description:String,
        multi:Boolean,
        question:String,
        headers: [ String ],
        columns: Number,
        rows: Number,
        createdBy:String,
        answers1: [ String ],
        answers2: [ String ],
        answers3: [ String ],
        answers4: [ String ],
        answers5: [ String ],
        answers6: [ String ],
        answers7: [ String ],
        answers8: [ String ],
        questions1: [ String ],
        questions2: [ String ],
        questions3: [ String ],
        questions4: [ String ],
        questions5: [ String ],
        questions6: [ String ],
        questions7: [ String ],
        questions8: [ String ]
    }, {collection: 'project.fullQuizzes'});

    return FullQuizSchema;
};