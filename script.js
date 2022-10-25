// Random Location Variables
var randomLocations = [
    "Ubud, Indonesia",
    "New Orleans, USA",
    "Marrakesh, Morocco",
    "Male, Maldives",
    "Paris, France",
    "Cape Town, South Africa",
    "Dubrovnik, Croatia",
    "Tokyo, Japan",
    "Vancouver, Canada",
    "Los Angeles, USA",
    "Vernazza, Italy",
    "Buenos Aires, Argentina",
    "London, England",
    "Jaipur, India",
    "Havana, Cuba",
    "Christchurch, New Zealand",
    "Hydra, Greece",
  ];
  
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  // Weather Variables
  var weatherKey = "d9e3acc582b222c6021692be631852c5";
  var travelCity = "";
  var travelCountry = "";
  var travelLat = "";
  var travelLong = "";
  var weatherDateStart = "";
  var weatherDateEnd = "";
  var travelMonth = "";
  var travelLocation = "";
  
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
  const endSouthSpring = "2021-11-31";
  
  // Season Variables
  const northWinter = ["december", "january", "february"];
  const northSpring = ["march", "april", "may"];
  const northSummer = ["june", "july", "august"];
  const northAutumn = ["september", "october", "november"];
  
  const southSummer = ["december", "january", "february"];
  const southAutumn = ["march", "april", "may"];
  const southWinter = ["june", "july", "august"];
  const southSpring = ["september", "october", "november"];
  
  // Geolocation Variables
  var geoKey = "234979e2ff9e423095e4b2c869c1c97b";
  var hemisphere = "";
  
  //GoogleAPI Variables
  var altImageKey = "AIzaSyBxx6AQZClDeZ0easaXPDvnjd0-Gc6RDd8";
  var testImageKey = "AIzaSyBTVa6aO4sDlu7EPqm5jvvejyD4nQWC8yw";
  var imageKey = "AIzaSyDpsLn14cZzKJi0o0lQhMmwplnjl5wLN74";
  var imageSearchID = "474f1fff433d047cf";
  var searchQuery = "";
  var travelSeason = "";
  
  function delayLoad() {
    setTimeout(() => {
      userIP();
    }, 4000);
  }

