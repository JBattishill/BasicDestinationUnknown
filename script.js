// Variable to hold Keys
var geoKey = "234979e2ff9e423095e4b2c869c1c97b";
var altImageKey = "AIzaSyBxx6AQZClDeZ0easaXPDvnjd0-Gc6RDd8"
var imageKey = "AIzaSyDpsLn14cZzKJi0o0lQhMmwplnjl5wLN74"
var imageSearchID = '474f1fff433d047cf'

// Variables for future data
var hemisphere = "";
var travelSeason = "";
var searchQuery = "";

function getPhotos(){    
    $(document).ready(function () {        
        var url = 'https://www.googleapis.com/customsearch/v1?searchType=image&num=9&key=' + altImageKey + '&cx=' + imageSearchID + '&q=' + searchQuery;
        console.log(url)
        $.getJSON(url, function (apiData) {

          for (var i = 0; i < apiData.items.length; i++) {
            var item = apiData.items[i];
                    var imgSrc = item.link;
                    var imgAlt = item.title;
            // Make sure HTML in item.htmlTitle is escaped.
            var imgtag = $('<img class=""src='+ imgSrc + ' alt=' + imgAlt + '>')
            $('.resultPhotos').append(imgtag)
           
        }
    });
    var userLocation = document.getElementById('travelLocation').value;
    var photoCity = $('<h1 class= "capMonth">').html(userLocation);
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

        // Set search query
        searchQuery = ("Tourist" + userLocation + travelSeason);
        console.log(searchQuery);

        // calling function to get Photos from google image search
        getPhotos()

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


    