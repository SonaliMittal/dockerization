const mongoose= require("mongoose");

const voteSchema= new mongoose.Schema({
    title:{type:String, required:false},
    author:{type:String, required:false}
});
module.exports=mongoose.model('Vote',voteSchema);