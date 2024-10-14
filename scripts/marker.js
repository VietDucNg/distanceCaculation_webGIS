// Variable to store marker for Point A and B
var markerA;
var markerB;

// Create a custom marker using Font Awesome for Point A
var customIcon = L.divIcon({
    html: '<i class="fa-solid fa-location-dot" style="color: blue; font-size: 40px;"></i>',  // Font Awesome icon
    iconAnchor: [16, 40],  // anchor point (bottom center of the icon)
    popupAnchor: [0, -40], // position of the popup (above the marker)
    className: '' // removes default marker class styling
});

// Event listeners for latitude and longitude inputs
// blur event listeners: When the user clicks out of (or finishes entering) either the lat or lon input fields, the updatePoint function is triggered.
document.getElementById('latA').addEventListener('blur', updatePointA);
document.getElementById('lonA').addEventListener('blur', updatePointA);
document.getElementById('latB').addEventListener('blur', updatePointB);
document.getElementById('lonB').addEventListener('blur', updatePointB);

// Function to update Point A's coordinates on the map when the latitude and longitude inputs are changed
function updatePointA() {
var latA = document.getElementById('latA').value;
var lonA = document.getElementById('lonA').value;

// Check if both latitude and longitude are entered
    if (latA && lonA) {
        var lat = parseFloat(latA);
        var lon = parseFloat(lonA);


        // Validate if the input values are valid coordinates
        if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        // Center the map at Point A's coordinates with a zoom level of 4
        map.setView([lat, lon], 4);

        // Remove the previous marker for Point A if it exists
        if (markerA) {
            map.removeLayer(markerA);
        }

        // Create a new marker at Point A and add it to the map
        markerA = L.marker([lat, lon], {icon: customIcon}).addTo(map)
            .bindPopup('Point A: (' + lat + ', ' + lon + ')')
            .openPopup();
        } else {
        alert('Please enter valid coordinates for Point A.');
        }

        // Now that Point A is added, check if Point B is already present, then draw the line
        if (markerB) {
            drawLineBetweenPoints();
            }
    }
}


// Function to update Point B's coordinates on the map when the latitude and longitude inputs are changed
function updatePointB() {
    var latB = document.getElementById('latB').value;
    var lonB = document.getElementById('lonB').value;
    
    // Check if both latitude and longitude are entered
        if (latB && lonB) {
            var lat = parseFloat(latB);
            var lon = parseFloat(lonB);
    
            // Validate if the input values are valid coordinates
            if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
            // Center the map at Point A's coordinates with a zoom level of 4
            map.setView([lat, lon], 4);
    
            // Remove the previous marker for Point B if it exists
            if (markerB) {
                map.removeLayer(markerB);
            }
    
            // Create a new marker at Point B and add it to the map
            markerB = L.marker([lat, lon],{icon: customIcon}).addTo(map)
                .bindPopup('Point B: (' + lat + ', ' + lon + ')')
                .openPopup();
            } else {
            alert('Please enter valid coordinates for Point B.');
            }

            // Now that Point B is added, check if Point A is already present, then draw the line
            if (markerA) {
            drawLineBetweenPoints();
            }
        }
    }