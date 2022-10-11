// Variable to hold hemisphere
var key = "234979e2ff9e423095e4b2c869c1c97b";

// Variables for future data
var userLocation = "";
var hemisphere = "";
var travelSeason = "";
var seasonTest = "";

// Season Variables
const northWinter = ['December', 'January', 'February']
const northSpring = ['March', 'April', 'May']
const northSummer = ['June', 'July', 'August']
const northAutumn = ['September', 'October', 'November']

const southSummer = ['December', 'January', 'February']
const southAutumn = ['March', 'April', 'May']
const southWinter = ['June', 'July', 'August']
const southSpring = ['September', 'October', 'November']


// function testSeason(){
//     var userMonth = document.getElementById('travelMonth').value;
    
//     if (seasonTest == seasonsNorthHemi)
//     for (i in seasonsNorthHemi){
//     console.log([i])
//     console.log("North")
//     }

//     else 
//     for (i in seasonsSouthHemi){
//     console.log([i])
//     console.log("South")
//     }
    
//     $('.containerSeason').append(userMonth,travelSeason);

// }

function findSeasonNorth() {
    var userMonth = document.getElementById('travelMonth').value

    if (northWinter.includes(userMonth)){
        console.log('Winter')
        travelSeason = "Winter"
    }
   
    else if (northSpring.includes(userMonth)){
        console.log('Spring')
        travelSeason = "Spring"
    }

    else if (northSummer.includes(userMonth)){
        console.log('Summer')
        travelSeason = "Summer"
    }


    else if (northAutumn.includes(userMonth)){
        console.log('Autumn')
        travelSeason = "Autumn"
    }

    else {console.log("There was an issue with function findSeasonNorth ")}
}

function findSeasonSouth() {
    var userMonth = document.getElementById('travelMonth').value

    if (southWinter.includes(userMonth)){
    console.log('Winter')
    travelSeason = "Winter"
    }
   
    else if (southSpring.includes(userMonth)){
    console.log('Spring');
    travelSeason = "Spring"
    }

    else if (southSummer.includes(userMonth)){
        console.log('Summer');
        travelSeason = "Summer"
    }   

    else if (southAutumn.includes(userMonth)){
        console.log('Autumn');
        travelSeason = "Autumn"
    }

    else {
        console.log("There was an issue with function findSeasonSouth ")
    }
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
        
        // Testing if Lattitude is above or below the Equator and calling season finder
        if (storeLatt > 0) {
        hemisphere = "North",
        findSeasonNorth();
        }

        else {
        hemisphere = "South",
        findSeasonSouth();
         }

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

