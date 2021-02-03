///// this is where the action will take place javascript will be written here
//// open weather api key is bfe778d8ee4fe1d07c2fd96feb41c947
var myApiKey = "bfe778d8ee4fe1d07c2fd96feb41c947";


////make an array for holding cities previously searched - the arrays fiveDayh are the next five day forcast of humidity
/// and fiveDayt will hold the next five days of temperature forcast in impereal units rounded with math floor
// makeList is used to keep track of previously searched cities and queryString is cleared each time this calls the
// open weather api
var cities = [];
var queryString = ""
var data
var makeList
var fiveDayh = ["1", "2", "3", "4", "5"];
var fiveDayt = ["1", "2", "3", "4", "5"];


/// use moment js to display todays date at top also defined next five days to print to cards for five day forcast
/// mamdate1 is one day after today momdate2 is two days after today ect....
var momdate = moment();
var momdate1 = moment();
var momdate2 = moment();
var momdate3 = moment();
var momdate4 = moment();
var momdate5 = moment();

momdate = (momdate.format("MMMM Do YYYY"));


/// using moment for dates for 5 day forcast need it to display properly to each card not showing utc tmie ect... 
/// mamdate1 is one day after today momdate2 is two days after today ect.... 

momdate1 = moment().add(1, 'days').format("MMMM Do YYYY");

momdate2 = moment().add(2, 'days').format("MMMM Do YYYY");

momdate3 = moment().add(3, 'days').format("MMMM Do YYYY");

momdate4 = moment().add(4, 'days').format("MMMM Do YYYY");

momdate5 = moment().add(5, 'days').format("MMMM Do YYYY");

///// this puts the date of todays weather and increases the font weight a bit for better readability

var thetime = $("#currentDay").css("font-weight", "400");

thetime.text(momdate)
////adding date to cards for five day forcast 
var thetime1 = $("#day1").css("font-weight", "400");
var thetime2 = $("#day2").css("font-weight", "400");
var thetime3 = $("#day3").css("font-weight", "400");
var thetime4 = $("#day4").css("font-weight", "400");
var thetime5 = $("#day5").css("font-weight", "400");

thetime1.text(momdate1);
thetime2.text(momdate2);
thetime3.text(momdate3);
thetime4.text(momdate4);
thetime5.text(momdate5);

