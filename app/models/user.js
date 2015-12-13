var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//user Schema
var UserSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false},
  favorites: {} //how would we format the favorites parameter?
});

//hash the password before the user is saved
UserSchema.pre('save', function(next){
  var user = this;

  //hash the password only if the password has been changed or the user is new
  if (!user.isModified('password')) return next();

  //generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);

    //change the password to the hashed version
    user.password = hash;
    next();
  });
});

//method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password){
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
