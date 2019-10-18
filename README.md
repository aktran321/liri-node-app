# Liri-Node-App

Liri is a language interpretation and recognition interface. This application can take in user input and search for
a desired artist's concert dates, information about a song or information about a movie.

## Getting Started

To use this application, clone the repository. However, make sure to create your
own ".env" file to use the spotify API. Your ".env" file will look like this:

SPOTIFY_ID="Substitute your spotify ID number here"
SPOTIFY_SECRET="Substitute your spotify secret here"
### Installing

After cloning the repository and supplying your own .env file with the 
spotify id and secret keys that you can get from spotify, make sure to 
navigate to your folder where you cloned this application through terminal,
and install axios and moment.js

```
npm install axios
npm install moment
```

## Running the Commands

Now you should be ready to run LIRI. The four commands you may run are:
1. movie-this
2. concert-this
3. spotify-this-song
4. do-what-it-says

In the command line, you will type
```
node liri.js <desired command here> <name of movie/artist/song you are searching for>
```
If you want to run the do-what-it-says command, you do not need to input the name of what you are searching for, since the command will simply run what what is written in the random.txt file.
