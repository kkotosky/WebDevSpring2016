module.exports = function(app, db, mongoose) {

    var userModel   = require("./models/user.model.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var fullQuizzesModel   = require("./models/full_quizzes.model.js")(db, mongoose);
    var fullQuizzesService = require("./services/full_quizzes.service.server.js")(app, fullQuizzesModel);
    var metaDataQuizzesModel   = require("./models/metadata_quizzes.model.js")(db, mongoose);
    var metaDataQuizzesService = require("./services/metadata_quizzes.service.server.js")(app, metaDataQuizzesModel);
};