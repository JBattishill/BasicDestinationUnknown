// Wikipedia Variables
var travelCity = ""
var travelCountry = ""

// Weather Variables
var travelLat = ""
var travelLong = ""
var weatherDateStart = ""
var weatherDateEnd = ""

// Season Start and end dates - for North and South Hemispheres
const startNorthWinter = "2020-12-01";
const endNorthWinter = "2021-02-28";

const startNorthSpring = "2021-03-01";
const endNorthSpring = "2021-05-31";

const startNorthSummer = "2021-06-01";
const endNorthSummer = "2021-08-31";

const startNorthAutumn = "2021-09-01";
const endNorthAutumn = "2021-11-31";

const startSouthSummer = "2020-12-01";
const endSouthSummer = "2021-02-28";

const startSouthAutumn = "2021-03-01";
const endSouthAutumn = "2021-05-31";

const startSouthWinter = "2021-06-01";
const endSouthWinter = "2021-08-31";

const startSouthSpring = "2021-09-01";
const endSouthSpring= "2021-11-31";

// Season Variables
const northWinter = ['december', 'january', 'february']
const northSpring = ['march', 'april', 'may']
const northSummer = ['june', 'july', 'august']
const northAutumn = ['september', 'october', 'november']

const southSummer = ['december', 'january', 'february']
const southAutumn = ['march', 'april', 'may']
const southWinter = ['june', 'july', 'august']
const southSpring = ['september', 'october', 'november']

// Geolocation Variables
var geoKey = "234979e2ff9e423095e4b2c869c1c97b";
var hemisphere = "";

//GoogleAPI Variables
var altImageKey = "AIzaSyBxx6AQZClDeZ0easaXPDvnjd0-Gc6RDd8";
var testImageKey ="AIzaSyBTVa6aO4sDlu7EPqm5jvvejyD4nQWC8yw";
var imageKey = "AIzaSyDpsLn14cZzKJi0o0lQhMmwplnjl5wLN74";
var imageSearchID = '474f1fff433d047cf';
var searchQuery = "";
var travelSeason = "";

function getPhotos(){    
    $(document).ready(function () {        
        var url = 'https://www.googleapis.com/customsearch/v1?imgSize=LARGE&imgType=photo&siteSearchFilter=i&imgColorType=color&searchType=image&num=9&key=' 
        + imageKey + '&cx=' + imageSearchID + '&q=' + searchQuery;
        
        console.log(url)
        $.getJSON(url, function (apiData) {

          for (var i = 0; i < apiData.items.length; i++) {
            var item = apiData.items[i];
                    var imgSrc = item.link;
                    var imgAlt = item.title;
                    var imgTitle = item.snippet;
            // Make sure HTML in item.htmlTitle is escaped.
            var imgtag = $('<img class=""src='+ imgSrc + ' alt=' + imgAlt + ' title=' + imgTitle + '>')
            $('.resultPhotos').append(imgtag)
        }
    });
    var userLocation = document.getElementById('travelLocation').value;
    var photoCity = $('<h1 class= "capMonth">').html('What ' + userLocation + ' can look like in in ' + travelSeason);
    $('.photoHeading').append(photoCity);
});


// this came in handy when I sliced the time down in get weather

        // Unsuccessful attempt - Array slicing for image formatting
        // I attempted to slice apiData into array of arrays that were each only 3 items long.
        // I then put those arrays into indiviudally named arrays and parse through with a for loop appending each to different row in a CSS flex grid.
        // From what I could see I successfully sliced 1 item into each array and could push that to the row.
        // Paused for now, may return to this in class with Ben next week

        //    var dataArr = apiData.items
        //    var imgArr1 = dataArr.slice(0,3);
        //    var imgArr2 = dataArr.slice(0,3);
        //    var immArr3 = dataArr.slice(0,3);

        //     console.log(dataArr)

        //     imgArr1 = dataArr[0]
        //     imgArr2 = dataArr[1]
        //     imgArr3 = dataArr[2]

        //     console.log(imgArr1)
        //     console.log(imgArr2)
        //     console.log(imgArr3)



        //     for (var i = 0; i < imgArr1.length; i++) {
        //     var item = imgArr1[i];
        //             var imgSrc = item.link;
        //             var imgAlt = item.title;
        //     // Make sure HTML in item.htmlTitle is escaped.
        //     var imgtag = $('<img src='+ imgSrc + ' alt=' + imgAlt + '>')
        //     $('.containerPhotos1').append(imgtag)
        //     }

        //     for (var i = 0; i < imgArr2.length; i++) {
        //         var item = imgArr2.items[i];
        //                 var imgSrc = item.link;
        //                 var imgAlt = item.title;
        //         // Make sure HTML in item.htmlTitle is escaped.
        //         var imgtag = $('<img src='+ imgSrc + ' alt=' + imgAlt + '>')
        //         $('.containerPhotos2').append(imgtag)
        //     }

        //     for (var i = 0; i < imgArr3.length; i++) {
        //         var item = imgArr3.items[i];
        //                 var imgSrc = item.link;
        //                 var imgAlt = item.title;
        //         // Make sure HTML in item.htmlTitle is escaped.
        //         var imgtag = $('<img src='+ imgSrc + ' alt=' + imgAlt + '>')
        //         $('.containerPhotos3').append(imgtag)
        //     };
        //   })
}

