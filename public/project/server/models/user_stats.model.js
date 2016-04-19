var q = require("q");

module.exports = function(db, mongoose) {
    var api = {
        findStats: findStats,
        updateStats: updateStats,
        deleteStats: deleteStats,
        createStats: createStats
    };

    var userstatsSchema = require('./user_stats.schema.server.js')(mongoose);
    var userstatsModel = mongoose.model("ProjectUserStats", userstatsSchema);

    return api;

    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function findStats(username) {
        var def = q.defer();
        userstatsModel.find({username:username}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function createStats(stats) {
        var def = q.defer();
        userstatsModel.create(stats, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function deleteStats(username) {
        var def = q.defer();
        userstatsModel.remove({username:username}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function updateStats(username, stats) {
        var def = q.defer();
        userstatsModel.findOne({username:username},function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                doc.average = stats.average;
                doc.lastPlayed = stats.lastPlayed;
                doc.gamesPlayed = stats.gamesPlayed;
                doc.priorQuizzes = stats.priorQuizzes;
                doc.save();
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};