// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const port     = Number(process.env.PORT || 8080);

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {

  res.render('index.ejs')

});

app.use(function (req, res, next){
	if(req.headers['x-forwarded-proto'] === 'https'){
		res.redirect('http://' + req.hostname + req.url);
	}else{
		next();
	}
});

app.listen(port);
console.log('The magic happens on port ' + port);