//Function that watches the with the form and random button listening for the enter key - this is required because my form doesnt actually submit, it call the getData function.
$('.eventEnter').keydown(function(event) {
    //KeyCode 13 is Enter
    if (event.keyCode == 13) {
        getData();
        return false;
    }
    });

  function userIP() 
  {
    var urlIP = "https://api.techniknews.net/ipgeo/";
  
    $.getJSON(urlIP, function (ipData) {
      var storeIPLat = ipData.lat;
      var storeIPLon = ipData.lon;
      var storeIPCity = ipData.city;
      IPLat = storeIPLat.toFixed(2);
      IPLon = storeIPLon.toFixed(2);
  
      var url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        IPLat +
        "&lon=" +
        IPLon +
        "&appid=" +
        weatherKey;
  
      console.log(url);
      $.getJSON(url, function (ipWeatherData) {
        var item = ipWeatherData;
  
        //API sends temp in Kelvin, minus 273.15 to get Celcius
        var ipTemp = item.main.temp - 273.15;
        var roundedTemp = ipTemp.toFixed(1);
  
        var ipWeather = item.weather[0].description;
  
        // Creating text to go in the header block
        var showIPCity = $("<h1>").html(
          "It looks like you are in " + storeIPCity
        );
        var showIPWeather = $("<h2>").html(
          "The weather is currently " +
            ipWeather +
            " and " +
            roundedTemp +
            " &#8451"
        );
        var showIPTemp = $('<h3 class="topSpace">').html(
          "Time to head somewhere exciting?"
        );
  
        $(".containerHeader").append(showIPCity, showIPWeather, showIPTemp);
  
        document.getElementById("loadingContent").classList.add("hidden");
        document.getElementById("header").classList.remove("hidden");
        document.getElementById("contentHider").classList.remove("hidden");
      });
    });
  }
  
  function getPhotos() {
    $(document).ready(function () {
      var url =
        "https://www.googleapis.com/customsearch/v1?imgSize=LARGE&imgType=photo&siteSearchFilter=i&imgColorType=color&searchType=image&num=9&key=" +
        testImageKey +
        "&cx=" +
        imageSearchID +
        "&q=" +
        searchQuery;
  
      console.log(url);
      $.getJSON(url, function (apiData) {
        for (var i = 0; i < apiData.items.length; i++) {
          var item = apiData.items[i];
          var imgSrc = item.link;
          var imgAlt = item.title;

          //This puts the image snippet as the image title which shows when hovering over image.
          var imgTitle = item.snippet;
          
          // Make sure HTML in item.htmlTitle is escaped.
          var imgtag = $(
            "<img src=" +
              imgSrc +
              " alt=" +
              imgAlt +
              " title=" +
              imgTitle +
              ">"
          );
          $(".resultPhotos").append(imgtag);
        }
      });
      var photoCity = $('<h2 class= "capMonth">').html(
        "What " +
          travelCity +
          " " +
          travelCountry +
          " can look like in " +
          travelSeason
      );
      $(".photoHeading").append(photoCity);
  
      document.getElementById("body").classList.add(travelSeason);
      document.getElementById("infoHider").classList.remove("hidden");
  
      setTimeout(() => {
        window.scroll(0, 600);
      }, 1000);
    });
  }
  
  function getWeather() {
    // Calls functions to get timestamps for weatherData
    if (hemisphere === "North") {
      getStampNorth();
    } else {
      getStampSouth();
    }
  
    $(document).ready(function () {
      var url =
        "https://archive-api.open-meteo.com/v1/era5?latitude=" +
        travelLat +
        "&longitude=" +
        travelLong +
        "&start_date=" +
        weatherDateStart +
        "&end_date=" +
        weatherDateEnd +
        "&timezone=auto&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum";
  
      $.getJSON(url, function (weatherData) {
        var item = weatherData.daily;
  
        var maxTemp = $("<h3>").html("Max Temp: " + storeMaxTemp + "&#8451");
        var minTemp = $("<h3>").html("Min Temp: " + storeMinTemp + "&#8451");
  
        // variables target relevant data from the API
        var calcMaxTemp = item.temperature_2m_max;
        var calcMinTemp = item.temperature_2m_min;
        var calcRainfall = item.rain_sum;
        var calcSnowfall = item.snowfall_sum;
        var calcSunrise = item.sunrise;
        var calcSunset = item.sunset;
        var timezone = weatherData.timezone;
  
        // Slicing time down to HH:MM - I set it to use 45th day as a hacky solution for finding the median of the season...
        // (3 months is ~90 days, 45 is half of 90, big math...)
        // The better solution would be finding the real median.
  
        var avgSunrise = calcSunrise[45].slice(-5);
        var avgSunset = calcSunset[45].slice(-5);
  
        var avgMaxTemp = calcMaxTemp.reduce((a, b) => a + b) / calcMaxTemp.length;
        var avgMinTemp = calcMinTemp.reduce((a, b) => a + b) / calcMinTemp.length;
        var avgRainfall =
          calcRainfall.reduce((a, b) => a + b) / calcRainfall.length;
        var avgSnowfall =
          calcSnowfall.reduce((a, b) => a + b) / calcSnowfall.length;
  
        var storeMaxTemp = avgMaxTemp.toFixed(1);
        var storeMinTemp = avgMinTemp.toFixed(1);
        var storeSunrise = avgSunrise;
        var storeSunset = avgSunset;
        var storeRainfall = avgRainfall.toFixed(2);
        var storeSnowfall = avgSnowfall.toFixed(2);
  
        // Get Content on the page
  
        // Creating display variables for the different items
        var maxTemp = $("<h3>").html("Max Temp: " + storeMaxTemp + "&#8451");
        var minTemp = $("<h3>").html("Min Temp: " + storeMinTemp + "&#8451");
        var sunrise = $('<p class="topSpace">').html("Sunrise: " + storeSunrise);
        var sunset = $("<p>").html("Sunset: " + storeSunset);
        var rainfall = $("<p>").html("Rainfall: " + storeRainfall + "mm");
        var snowfall = $("<p>").html("Snowfall: " + storeSnowfall + "mm");
        var timezone = $("<p>").html("Timezone: " + timezone);
  
        // Appending the display variables to relevant container ID
        $(".containerWeather").append(
          maxTemp,
          minTemp,
          sunrise,
          sunset,
          rainfall,
          snowfall,
          timezone
        );
      });
    });
  }
  
  function getStampNorth() {
    if (travelSeason === "Winter") {
      weatherDateStart = startNorthWinter;
      weatherDateEnd = endNorthWinter;
    } else if (travelSeason === "Spring") {
      weatherDateStart = startNorthSpring;
      weatherDateEnd = endNorthSpring;
    } else if (travelSeason === "Summer") {
      weatherDateStart = startNorthSummer;
      weatherDateEnd = endNorthSummer;
    } else if (travelSeason === "Autumn") {
      weatherDateStart = startNorthAutumn;
      weatherDateEnd = endNorthAutumn;
    } else {
      console.log("There was an issue with function getStampNorth");
    }
  }
  
  function getStampSouth() {
    if (travelSeason === "Winter") {
      weatherDateStart = startSouthWinter;
      weatherDateEnd = endSouthWinter;
    } else if (travelSeason === "Spring") {
      weatherDateStart = startSouthSpring;
      weatherDateEnd = endSouthSpring;
    } else if (travelSeason === "Summer") {
      weatherDateStart = startSouthSummer;
      weatherDateEnd = endSouthSummer;
    } else if (travelSeason === "Autumn") {
      weatherDateStart = startSouthAutumn;
      weatherDateEnd = endSouthAutumn;
    } else {
      console.log("There was an issue with function getStampSouth");
    }
  }
  
  function findHemisphere() {
    // function to test if Latitude is above or below the Equator and calling season finder
    if (travelLat > 0) {
      (hemisphere = "North"), findSeasonNorth();
    } else {
      (hemisphere = "South"), findSeasonSouth();
    }
  }
  
  function getData() {
    $(document).ready(function () {
      var travelLocation = document.getElementById("travelLocation").value;
  
      var url =
        "https://api.geoapify.com/v1/geocode/search?text=" +
        travelLocation +
        "&limit=1&format=json&apiKey=" +
        geoKey;
  
      $.getJSON(url, function (apiData) {
        var item = apiData.results[0];
  
        //variables to make it easier to target relevant data from the API
        var storeCity = item.city;
        var storeCountry = item.country;
        var storeLat = item.lat;
        var storeLong = item.lon;
  
        // Storing city and country in variables to be used by APIs
        travelCity = storeCity;
        travelCountry = storeCountry;
  
        // lat and long needs to be 2 decimal places for WeatherAPI
        travelLat = storeLat.toFixed(2);
        travelLong = storeLong.toFixed(2);
  
        // Importing month from user input
        travelMonth = document.getElementById("travelMonth").value;
  
        // I spent an hour trying to figure out why calling it kept crashing while I was calling findHemisphere before setting the travelMonth variable...
  
        //Find hemisphere of location
        findHemisphere();
  
        // Get Content on the page
  
        // Creating display variables for the different items
        var city = $("<h3>").html("City: " + storeCity);
        var country = $("<h3>").html("Country: " + storeCountry);
        var long = $('<p class = "topSpace">').html("Longitude: " + travelLong);
        var lat = $("<p>").html("Latitude: " + travelLat);
        var hemi = $("<p>").html("Hemisphere: " + hemisphere);
        var month = $('<p class="capitilise">').html("Month: " + travelMonth);
        var season = $("<p>").html("Season: " + travelSeason);
  
        // Appending the display variables to relevant container ID
        $(".containerLocation").append(
          city,
          country,
          long,
          lat,
          hemi,
          month,
          season
        );
  
        // Removing submit button and replacing with reset button
        document.getElementById("submitBtn").classList.add("hidden");
        document.getElementById("resetBtn").classList.remove("hidden");
        document.getElementById("idLocation").classList.remove("hidden");
        document.getElementById("randomBtn").classList.add("hidden");
        
  
        // Set search query
        searchQuery = travelLocation + " in " + travelSeason;
        console.log(searchQuery);
  
        // calling function to get weather from OpenWeather API
        getWeather();
  
        // calling function to get Photos from google image search API, filtered to images from www.unsplash.com
        getPhotos();
      });
    });
  }
  
  function findSeasonNorth() {
    var userMonth = travelMonth.toLowerCase();
    console.log(travelMonth);
    console.log(userMonth);
  
    if (northWinter.includes(userMonth)) {
      travelSeason = "Winter";
    } else if (northSpring.includes(userMonth)) {
      travelSeason = "Spring";
    } else if (northSummer.includes(userMonth)) {
      travelSeason = "Summer";
    } else if (northAutumn.includes(userMonth)) {
      travelSeason = "Autumn";
    } else {
      console.log("There was an issue with function findSeasonNorth ");
    }
  }
  
  function findSeasonSouth() {
    var userMonth = travelMonth.toLowerCase();
    console.log(travelMonth);
    console.log(userMonth);
  
    if (southWinter.includes(userMonth)) {
      travelSeason = "Winter";
    } else if (southSpring.includes(userMonth)) {
      travelSeason = "Spring";
    } else if (southSummer.includes(userMonth)) {
      travelSeason = "Summer";
    } else if (southAutumn.includes(userMonth)) {
      travelSeason = "Autumn";
    } else {
      console.log("There was an issue with function findSeasonSouth ");
    }
  }
  
  function getRandom() {
    // I should explain how this works...
    const randomTravel = Math.floor(Math.random() * randomLocations.length);
    console.log(randomTravel, randomLocations[randomTravel]);
    travelLocation = (randomTravel, randomLocations[randomTravel]);
  
    const randomMonth = Math.floor(Math.random() * month.length);
    travelMonth = (randomMonth, month[randomMonth]);
  
    document.getElementById("travelLocation").value = travelLocation;
    document.getElementById("travelMonth").value = travelMonth;
  }

  //not needed anymore


    // getData();
    
    // var url =
    //   "https://api.geoapify.com/v1/geocode/search?text=" +
    //   travelLocation +
    //   "&limit=1&format=json&apiKey=" +
    //   geoKey;
  
    // $.getJSON(url, function (apiData) {
    //   var item = apiData.results[0];
  
    //   //variables to make it easier to target relevant data from the API
    //   var storeCity = item.city;
    //   var storeCountry = item.country;
    //   var storeLat = item.lat;
    //   var storeLong = item.lon;
  
    //   // Storing city and country in variables to be used by APIs
    //   travelCity = storeCity;
    //   travelCountry = storeCountry;
  
    //   // lat and long needs to be 2 decimal places for WeatherAPI
    //   travelLat = storeLat.toFixed(2);
    //   travelLong = storeLong.toFixed(2);
  
    //   findHemisphere();
  
    //   // Get Content on the page
  
    //   // Creating display variables for the different items
    //   var city = $("<h2>").html("City: " + storeCity);
    //   var country = $("<h3>").html("Country: " + storeCountry);
    //   var long = $("<h4>").html("Longitude: " + travelLong);
    //   var lat = $("<h4>").html("Latitude: " + travelLat);
    //   var hemi = $("<h4>").html("Hemisphere: " + hemisphere);
    //   var month = $('<h4 class="capitilise">').html("Month: " + travelMonth);
    //   var season = $("<h4>").html("Season: " + travelSeason);
  
    //   // Appending the display variables to relevant container ID
    //   $(".containerLocation").append(
    //     city,
    //     country,
    //     long,
    //     lat,
    //     hemi,
    //     month,
    //     season
    //   );
  
    //   // Removing submit button and replacing with reset button
    //   document.getElementById("submitBtn").classList.add("hidden");
    //   document.getElementById("randomBtn").classList.add("hidden");
    //   document.getElementById("resetBtn").classList.remove("hidden");
  
    //   // Set search query
    //   searchQuery = storeCity + storeCountry + " in " + travelSeason;
    //   console.log(searchQuery);
  
    //   // calling function to get weather from OpenWeather API
    //   getWeather();
  
    //   // calling function to get Photos from google image search API, filtered to images from www.unsplash.com
    //   getPhotos();
    // });
//   }
  