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
        .setContent(e.latlng.lat.toFixed(6).toString() + ', ' +
        e.latlng.lng.toFixed(6).toString())
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