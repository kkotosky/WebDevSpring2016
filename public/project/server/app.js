module.exports = function(app) {

    var userModel   = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);
    var fullQuizzesModel   = require("./models/full_quizzes.model.js")();
    var fullQuizzesService = require("./services/full_quizzes.service.server.js")(app, fullQuizzesModel);
    var metaDataQuizzesModel   = require("./models/metadata_quizzes.model.js")();
    var metaDataQuizzesService = require("./services/metadata_quizzes.service.server.js")(app, metaDataQuizzesModel);
}