//// this line begins our document ready function for running the application
$(document).ready(function () {


    /// store cities searched by the user to an array --use push to make list in order--   a problem is it is storing blanks also - 
    /// still need to build buttons for each city stored to local storage --- also want to explore getting rid of upper case letters
    $("#btn").click(function () {
        var txt = $("#form1").val();

        cities.push(txt);
        numCities = cities.length
        localStorage.setItem(numCities, JSON.stringify(txt));
        console.log(cities);

        //// remove any previous icon from five day forcast if there is one

        $("#day1 img:last-child").remove();
        $("#day2 img:last-child").remove();
        $("#day3 img:last-child").remove();
        $("#day4 img:last-child").remove();
        $("#day5 img:last-child").remove();

        var storedData = JSON.parse(window.localStorage.getItem(cities.length))
        console.log(storedData);
        var makeList = $("<p></p>").text(storedData);

        $("ul").append(makeList);
        $("#searchHistory").val(storedData);
        // to do next make buttons for stored cities 
        //$('<button/>').text(storedData);

        // ajax was used for all api calls after having issues using fetch.....both calls are below
        queryString = "https://api.openweathermap.org/data/2.5/weather?q=" + txt + "&units=imperial&appid=" + myApiKey;

        ///// note theAnswer1 is first api call theAnswer2 is second api call first api call gets weather by city name and information
        ///// second api call gets uv index for selected city and five day forcast --
        //// current conditions for each city requested are stored including latitude and long. while these
        // are not displayed they are important since  we use the values to call the second api
        //// the second api has the uv index and also the five day forcast 


        $.ajax({
            url: queryString,
            method: "get",

        }).then(function (theAnswer) {

            var city = theAnswer.name;

            var temperature = theAnswer.main.temp;
            temperature = Math.floor(temperature);
            //console.log("in " + city + " it is " + temperature + " degrees");
            var humidity = theAnswer.main.humidity;
            // console.log(humidity);
            var wind = theAnswer.wind.speed;
            wind = Math.floor(wind);
            var lat = theAnswer.coord.lat;
            var lon = theAnswer.coord.lon;
            //console.log(lat);
            //console.log(lon);
            //// just below here we display the current conditions for the city the user searched right now
            $("#currentTemp").text(temperature + " F");
            $("#currentCity").text(city + " (" + momdate + ")");
            $("#currentCity").append("<img src='https://openweathermap.org/img/w/" + theAnswer.weather[0].icon + ".png' alt='" + theAnswer.weather[0].main + "' />")
            $("#currentWind").text(wind + " MPH");
            $("#currentHumid").text(humidity + "%");



            // format for ONE CALL WEATHER API CAN GET 5 DAY AND UV
            /// used this website for value/color of uv https://www.epa.gov/sunsafety/uv-index-scale-0
            //// did not use color purple from govt website since outside paramaters for this assignment

            queryString2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly&appid=" + myApiKey;




            $.ajax({
                url: queryString2,
                method: "get",
            }).then(function (theAnswer2) {
                console.log("second api info is " + theAnswer2);
                var uvi = theAnswer2.current.uvi;
                //uvi = 9;  used to test uvi color 
                console.log(uvi);  //// prints uv to console for testing during coding up
                var test = theAnswer2.current.sunrise;
                console.log(test);
                console.log(theAnswer2);  ////below add uvi value to weather for selected city
                $("#currentUv").text(uvi);

                //// right below is where we adjust the css dynamically using jquery to light green orange or red based on uv value
                if (uvi <= 2) {
                    $("#currentUv").css("background-color", "lightgreen");
                }

                if (uvi > 2 && uvi <= 5) {
                    $("#currentUv").css("background-color", "orange");
                }
                if (uvi > 5) {
                    $("#currentUv").css("background-color", "red");
                }
                //get humidity for five day forcast -- 
                var i = 0;

                while (i < 5) {
                    fiveDayh[i] = theAnswer2.daily[i].humidity;
                    console.log(i);
                    console.log(fiveDayh[i]);
                    i++;
                    $("#humid1").text(fiveDayh[0] + "%");
                    $("#humid2").text(fiveDayh[1] + "%");
                    $("#humid3").text(fiveDayh[2] + "%");
                    $("#humid4").text(fiveDayh[3] + "%");
                    $("#humid5").text(fiveDayh[4] + "%");
                }

                //get five day temp rounded down using daytime temperature 
                var j = 0;

                while (j < 5) {
                    fiveDayt[j] = Math.floor(theAnswer2.daily[j].temp.day);
                    console.log(j);
                    console.log(fiveDayt[j]);
                    j++;
                    $("#temp1").text(fiveDayt[0] + " F");
                    $("#temp2").text(fiveDayt[1] + " F");
                    $("#temp3").text(fiveDayt[2] + " F");
                    $("#temp4").text(fiveDayt[3] + " F");
                    $("#temp5").text(fiveDayt[4] + " F");
                }


                ///// write icon code to variable for specific day this is the icon to go with the five day forcast to append to a card later  -- same format as earler iconCode1 is day after today iconCode2 is two days after today ect.... 
                var iconCode1 = theAnswer2.daily[1].weather[0].icon;
                var iconCode2 = theAnswer2.daily[2].weather[0].icon;
                var iconCode3 = theAnswer2.daily[3].weather[0].icon;
                var iconCode4 = theAnswer2.daily[4].weather[0].icon;
                var iconCode5 = theAnswer2.daily[5].weather[0].icon;



                /// append icon to each card for five day 



                $("#day1").append(`<img src='http://openweathermap.org/img/wn/${iconCode1}@2x.png' />`);
                $("#day2").append(`<img src='http://openweathermap.org/img/wn/${iconCode2}@2x.png' />`);
                $("#day3").append(`<img src='http://openweathermap.org/img/wn/${iconCode3}@2x.png' />`);
                $("#day4").append(`<img src='http://openweathermap.org/img/wn/${iconCode4}@2x.png' />`);
                $("#day5").append(`<img src='http://openweathermap.org/img/wn/${iconCode5}@2x.png' />`);





            });




        })
    })






})










