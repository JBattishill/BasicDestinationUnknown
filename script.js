// Wikipedia Variables

// Weather Variables
var weatherKey = "dcc0a4770fed667dbb2a12e8f1a86009"
var travelTime = ""
var destinationLat = "48.85"
var destinationLon = "2.34"

// Timestamp Variables - North and South Hemispheres
const stampNorthWinter = "1514768400";
const stampNorthSpring = "1522548000";
const stampNorthSummer = "1530410400";
const stampNorthAutumn = "1538359200";

const stampSouthSummer = "1514768400";
const stampSouthAutumn = "1522548000";
const stampSouthWinter = "1530410400";
const stampSouthSpring = "1538359200";

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
        var url = 'https://www.googleapis.com/customsearch/v1?imgSize=LARGE&imgType=photo&siteSearchFilter=i&imgColorType=color&searchType=image&num=9&key=' + testImageKey + '&cx=' + imageSearchID + '&q=' + searchQuery;
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
    var photoCity = $('<h1 class= "capMonth">').html(userLocation + ' in ' + travelSeason);
    $('.photoHeading').append(photoCity);
});

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
    var userLocation = document.getElementById('travelLocation').value;
    // var url = 'http://history.openweathermap.org/data/3.0/history/locations/create?lat=' + destinationLat + '&lon=' + destinationLon + '&dt=' + travelTime + '&appid=' + weatherKey


    var url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=' + weatherKey;     
    $.getJSON(url, function (weatherData) {
    
        console.log(weatherData)

    var item = weatherData.list[0];
    console.log(item)

    // cannot get targetted location or historical data atm but here is some random data from Moscow
    // This was really a logic check to make sure I could do things, I can format things and change temps etc later. 
    
    
    // variables target relevant data from the API
    var storeTemp = item.main.temp;
    var storeFeels = item.main.feels_like;
    var storeHumidity = item.main.humidity;
    var storeWind = item.wind.speed;
    var storeWeather = item.weather[0].main;
    var storeCloud = item.weather[0].description;
    var storeCity = weatherData.city.name;


    // Get Content on the page
    
    // Creating display variables for the different items
    var temp = $('<h3>').html('Temp: ' + storeTemp);
    var feels = $('<h3>').html('Temp Feels like: ' + storeFeels);
    var humidity = $('<h3>').html('Humidity: ' + storeHumidity);
    var wind = $('<h3>').html('Wind: ' + storeWind);
    var weatherMain = $('<h3>').html('Weather Main: ' + storeWeather);
    var description = $('<h3 class="capitilise">').html('Description: ' + storeCloud);  
    var icon = $('<h2>').html('City: '+ storeCity);
    
     // Appending the display variables to relevant container ID
    $('.containerWeather').append(icon,temp,feels,humidity,wind,weatherMain,description);
    
    }); 
   });
}

function getStampNorth(){
    console.log(travelTime)

    if (travelSeason === "Winter"){
        travelTime = stampNorthWinter}

    else if (travelSeason === "Spring"){
        travelTime = stampNorthSpring}
       
    else if (travelSeason === "Summer"){
            travelTime = stampNorthSummer}
            
    else if (travelSeason === "Autumn"){
            travelTime = stampNorthAutumn}

    else {console.log("There was an issue with function getStampNorth")}
    console.log(travelTime)
}

function getStampSouth(){
    console.log(travelTime)
    if (travelSeason === "Winter"){
        travelTime = stampSouthWinter}


    else if (travelSeason === "Spring"){
        travelTime = stampSouthSpring}
       
    else if (travelSeason === "Summer"){
            travelTime = stampSouthSummer}
            
    else if (travelSeason === "Autumn"){
            travelTime = stampSouthAutumn}

    else {console.log("There was an issue with function getStampSouth")}
    console.log(travelTime)
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
        var storeLatt = item.lat
        var storeLong = item.lon
        var userMonth = travelMonth;
        
        // Testing if Lattitude is above or below the Equator and calling season finder
        if (storeLatt > 0) {
        hemisphere = "North",
        findSeasonNorth();
        }

        else {
        hemisphere = "South",
        findSeasonSouth();
         }

     // Get Content on the page
        
        // Importing month from user input
        var userMonth = document.getElementById('travelMonth').value;
    
        // Creating display variables for the different items
        var city = $('<h1>').html('City: ' + storeCity);
        var country = $('<h2>').html('Country: ' + storeCountry);
        var long = $('<h4>').html('Longitude: ' + storeLong);
        var latt = $('<h4>').html('Lattitude: ' + storeLatt);
        var hemi = $('<h4>').html('Hemisphere: ' + hemisphere);
        var month = $('<h2 class="capitilise">').html('Month: ' + userMonth);  
        var season = $('<h2>').html('Season: ' + travelSeason);
        
         // Appending the display variables to relevant container ID
        $('.containerLocation').append(city,country,long,latt,hemi,month,season);
        
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
        // getPhotos()

        });
    });
}

// Season Variables
const northWinter = ['december', 'january', 'february']
const northSpring = ['march', 'april', 'may']
const northSummer = ['june', 'july', 'august']
const northAutumn = ['september', 'october', 'november']

const southSummer = ['december', 'january', 'february']
const southAutumn = ['march', 'april', 'may']
const southWinter = ['june', 'july', 'august']
const southSpring = ['september', 'october', 'november']

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


    