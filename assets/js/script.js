///// this is where the action will take place javascript will be written here
//// open weather api key is bfe778d8ee4fe1d07c2fd96feb41c947
var myApiKey = "bfe778d8ee4fe1d07c2fd96feb41c947";


////make an array for holding cities previously searched 
var cities = [];
var queryString = ""
var data
var makeList
var fiveDayh = ["1", "2", "3", "4", "5"];
var fiveDayt = ["1", "2", "3", "4", "5"];


/// use moment js to display todays date at top also defined next five days to print to cards 
var momdate = moment();
var momdate1 = moment();
var momdate2 = moment();
var momdate3 = moment();
var momdate4 = moment();
var momdate5 = moment();

momdate = (momdate.format("MMMM Do YYYY"));


/// using moment for dates for 5 day forcast need it to display properly 

momdate1 = moment().add(1, 'days').format("MMMM Do YYYY");

momdate2 = moment().add(2, 'days').format("MMMM Do YYYY");

momdate3 = moment().add(3, 'days').format("MMMM Do YYYY");

momdate4 = moment().add(4, 'days').format("MMMM Do YYYY");

momdate5 = moment().add(5, 'days').format("MMMM Do YYYY");


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

        ///// note theAnswer1 is first api call theAnswer2 is second api call first api call gets weather by city name and information
        ///// second api call gets uv index for selected city and five day forcast 


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
            $("#currentCity").text(city + " (" + momdate + ")");
            $("#currentCity").append("<img src='https://openweathermap.org/img/w/" + theAnswer.weather[0].icon + ".png' alt='" + theAnswer.weather[0].main + "' />")
            $("#currentWind").text(wind + " MPH");
            $("#currentHumid").text(humidity + "%");



            // format for ONE CALL WEATHER API CAN GET 5 DAY AND UV
            /// used this website for value/color of uv https://www.epa.gov/sunsafety/uv-index-scale-0


            queryString2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly&appid=" + myApiKey;

            ///alert(queryString2);


            $.ajax({
                url: queryString2,
                method: "get",
            }).then(function (theAnswer2) {
                console.log("second api info is " + theAnswer2);
                var uvi = theAnswer2.current.uvi;
                //uvi = 9;  used to test uvi color 
                console.log(uvi);
                var test = theAnswer2.current.sunrise;
                console.log(test);
                console.log(theAnswer2);
                $("#currentUv").text(uvi);
                if (uvi <= 2) {
                    $("#currentUv").css("background-color", "lightgreen");
                }

                if (uvi > 2 && uvi <= 5) {
                    $("#currentUv").css("background-color", "orange");
                }
                if (uvi > 5) {
                    $("#currentUv").css("background-color", "red");
                }
                //get humidity for five day forcast -- also need to start at 1, o would be today
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
                    $("#temp3").text(fiveDayt[2] + "F");
                    $("#temp4").text(fiveDayt[3] + " F");
                    $("#temp5").text(fiveDayt[4] + " F");
                }

                console.log(theAnswer2.daily[1].weather[0].icon);
                var iconCode = (theAnswer2.daily[1].weather[0].icon);

                ///var test = "<img src='http://openweathermap.org/img/wn/" + theAnswer2.daily[1].weather[0].icon + "@2x.png"
                $("#day1").append("<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png");

                $("#day2").append(" hi there ");

                $("#day3").append(" icon goes here ");
                /// http://openweathermap.org/img/wn/10d@2x.png

                /// http://openweathermap.org/img/wn/10d@2x.png




            });




        })
    })






})










