///// this is where the action will take place javascript will be written here
//// open weather api key is bfe778d8ee4fe1d07c2fd96feb41c947
var myApiKey = "bfe778d8ee4fe1d07c2fd96feb41c947";
////make an array for holding cities previously searched 
var cities = [];
/// use moment js to display todays date at top
var momdate = moment();
momdate = (momdate.format("MMMM Do YYYY"));

var thetime = $("#currentDay");
thetime.text(momdate);

$(document).ready(function () {



    $("#btn").click(function () {
        var txt = $("#form1").val();
        //console.log(txt);
        cities.push(txt);
        console.log(cities);
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