module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var UserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        emails:[String],
        _id:String,
        google:   {
                id:    String,
                token: String
        },
        phones:[String],
        roles: [String]
    }, {collection: 'assignment.user'});

    return UserSchema;
};