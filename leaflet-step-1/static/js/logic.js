// store API endpoint as query URL
var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'

// perform a get request to the query url
d3.json(queryURL, function(data){
    console.log(data.features)

    var earthquakes = L.geoJSON(data.features,
        {
            onEachFeature: addPopup
        })
    
    createMap(earthquakes)
});

function addPopup(feature, layer){
    return layer.bindPopup(`<h3> ${feature.properties.place}`)

}

function createMap(earthquake) {
    // Create a map object
    var myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3
    });
  
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);
};


// add the popup

// plot markers for each earthquake based on lat & long

// size of markers should reflect magnitude of quakes. higher mag = bigger radius

// color of markers should reflect depth of quakes, darker color = greater depth 

// include pop ups for each marker when clicked with information 

// create a legend