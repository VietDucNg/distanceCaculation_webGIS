var lineAB;   // Variable to store the line between Point A and Point B

function drawLineBetweenPoints() {
var latA = document.getElementById('latA').value;
var lonA = document.getElementById('lonA').value;
var latB = document.getElementById('latB').value;
var lonB = document.getElementById('lonB').value;

// If both Point A and Point B are valid, draw a line between them
if (latA && lonA && latB && lonB) {
    var pointA = [parseFloat(latA), parseFloat(lonA)];
    var pointB = [parseFloat(latB), parseFloat(lonB)];

    // Remove the previous line if it exists
    if (lineAB) {
    map.removeLayer(lineAB);
    }

    // Draw a line (polyline) between Point A and Point B
    lineAB = L.polyline([pointA, pointB], {
        color: 'blue',
        weight: 4,           // Line width in pixels
        opacity: 0.7,        // Line opacity
        dashArray: '10, 10', // Dash pattern for a dashed line (optional)
        lineJoin: 'round'    // Line join style (optional)
        }).addTo(map);

    // Adjust the map's center and zoom to fit both markers based on the
    // bounding box that encompases the 2 markers
    map.fitBounds([pointA, pointB]);
}
}
