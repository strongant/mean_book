exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  req.session.lastVisit = new Date();
  console.log(__dirname + 'index.server.controller');
  console.log(req.user);
  var figureurl_qq_2, figureurl_2;
  if (req.user&&req.user.provider==='qq') {
    if (req.user && req.user.prividerData) {
      var providerDataObj = JSON.parse(req.user.prividerData);
      if (providerDataObj.figureurl_qq_2) {
        figureurl_qq_2 = providerDataObj.figureurl_qq_2;
      }
      if (providerDataObj.figureurl_2) {
        figureurl_2 = providerDataObj.figureurl_2;
      }
    }
  }else if (req.user&&req.user.provider==='google'&&req.user.prividerData) {
    figureurl_2 = req.user.prividerData.image.url?req.user.prividerData.image.url:'';
  }



  res.render('index', {
    title: "Hello World",
    user:JSON.stringify(req.user),
    userFullName: req.user ? req.user.username : '',
    figureurl_qq_2: figureurl_qq_2||'',
    figureurl_2: figureurl_2||''
  });
};
