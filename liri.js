require("dotenv").config();

//prject vars
var keys = require('./key');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
//var movieName = process.argv[3];
var inputFunction = process.argv[2];

var axios = require("axios");


//console.log("This is spotify: "+ spotify);
//console.log("This is Spotify: "+ Spotify);

//---------------------------------------------------------
//1. concert-this
//node liri.js concert-this <artist/band name here>
//search the bands in town API for an artist and print out
// Name of the Venue
// Venue location
// Date of the event and use moment to format it as MM/DD/YYYY
var concertThis = function (){
    var artist = process.argv[3];
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
       console.log(response.data);
       for(var i = 0; i<response.data.length; i++){
           console.log("-----------------------------");
           console.log(i+1+")");
           console.log("Name of Venue: "+ response.data[i].venue.name);
           console.log("Venue Location: "+ response.data[i].venue.city+", "+response.data[i].venue.country);
           console.log("Date: "+ response.data[i].datetime);
       }
    })
};

switch(inputFunction){
    case "concert-this":
        concertThis();
        break;
}


   


//----------------------------------------------------------
//2 spotify-this-song
//----------------------------------------------------------
//3. movie-this
//----------------------------------------------------------
//4. do-what-it-says
