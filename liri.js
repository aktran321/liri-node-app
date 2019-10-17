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
console.log("WE ARE STARTING HERE--------AGAIN-----------------------------")
//The variable spotify is an object containing your client keys
//console.log("This is spotify: "+ spotify);
//console.log("keys.spotify: "+JSON.stringify(keys.spotify));
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
    concertSearch(artist);
};
var concertSearch = function(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        // console.log(response);
         for(var i = 0; i<response.data.length; i++){
             console.log("-----------------------------");
             console.log(i+1+")");
             console.log("Name of Venue: "+ response.data[i].venue.name);
             console.log("Venue Location: "+ response.data[i].venue.city+", "+response.data[i].venue.country);
             console.log("Date: "+ response.data[i].datetime);
         }
      })
}
var spotifyThisSong = function() {
    if(process.argv[3]){
        var song=process.argv[3];
    } else {
        var song = "The Sign"
    }
    spotifySearch(song);
}
//                     Needed to define song in function(song) or else spotifySearch does not work
var spotifySearch = function(song){
    spotify.search({type:"track",query:song, limit:1}, function(error,response){
        if (error){
            return console.log("Error Occurred: "+error);
        } else {
            console.log("The response worked and is right here: " +JSON.stringify(response));
            console.log("----------------------------");
            console.log("Song Name: "+response.tracks.items[0].name);
            console.log("Artist(s):");
            for(var i = 0;i<response.tracks.items[0].artists.length; i++){
                console.log(i+1+")"+response.tracks.items[0].artists[i].name);
            }
         console.log("Album Type: "+response.tracks.items[0].album.album_type);
         console.log("Album Name: "+response.tracks.items[0].album.name);
         console.log("Preview Link: "+ response.tracks.items[0].album.artists[0].external_urls.spotify);
        }
    })
}



var movieThis = function(){
    if(process.argv[3]){
        var movie = process.argv[3];
    }else{
        var movie = "mr.nobody";
    }
    movieSearch(movie);
    
}

var movieSearch = function(movie){
    axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
       console.log(response.data);
       console.log("--------------------------");
       console.log("Title: "+response.data.Title);
       console.log("Release Year: "+ response.data.Year);
       console.log("IMDB Rating: "+ response.data.imdbRating);
       console.log("Rotten Tomato Rating: "+ response.data.Ratings[1].Value);
       console.log("Country: "+response.data.Country);
       console.log("Language: "+ response.data.Language);
       console.log("Plot: "+ response.data.plot);
       console.log("Actors: "+ response.data.Actors);
   
  }
).catch(function(error){
    console.log("Error: +" + error);
});

}

var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8",function(error, data){
        if (error) {
            return console.log(error);
        }
        //"Take the text and splits it into an array."
        var commandArray = data.split(",");
        console.log(commandArray);

        if(commandArray[0]==="spotify-this-song"){
            spotifySearch(commandArray[1]);
        } else if(commandArray[0] === "movie-this"){
            movieSearch(commandArray[1]);
        } else if (commandArray[0] === "concert-this"){
            concertSearch(commandArray[1]);
        }
    } )
}

switch(inputFunction){
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
         break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}



// Still need to finish typing up code for the last function
// and to take care of formatting the play times in concert-this.city
// Everything else has been taken care of.