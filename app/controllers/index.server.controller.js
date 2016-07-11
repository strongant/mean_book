exports.render = function(req,res){
    if (req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    console.log(__dirname+'index.server.controller');
    console.log(req.user);
    
    res.render('index',{title:"Hello World",userFullName:req.user?req.user.fullName:''});
}
