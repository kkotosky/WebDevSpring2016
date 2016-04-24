var mock = require("./user.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        findByUsername: findByUsername,
        findById: findById,
        findByUserCredentials: findByUserCredentials,
        updateUser: updateUser,
        findUserByGoogleId: findUserByGoogleId
    };
    var userSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model("User", userSchema);

    return api;

    function ensureUserInFormat(user){
        return {
            username: user.username || "",
            password: user.password || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            emails: [user.email] || "",
            roles:user.roles,
            _id : user._id || "",
            phones: user.phones || ""
        };

    }
    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }
    function createUser(user) {
        // insert new user with mongoose user model's create()
        var newUser = ensureUserInFormat(user);
        if (newUser.username == 'alice') {
            newUser.roles = ['admin'];
        } else {
            newUser.roles = ['student'];
        }
        return UserModel.create(newUser);
    }
    function deleteUser(id) {
        return UserModel.remove({_id:id});
    }
    function findAllUsers() {
        console.log("findallusers2");
        return UserModel.find({});
    }
    function findByUsername(username) {
        return UserModel.findOne({username:username});
    }
    function findById(id) {
        return UserModel.findOne({_id:id});
    }
    function findByUserCredentials(username, password) {
        return UserModel.findOne({username:username, password:password});
    }
    function updateUser(id, user) {
        var newUser = ensureUserInFormat(user);
        return UserModel.update({_id:id}, newUser);
    }
};