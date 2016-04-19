module.exports = function(app, db, mongoose) {

    var projectUserModel   = require("./models/user.model.js")(db, mongoose);
    var projectUserService = require("./services/user.service.server.js")(app, projectUserModel);
    var fullQuizzesModel   = require("./models/full_quizzes.model.js")(db, mongoose);
    var fullQuizzesService = require("./services/full_quizzes.service.server.js")(app, fullQuizzesModel);
    var metaDataQuizzesModel   = require("./models/metadata_quizzes.model.js")(db, mongoose);
    var metaDataQuizzesService = require("./services/metadata_quizzes.service.server.js")(app, metaDataQuizzesModel);
    var userStatsModel   = require("./models/user_stats.model.js")(db, mongoose);
    var userStatsService = require("./services/user_stats.service.server.js")(app, userStatsModel);
};