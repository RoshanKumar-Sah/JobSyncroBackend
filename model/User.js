const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    validate:{
        validator: async function (value){
            let existingEmail = await mongoose.models.User.findOne({email : value})
            if(existingEmail){
                return false
            }
        },
        message: "Account already exists"
    },
    set: function(value){
        return value.toLowerCase()
    }
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema)