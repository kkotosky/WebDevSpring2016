module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var UserStatsSchema = mongoose.Schema({
        username: String,
        gamesPlayed: Number,
        average: Number,
        priorQuizzes: [String],
        lastPlayed: String,
        _id : String
    }, {collection: 'project.userstats'});

    return UserStatsSchema;
};