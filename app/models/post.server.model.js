var  PostSchema = new Schema({
    title:{
         type:String,
         required:true
    },

    content:{
         type:String,
         required:true
    },
    author:{
        type:Schema.ObjectId,
        ref:'User'
    }
});

mongoose.model('Post',PostSchema);


//使用方式
/*
var user = new User();
user.save();

var post = new Post();
post.author = user;
post.save();
//创建博客

//使用查询
Post.find().populate('author').exec(function(err,posts){
    ...
});
*/