function getWeather(){
    // Calls functions to get timestamps for weatherData
    if (hemisphere === "North") {
        getStampNorth();}
        else  {
        getStampSouth();
        }

    $(document).ready(function () {

    var url =  'https://archive-api.open-meteo.com/v1/era5?latitude=' + travelLat+ '&longitude=' + travelLong + '&start_date=' +
         weatherDateStart + '&end_date=' + weatherDateEnd + '&timezone=auto&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum'
       
    $.getJSON(url, function (weatherData) {
    
    var item = weatherData.daily;

    // cannot get targetted location or historical data atm but here is some random data from Moscow
    // This was really a logic check to make sure I could do things, I can format things and change temps etc later. 
    
    // variables target relevant data from the API
    var calcMaxTemp = item.temperature_2m_max;
    var calcMinTemp = item.temperature_2m_min;
    var calcRainfall = item.rain_sum;
    var calcSnowfall = item.snowfall_sum;
    var calcSunrise = item.sunrise;
    var calcSunset = item.sunset;
    var timezone = weatherData.timezone

    // Slicing time down to HH:MM - I set it to use 45th day as a hacky solution for finding the median of the season...  
    // (3 months is ~90 days, 45 is half of 90, big math...)
    // The better solution would be finding the real median.

    var avgSunrise = (calcSunrise[45].slice(-5));
    var avgSunset = (calcSunset[45].slice(-5));

    var avgMaxTemp = (calcMaxTemp.reduce((a,b) => (a+b)) / calcMaxTemp.length);
    var avgMinTemp = (calcMinTemp.reduce((a,b) => (a+b)) / calcMinTemp.length);
    var avgRainfall = (calcRainfall.reduce((a,b) => (a+b)) / calcRainfall.length);
    var avgSnowfall = (calcSnowfall.reduce((a,b) => (a+b)) / calcSnowfall.length);

    var storeMaxTemp = avgMaxTemp.toFixed(1);
    var storeMinTemp = avgMinTemp.toFixed(1);
    var storeSunrise = avgSunrise;
    var storeSunset = avgSunset;
    var storeRainfall = avgRainfall.toFixed(2);
    var storeSnowfall = avgSnowfall.toFixed(2);


    // Get Content on the page
    
    // Creating display variables for the different items
    var maxTemp = $('<h3>').html('Max Temp: ' + storeMaxTemp + '&#8451');
    var minTemp = $('<h3>').html('Min Temp: ' + storeMinTemp + '&#8451');
    var sunrise = $('<h3>').html('Sunrise: ' + storeSunrise);
    var sunset = $('<h3>').html('Sunset: ' + storeSunset);
    var rainfall = $('<h3>').html('Rainfall: ' + storeRainfall + 'mm');
    var snowfall = $('<h3>').html('Snowfall: ' + storeSnowfall + 'mm');
    var timezone = $('<h3>').html('Timezone: ' + timezone);
   
     // Appending the display variables to relevant container ID
    $('.containerWeather').append(
        maxTemp,minTemp,sunrise,sunset,rainfall,snowfall,timezone
    );
    }); 
   });
}

function getStampNorth(){

    if (travelSeason === "Winter"){
        weatherDateStart = startNorthWinter
        weatherDateEnd = endNorthWinter}

    else if (travelSeason === "Spring"){
        weatherDateStart = startNorthSpring
        weatherDateEnd = endNorthSpring}
       
       
    else if (travelSeason === "Summer"){
        weatherDateStart = startNorthSummer
        weatherDateEnd = endNorthSummer}
            
    else if (travelSeason === "Autumn"){
        weatherDateStart = startNorthAutumn
        weatherDateEnd = endNorthAutumn}

    else {console.log("There was an issue with function getStampNorth")}
}

