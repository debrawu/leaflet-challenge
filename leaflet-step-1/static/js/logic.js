// store API endpoint as query URL
var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'

// perform a get request to the query url
// test_ary=['abc', 'def', 'fg']
// test_ary.map(len)
// [3, 3, 2]
d3.json(queryURL, function(data){
// d3.json(queryURL, data=>{
    console.log(data.features)

    var earthquakes = L.geoJSON(data.features,
        {
 //           style: 
            onEachFeature: addPopup
        })
    
    createMap(earthquakes)
//    earthquakes.addTo(myMap)
});

function addPopup(feature, layer){
    return layer.bindPopup(`<h3> ${feature.properties.place}`)
}

function createMap(layerGroup) {
    // Create a map object
    var myMap = L.map("mapid", {
        center: [15.5994, -28.6731],
        zoom: 3
    });
  
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    layerGroup.addTo(myMap)
    legend.addTo(myMap)
};


// add the popup

// plot markers for each earthquake based on lat & long

// size of markers should reflect magnitude of quakes. higher mag = bigger radius
// function setSize(){
//    switch
// }
// color of markers should reflect depth of quakes, darker color = greater depth 
// function setColor(){
//    switch feature['geometry']['coordinates'][2]
//}
// include pop ups for each marker when clicked with information 

// create a legend
var legend=L.control({
    position: 'bottomright'
});

legend.onAdd=function(){
    legendDiv=L.DomUtil.create('div', 'legend');
    // create rectangles to represent each "color"
    // under each rectangle would be the range of values
    legendDiv.innerHTML='TEST'
    return legendDiv;
};