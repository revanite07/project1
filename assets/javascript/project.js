var map;
var markers;
var inputDate;

$(document).ready(function(){
  $('select').formSelect();
});
var database = firebase.database().ref();
var database = firebase.database();

$(document).ready(function(){
  $('.datepicker').datepicker();
});

$(document).ready(function() {
    initializeMap();
    var date = formatUserInputDate("22112010");
    getCrimeDataDate(date);
});

function initializeMap() {
  map = L.map('map', {
    center: [34.0522, -118.2437],
    zoom: 13
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
  }).addTo(map);
}

function formatUserInputDate(string) {
    string = string.replace(/\D/g,'');
    var day = moment(string, ["MMDDYYYY", "DDMMYYYY"]);
    day = day.format('YYYY-MM-DD');
    return day.toString();
}

function getCrimeDataDate(date) {
  $.ajax({
    url: "https://data.lacity.org/resource/7fvc-faax.json?date_occ=" + date + "T00:00:00.000",
    data: {
      "$limit" : 5000,
      "$$app_token" : "fNjQDblxyyhoI1YrUgCkAQj6Y"
    }
  }).done(function(data) {
    mapCrimeData(data);
    console.log(data);
    firebase.database().ref().set(data);
  });
}

function getCrimeDataCrime(crmCD) {
    $.ajax({
      url: "https://data.lacity.org/resource/7fvc-faax.json?crm_cd=" + crmCD,
      data: {
        "$limit" : 5000,
        "$$app_token" : "fNjQDblxyyhoI1YrUgCkAQj6Y"
      }
    }).done(function(data) {
      mapCrimeData(data);
      firebase.database().ref().set(data);
    });
  }
  

function getCrimeDataDateAndCode(date, crmCD) {
    $.ajax({
        url: "https://data.lacity.org/resource/7fvc-faax.json?date_occ=" + date + "T00:00:00.000&crm_cd=" + crmCD,
        data: {
        "$limit" : 5000,
        "$$app_token" : "fNjQDblxyyhoI1YrUgCkAQj6Y"
        }
    }).done(function(data) {
        results = data;
        mapCrimeData(data);
        firebase.database().ref().set(data);
    });
}


function mapCrimeData(data) {
  markers = L.layerGroup([]);
  for(var i=0; i< data.length; i++) {
    var lat = data[i]["location_1"]["coordinates"][1];
    var lon = data[i]["location_1"]["coordinates"][0];
    var marker = L.marker([lat, lon]);
    marker.on("click", function() {
        displayCrimeData(i);
        var newDiv = $('<div>');
        newDiv.html("Location: " + data[this.alt]["location"] + "<br>Crime: " + data[this.alt]["crm_cd_desc"] + "<br>");
        $('#stats').prepend(newDiv);
    });
    marker.addTo(markers);
  }
  markers.addTo(map);
}

$('.dropdown-trigger').dropdown();
$('#textarea1').val('');
M.textareaAutoResize($('#textarea1'));



function displayCrimeData() {
    var crimeDataDiv = $('#stats');
    $('#userInput').click(function() {
      var crime = $('select option:selected').val();
        crimeDataDiv.append("<p>" + crime + "</p>");
       
        console.log($('select option:selected').val());
        console.log(crime);
      })
    var crmCD = $('select option:selected').val();
    function displayCrimeData(i) {
    var location;
}
}

$("#crime-button").on('click', function() {
  console.log("lets work");
  ;
  $(".z-depth-3").append("Hello");
})




