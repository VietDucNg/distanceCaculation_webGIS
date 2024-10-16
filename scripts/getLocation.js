// Get reference to the location button
var locateBtn = document.getElementById('gpsButton');

// Function to move the map to the user's location
function jumpToLocation(lat, lng) {
    map.setView([lat, lng], 13); 
    L.marker([lat, lng]).addTo(map).bindPopup("You are here!").openPopup(); // Add marker at the location
    }

// easy button to get the location from  browser's built-in Geolocation API, then feed the location to the jumpToLocation function
L.easyButton("fa-solid fa-crosshairs", function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            jumpToLocation(lat, lng);
        }, function(error) {
            alert("Error retrieving location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}, {
    position: 'topright' // Set the button position here
    }
).addTo(map);


// // Function to move the map to the user's location
// function jumpToLocation(lat, lng) {
//     map.setView([lat, lng], 13); // Move map to the location with zoom level 13
//     L.marker([lat, lng]).addTo(map).bindPopup("You are here!").openPopup(); // Add marker at the location
// }

// // Add event listener to the button
// locateBtn.addEventListener('click', function() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             var lat = position.coords.latitude;
//             var lng = position.coords.longitude;
//             jumpToLocation(lat, lng);
//         }, function(error) {
//             alert("Error retrieving location: " + error.message);
//         });
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// });