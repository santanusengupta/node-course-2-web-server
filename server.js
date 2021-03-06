const express = require('express');
const hbs = require('hbs');
const fs =require('fs');
//var multer  = require('multer');
//var path  = require('path');

const port = process.env.PORT || 3000;

var app = express();
//app.use(express.static(__dirname)+'/public');

//hbs.registerPartials(__dirname+'/views/partials');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method}:${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err) =>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintanence.hbs');
// });

app.use(express.static('public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});


app.get('/',(req, res)=>{
  //res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name:'Santanu',
    like:[
      'Movie',
      'Outing'
    ]
  })*/
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to My Website'
  });
});

app.get('/about',(req,res)=>{
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle:'About Page',
    welcomeMessage:'Welcome to My Website about'
  });
});

app.get('/project',(req,res)=>{
  //res.send('About Page');
  res.render('project.hbs',{
    pageTitle:'Portfolio Page',
    welcomeMessage:'Welcome to My First Node.js Project'
  });
});

// /bad-Send back json with errorMessage
app.get('/bad',(req, res)=>{
  //res.send('<h1>Hello Express!</h1>');
  res.send({
    errorMessage:'Unable to Handle'
  })
});


app.listen(port,()=>{
  console.log('Server is up on port:'+ port);
});
