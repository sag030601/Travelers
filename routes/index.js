var express = require('express');
const { route } = require('../app');
var router = express.Router();


const usermodel = require('./users')

// for login logout register work below file are imp 

const passport = require('passport');
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(usermodel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login',function(req,res){
  res.render('account');
})

router.get('/account',function(req,res){
  res.render('account')
})

router.get('/register-page',function(req,res){
  res.render('register')
})

router.get('/profile', isLoggedIn,function (req, res) {
  const username = req.user.username;
  res.render('profile', { username: username });
})


// register code 
router.post('/register',function(req,res){
    var userData = new usermodel({
      username : req.body.username,
      password : req.body.password,
    });

    usermodel.register(userData,req.body.password,function(err,registeredUser){
      if(err){
        console.error(err);
       return res.redirect('/register-page')
      }

      passport.authenticate('local')(req,res,function(){
        res.redirect('/login');
      })
    })
})
// register code 


// login code 
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login'
}))
// login code 


// isLoggedIn
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/register-page");
  
}
// isLoggedIn


module.exports = router;
