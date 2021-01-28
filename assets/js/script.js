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
        console.log(txt);

    })































})