function getStampSouth(){
    if (travelSeason === "Winter"){
        weatherDateStart = startSouthWinter
        weatherDateEnd = endSouthWinter}

    else if (travelSeason === "Spring"){
        weatherDateStart = startSouthSpring
        weatherDateEnd = endSouthSpring}
       
    else if (travelSeason === "Summer"){
        weatherDateStart = startSouthSummer
        weatherDateEnd = endSouthSummer}
            
    else if (travelSeason === "Autumn"){
        weatherDateStart = startSouthAutumn
        weatherDateEnd = endSouthAutumn}

    else {console.log("There was an issue with function getStampSouth")}
}

function getWikiInfo(){

    $(document).ready(function () {

    var url =  'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + travelCity + travelCountry + '&utf8=&format=json&origin=*'

    console.log(url)
    $.getJSON(url, function (wikiData) {
    
    console.log(wikiData)
    var item = wikiData.query.search[0];

    // cannot get targetted location or historical data atm but here is some random data from Moscow
    // This was really a logic check to make sure I could do things, I can format things and change temps etc later. 
    
    // variables target relevant data from the API
    var storeTitle = item.snippet;
    var storeSnippet = item.snippet;

    // Get Content on the page
    
    // Creating display variables for the different items
    var title = $('<h4>').html(storeTitle);
    var snippet = $('<p>').html(storeSnippet);
   
     // Appending the display variables to relevant container ID
    $('.containerInfo').append(title,snippet);
    }); 
   });
}

function findHemisphere(){

    // function to test if Latitude is above or below the Equator and calling season finder
    if (travelLat > 0) {
    hemisphere = "North",
    findSeasonNorth();
    }

    else {
    hemisphere = "South",
    findSeasonSouth();
    }
}

function getData(){    
    $(document).ready(function () {
        var userLocation = document.getElementById('travelLocation').value;
        
        var url = 'https://api.geoapify.com/v1/geocode/search?text=' + userLocation + '&limit=1&format=json&apiKey=' + geoKey;

        $.getJSON(url, function (apiData) {
        
        var item = apiData.results[0];
        
        //variables to make it easier to target relevant data from the API
        var storeCity = item.city;
        var storeCountry = item.country;
        var storeLat = item.lat;
        var storeLong = item.lon;
        var userMonth = travelMonth;
        
        // Storing city and country in variables to be used by APIs
        travelCity = storeCity
        travelCountry = storeCountry

        // lat and long needs to be 2 decimal places for WeatherAPI
        travelLat = storeLat.toFixed(2);
        travelLong = storeLong.toFixed(2);

        findHemisphere()

     // Get Content on the page
        
        // Importing month from user input
        var userMonth = document.getElementById('travelMonth').value;
    
        // Creating display variables for the different items
        var city = $('<h2>').html('City: ' + storeCity);
        var country = $('<h3>').html('Country: ' + storeCountry);
        var long = $('<h4>').html('Longitude: ' + travelLong);
        var lat = $('<h4>').html('Latitude: ' + travelLat);
        var hemi = $('<h4>').html('Hemisphere: ' + hemisphere);
        var month = $('<h4 class="capitilise">').html('Month: ' + userMonth);  
        var season = $('<h4>').html('Season: ' + travelSeason);
        
         // Appending the display variables to relevant container ID
        $('.containerLocation').append(city,country,long,lat,hemi,month,season);
        
        // Removing submit button and replacing with reset button
        document.getElementById("submitBtn").classList.add('hidden');
        document.getElementById("resetBtn").classList.remove('hidden');
        document.getElementById("idLocation").classList.remove('hidden');

        // Set search query
        searchQuery = (userLocation + " in " + travelSeason);
        console.log(searchQuery);

        // calling function to get weather from OpenWeather API
        getWeather()

        // calling function to get Photos from google image search API, filtered to images from www.unsplash.com
        getPhotos()

        getWikiInfo()

        });
    });
}

function findSeasonNorth() {
    var userMonth = document.getElementById('travelMonth').value.toLowerCase()

    if (northWinter.includes(userMonth)){
        travelSeason = "Winter"}

    else if (northSpring.includes(userMonth)){
        travelSeason = "Spring"}

    else if (northSummer.includes(userMonth)){
        travelSeason = "Summer"}

    else if (northAutumn.includes(userMonth)){
        travelSeason = "Autumn"}

    else {console.log("There was an issue with function findSeasonNorth ")}
    }

function findSeasonSouth() {
    var userMonth = document.getElementById('travelMonth').value.toLowerCase()

    if (southWinter.includes(userMonth)){
    travelSeason = "Winter"}
   
    else if (southSpring.includes(userMonth)){
    travelSeason = "Spring"}

    else if (southSummer.includes(userMonth)){
        travelSeason = "Summer"}   

    else if (southAutumn.includes(userMonth)){
        travelSeason = "Autumn"}

    else {
        console.log("There was an issue with function findSeasonSouth ")}
    }


    