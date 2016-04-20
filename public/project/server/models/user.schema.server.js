module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var UserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        email:String,
        _id:String,
        admin:Boolean
    }, {collection: 'project.user'});

    return UserSchema;
};