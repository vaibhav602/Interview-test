const express = require('express');

const bodyparser = require('body-parser');
const jwt=require('jsonwebtoken');

// import mongoose
const mongoose = require('mongoose');
const cors = require('cors');

var app = require('express')();
app.use(bodyparser.json())
var http = require('http').Server(app);

// import path
 const path = require('path');
 app.use(cors());


const environments = require('./environments/environment');


require('./routes/user')(app);   

 


// header middleware

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,Content-type, Authorization, x-access-token');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// cors middleware
//app.options('*', cors());


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public') + '/index.html')
})





/*======================NODEJS WITH JWT ===============*/
app.post('/api/posts', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });

app.post('/api/login', (req, res) => {
    // Mock user

    const username="vaibhav"
      const password="vaibhav@1"
       
       let p_username = req.body.username
       let p_password = req.body.password
       console.log(req.body)
       if(p_username == username && p_password == password){
                // res.json('logged in')



    const user = {
      id: 1, 
      username: 'vgupta',
      email: 'vaibhavgupta290498@gmail.com'
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
      res.json({
        token
      });
    });
}
else
    {
     res.json('error')
    }

  });

function verifyToken(req, res, next) {
    
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined') {

      const bearer = bearerHeader.split(' ');
     
      const bearerToken = bearer[1];
     
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
/*==================NODEJS WITH JWT END==============*/

mongoose.connect(
    environments.MONGO_URL + '/' + environments.DB_NAME, {
        useNewUrlParser: true
    })
.then((db) => {
    console.log(`Worker  Connected to DB ${environments.DB_NAME} Successfully!`);
})
.catch((e) => {
    console.log("error occured in db connection: ", e);
})





http.listen(5000, () => {
    console.log(`Server Started. Listening on 5000 !`);
});