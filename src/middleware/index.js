var requiresLogin = function(req, res, next){
	
	if(!req.session.account){
		return res.redirect('/');
	}
	
	next();
};

var requiresLogout = function(req, res, next){
	if(req.session.account){
		return res.redirect('/maker');
	}
	
	next();
};

var requireSecure = function(req, res, next){
	if(req.headers['x-forward-proto'] != 'https'){
		return res.redirect('https://' + req.hostname + req.url);
	}
	next();
};

var bypassSecure = function(req, res, next){
	next();
}

module.exports.requireLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if(process.env.NODE_ENV === "production"){
	module.exports.requireSecure = requireSecure;
}
else{
	module.exports.requireSecure = bypassSecure;
}