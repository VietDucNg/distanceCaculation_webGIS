// // get distance from web service
// $("#submit").click(function () {
//     // Read the text input boxes to get the user's coordinates, add them to the URL to request the web service
//     $.getJSON(
//       "https://5fjstt-8080.csb.app",
//       {
//         latA: $("#latA").val(),
//         lonA: $("#lonA").val(),
//         latB: $("#latB").val(),
//         lonB: $("#lonB").val(),
//       },

//       // Receive the response from the web service, print the distance on the webpage
//       function (data) {
//         $("#output").html(data.distance);
//       }
//     );
//   });

// get distance
var submit_button = document.getElementById("submit");
submit_button.onclick = function () {
    // extract the latitude and longitude values from 2 points
    var latA = document.getElementById('latA').value;
    var lonA = document.getElementById('lonA').value;
    var latB = document.getElementById('latB').value;
    var lonB = document.getElementById('lonB').value;
    
    // Use the spherical law of cosines formula to calculate distance along the surface of a sphere. It is not the most accurate method for Earth, but it is good enough. Source: https://www.movable-type.co.uk/scripts/latlong.html
    var φ1 = (latA * Math.PI) / 180;
    var φ2 = (latB * Math.PI) / 180;
    var Δλ = ((lonB - lonA) * Math.PI) / 180;
    var R = 6371; // Earth's radius in km
    var distance =
        Math.acos(
        Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
        ) * R;

    // Output the calculated distance value
    $("#output").html(distance.toFixed(2));
    
    };