// Variable to hold hemisphere
var key = "234979e2ff9e423095e4b2c869c1c97b";

// Variables for future data
var userLocation = "";
var hemisphere = "";
var travelSeason = "";
var seasonTest = "";

var seasonsNorthHemi =[
    ['Winter' ['December', 'January', 'February']],
    ['Spring' ['March', 'April', 'May']],
    ['Summer' ['June', 'July', 'August']],
    ['Autumn' ['September', 'October', 'November']]
];

var seasonsSouthHemi =[
    ['Summer' ['December', 'January', 'February']],
    ['Autumn' ['March', 'April', 'May']],
    ['Winter' ['June', 'July', 'August']],
    ['Spring' ['September', 'October', 'November']]
];

function testSeason(){
    var userMonth = document.getElementById('travelMonth').value;
    
    if (seasonTest == seasonsNorthHemi)
    for (i in seasonsNorthHemi){
    console.log([i])
    console.log("North")
    }

    else 
    for (i in seasonsSouthHemi){
    console.log([i])
    console.log("South")
    }
    
    $('.containerSeason').append(userMonth,travelSeason);

}

function getData(){    
    $(document).ready(function () {
        var userLocation = document.getElementById('travelLocation').value;
        
        var url = 'https://api.geoapify.com/v1/geocode/search?text=' + userLocation + '&limit=1&format=json&apiKey=' + key;

        $.getJSON(url, function (apiData) {
        
        console.log('im here');
        
        console.log(apiData);
        
        var item = apiData.results[0];
        
        //variables to make it easier to target relevant data from the API
        var storeCity = item.city;
        var storeCountry = item.country;
        var storeLatt = item.lat
        var storeLong = item.lon
        var userMonth = travelMonth;
        
        // Testing if Lattitude is above or below the Equator
        if (storeLatt > 0)
        hemisphere = "North",
        seasonTest = "seasonsNorthHemi"
        else 
        hemisphere = "South"
        seasonTest = "seasonsSouthHemi"
        
     // // Appending Content to the page
        // // create a variable for the title, make it a h2 and add the text
        var userMonth = document.getElementById('travelMonth').value;

        var city = $('<h1>').html('City: ' + storeCity);
        var country = $('<h2>').html('Country: ' + storeCountry);
        var long = $('<h4>').html('Longitude: ' + storeLong);
        var latt = $('<h4>').html('Lattitude: ' + storeLatt);
        var hemi = $('<h4>').html('Hemisphere: ' + hemisphere);
        var month = $('<h2>').html('Month: ' + userMonth);  
        var season = $('<h2>').html('Season: ' + travelSeason);
        
        $('.containerLocation').append(city,country,long,latt,hemi,month,season);
        
        document.getElementById("submitBtn").classList.add('hidden');;
        document.getElementById("resetBtn").classList.remove('hidden');
        document.getElementById("seasonBtn").classList.remove('hidden');
        });

    });
        
}

