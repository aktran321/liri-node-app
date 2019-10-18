require("dotenv").config();
var keys = require('./key');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var inputFunction = process.argv[2];
var spotify = new Spotify(keys.spotify);

//Start of code for concert-this------------------------------------------------------
var concertThis = function (){
    var artist = process.argv.slice(3).join(" ");
    concertSearch(artist);
};

var concertSearch = function(artist){
    artist = artist.replace(/['"]+/g, '');
    axios.get("https://rest.bandsintown.com/artists/" + artist + 
    "/events?app_id=codingbootcamp").then(function(response){
         for(var i = 0; i<response.data.length; i++){
             
             console.log("-----------------------------");
             console.log(i+1+")");
             console.log("Name of Venue: "+ response.data[i].venue.name);
             console.log("Venue Location: "+ response.data[i].venue.city+", "+response.data[i].venue.country);
             console.log("Date: "+ moment(response.data[i].datetime).format("MM/DD/YYYY"));
         }
      })
}
//Start of code for spotify-this-song---------------------------------------------------------
var spotifyThisSong = function() {
    if(process.argv[3]){
        var song=process.argv.slice(3).join(" ");
    } else {
        var song = "The Sign Ace of Base"
    }
    spotifySearch(song);
}
var spotifySearch = function(song){
    spotify.search({type:"track",query:song, limit:1}, function(error,response){
        if (error){
            return console.log("Error Message: "+error);
        } else {
            //console.log("The response worked and is right here: " +JSON.stringify(response));
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
//Start of code for movie-this------------------------------------------------------------
var movieThis = function(){
    if(process.argv[3]){
        var movie = process.argv.slice(3).join(" ");
    }else{
        var movie = "mr.nobody";
    }
    movieSearch(movie);    
}
//start of movie seach function-----------------------------------------------------------
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

}//End of movie search function-------------------------------------------------------------

//Start of dowhatitsays function------------------------------------------------------------
var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8",function(error, data){
        if (error) {
            return console.log(error);
        }
        //"Take the text and splits it into an array."
        var commandArray = data.split(",");
       // console.log(commandArray);

        if(commandArray[0]==="spotify-this-song"){
            spotifySearch(commandArray[1]);
        } else if(commandArray[0] === "movie-this"){
            movieSearch(commandArray[1]);
        } else if (commandArray[0] === "concert-this"){
            concertSearch(commandArray[1]);
        }
    } )
}//End of dowhatitsays function--------------------------------------------------------------

//Switch statement must be placed below the defined functions
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