// create map object with initial view and zoom level
var map = L.map('map').setView([47.558,7.941],5);

//// add basemap
var base_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

var base_gg = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains: ['mt0','mt1','mt2','mt3']
});


//// add popup with coordinates when clicked
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.lat.toFixed(5).toString() + ', ' +
        e.latlng.lng.toFixed(5).toString())
        .openOn(map);
}
map.on('click', onMapClick);


//// add info button
var infoBox = document.getElementById('infoBox');
infoBox.style.display = 'none'
L.easyButton('<span>&#8505;</span>', function(){
  // Toggle the display of the info box
  if(infoBox.style.display == 'none') {
    infoBox.style.display = 'block';
  } else {
    infoBox.style.display = 'none';
  }
}).addTo(map);


// get distance from web service
$("#submit").click(function () {
    // Read the text input boxes to get the user's coordinates, add them to the URL to request the web service
    $.getJSON(
      "https://5fjstt-8080.csb.app",
      {
        latA: $("#latA").val(),
        lonA: $("#lonA").val(),
        latB: $("#latB").val(),
        lonB: $("#lonB").val(),
      },

      // Receive the response from the web service, print the distance on the webpage
      function (data) {
        $("#output").html(data.distance);
      }
    );
  });

//// add coordinates information when mouse hover
// Get reference to the coordinates display element
var coordDisplay = document.getElementById('coordInfo');
// Update coordinates when the mouse moves over the map
map.on('mousemove', function (e) {
    coordDisplay.innerHTML = 'Lat: ' + e.latlng.lat.toFixed(5) + ', Long: ' + e.latlng.lng.toFixed(5);
});

//// get coordinates for point A and B on click
// Input elements for Point A and Point B
var pointALat = document.getElementById('latA');
var pointALng = document.getElementById('lonA');
var pointBLat = document.getElementById('latB');
var pointBLng = document.getElementById('lonB');

// Flags to track if Point A or Point B should be filled next
var fillPointA = true;

// Add click event listener to the map
map.on('dblclick', function (e) {
    var lat = e.latlng.lat.toFixed(5);
    var lng = e.latlng.lng.toFixed(5);

    if (fillPointA) {
        // Fill Point A coordinates
        pointALat.value = lat;
        pointALng.value = lng;
        updatePointA();
        fillPointA = false; // Next click should fill Point B
    } else {
        // Fill Point B coordinates
        pointBLat.value = lat;
        pointBLng.value = lng;
        updatePointB(); // Update the map and draw the line between Point A and Point B
        fillPointA = true; // After Point B, next click fills Point A again
    }
});



//// add layers control
// create control object 
var baseLayers = {
  'Esri Topo': base_topo,
  'Google Satellite': base_gg
};
// add layers control to map
var layersControl = L.control.layers(baseLayers).addTo(map);
// add scale control to map
L.control.scale().addTo(map);