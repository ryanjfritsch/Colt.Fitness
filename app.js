
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());


app.use(express.static(__dirname + '/assets'));

var port = process.env.PORT || 3000;

// EMAIL SENDING
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '****************',
    pass: '****************'
  }
});


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/signup', function(req, res){
    res.sendFile(path.join(__dirname+'/assets/html/signup.html'));
});

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname+'/assets/html/about.html'));
});

app.post('/submitform', function(req, res){
    //console.log("SUBMITTED");
    var client = req.body;
    //console.log("REQ.BODY:", req.body);
    var mailOptions = draftEmail(client);
    sendEmail(mailOptions);
    //console.log("EMAILED");

    res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    res.end();
});


app.listen(port);

function sendEmail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

// Client Object = {
//     name = ""
//     email = ""
//     phone = ""
//         ~street = ""
//         ~city = ""
//         ~state = ""
//         ~zipcode = ""
//     goals = []
//     equipment = []
//     diet = ""
//     injury = ""
//         ~additionalText = ""
//     commitment = ""
// }

function draftEmail(client){

    var message = "A new client just signed up! Here is the information they provided:\n\n"+
                  "CONTACT INFO\n" +
                  "Name : " + client.name + "\n" +
                  "Email: " + client.email + "\n";
                  if(client.phone){ message +=  "Phone: " + client.phone + "\n"; }
                  message += "\n";


                  if(client.street || client.city || client.state || client.zip){
                      message += "ADDRESS\n";
                      if(client.street){ message += "Street: " + client.street + "\n"; }
                      if(client.city){ message +=  "City   : " + client.city + "\n"; }
                      if(client.state){ message += "State : " + client.state + "\n"; }
                      if(client.state){ message += "Zip    : " + client.zipcode + "\n"; }
                      message += "\n"
                  }

                  var goalsString = "";
                  for(var i = 0; i < client.goals.length; i++){
                      goalsString += client.goals[i];
                       if(i != client.goals.length - 1) goalsString += ", ";
                  }
                  message += "GOALS:\n" + goalsString + "\n\n";

                  var equipmentString = "";
                  for(var i = 0; i < client.equipment.length; i++){
                      equipmentString += client.equipment[i];
                       if(i != client.equipment.length - 1) equipmentString += ", ";
                  }
                  message += "CURRENT EQUIPMENT:\n" + equipmentString + "\n\n";


                  message += "CURRENT DIET/WORKOUT REGIMEN:\n" + client.diet + "\n\n";

                  message += "INJURIES:\n" + client.injury + "\n\n";

                  if(client.additionalText){
                      message += "ADDITIONAL COMMENTS:\n" + client.additionalText + "\n\n";
                  }

                  message += "COMMITMENT LEVEL:\n" + client.commitment + "\n\n";



    var mailOptions = {
      from: 'colt.fitness.info@gmail.com',
      to: 'colt.fitness.info@gmail.com',
      subject: 'You Have a New Client!',
      text: message
    };

    return mailOptions;
}
