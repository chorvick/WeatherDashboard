///// this is where the action will take place javascript will be written here
//// open weather api key is bfe778d8ee4fe1d07c2fd96feb41c947
var myApiKey = "bfe778d8ee4fe1d07c2fd96feb41c947";


////make an array for holding cities previously searched 
var cities = [];
var queryString = ""
var data
var makeList


/// use moment js to display todays date at top
var momdate = moment();
momdate = (momdate.format("MMMM Do YYYY"));

var thetime = $("#currentDay");
thetime.text(momdate);
//$("div").css("border", "2px solid black"); /// putting border around my divs so i can 
/// easily see where they are will remove later 
$(document).ready(function () {


    /// store cities searched to an array --  problem is it is storing blanks also
    $("#btn").click(function () {
        var txt = $("#form1").val();
        //console.log(txt);
        cities.push(txt);
        numCities = cities.length
        localStorage.setItem(numCities, JSON.stringify(txt));
        console.log(cities);



        var storedData = JSON.parse(window.localStorage.getItem(cities.length))
        console.log(storedData);
        var makeList = $("<p></p>").text(storedData);

        $("ul").append(makeList);
        $("#searchHistory").val(storedData);




        queryString = "https://api.openweathermap.org/data/2.5/weather?q=" + txt + "&units=imperial&appid=" + myApiKey;




        $.ajax({
            url: queryString,
            method: "get",

        }).then(function (theAnswer) {
            console.log(theAnswer);
            var city = theAnswer.name;
            console.log(city);
            var temperature = theAnswer.main.temp;
            temperature = Math.floor(temperature);
            console.log("in " + city + " it is " + temperature + " degrees");
            var humidity = theAnswer.main.humidity;
            console.log(humidity);
            var wind = theAnswer.wind.speed;
            wind = Math.floor(wind);
            var lat = theAnswer.coord.lat;
            var lon = theAnswer.coord.lon;
            console.log(lat);
            console.log(lon);

            $("#currentTemp").text(temperature + " F");
            $("#currentCity").text(city);
            $("#currentWind").text(wind + " MPH");
            $("#currentHumid").text(humidity + " %");



            // format for ONE CALL WEATHER API CAN GET 5 DAY AND UV


            queryString2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + myApiKey;

            ///alert(queryString2);


            $.ajax({
                url: queryString2,
                method: "get",
            }).then(function (theAnswer2) {
                console.log("second api info is " + theAnswer2);
                var uvi = theAnswer2.current.uvi;
                console.log(uvi);
                var test = theAnswer2.current.sunrise;
                console.log(test);
                console.log(theAnswer2);
                $("#currentUv").text(uvi);




            });


            //// have second api call working and can get and manipulate
            //// data

            /// lots of work to do to get 5 day forcast stored and
            // displayed, also will need to use jquerry to
            //// change color need cities with high uvi to 
            //// test or can just change value in code to 
            /// fake values,..... finally some progress




















            ///////////now that we can get the data we need in a format we understand from the
            ////////weather api, i can refine this code to use jquerry and write the necessary information
            ////to the page --- with fetch i was unable to access the data, and unable to 
            /// find resources that would let me acces it, also kept getting many errors
            /// in the console trying to just pull the information up
            /// i am guessing that the open weather api just works better with ajax 
            /// even though our instructor stated this is not the best way to call
            //info from an api and fetch was the method used in class examples 
            /// i wasted almost two days with no progress on this project
            // now i can see it moving along and getting finished 


        })
    })
})
// will use cities array to hold cities user searches for
//  will write to local storage ... maybe not necessary
// will have to add blocks or cards to index html to hold information
// will use specific class or id tags to write that information
//  once i figure out how to call the information from the 
// open weather api


// as for the uv indix part of this assignment i am going to 
// leave that for last, seems the hardest part based on reading the
//documentation for the api -- the uv info will no longer work after
//April 2021 however the alternative they give requires calls by
//lat and long which seems like a whole mess of trouble
// to get that information i would literally have to 
// keep data on the lat and long of every city in the world for it
// to work ??  

// need to get page working and api working just calling up
// regular five day forcasts for multiple cities first then
// will worry about what to do with the uv issue









