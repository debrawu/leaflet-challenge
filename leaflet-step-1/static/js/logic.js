// store API endpoint as query URL
var queryURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'

// perform a get request to the query url
// test_ary=['abc', 'def', 'fg']
// test_ary.map(len)
// [3, 3, 2]
d3.json(queryURL, function(data){
// d3.json(queryURL, data=>{
    console.log(data.features)

    // var earthquakes = L.geoJSON(data.features,
//         {
//  //           style: 
//             onEachFeature: addPopup
//         })
    
    createMap(data.features);
//    earthquakes.addTo(myMap)
    //)
});

// function addPopup(feature, layer){
//     return layer.bindPopup(`<h3> Magnitude: ${feature.properties.mag}</h3> <p> ${feature.properties.place} </p>`)
// }

// function markerSize(feature) {
//     return feature.properties.mag * 20
// }

function createMap(data) {

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

    // console.log(layerGroup)

    // iterate through the data for each earthquake
    data.forEach(feature => {
        // set a variable for magnitude
        var magnitude = feature.properties.mag;
        var depth = feature.geometry.coordinates[2]
        console.log(depth)

        // set a switch statement for color
        var color = ''

        if (depth <= 100){
            color = 'lightpink';
        }
        else if (depth <= 200){
            color = 'lightcoral'
        }
        else if (magnitude <= 300){
            color ='deeppink'
        }

        else if (magnitude <= 400){
            color = 'indianred'
        }

        else if (magnitude <= 500) {
            color = 'firebrick'
        }
        else {
            color = 'darkred'
        }

        L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
            color: color,
            fillColor: color,
            fillOpacity: 0.75,
            radius: magnitude*50000
        }).bindPopup(`<h3> Magnitude: ${feature.properties.mag}</h3> <h3>Depth: ${feature.geometry.coordinates[2]}</h3> <p> ${feature.properties.place} </p>`).addTo(myMap)



    })



    // layerGroup.addTo(myMap)
    // legend.addTo(myMap)

    



// add the popup

// plot markers for each earthquake based on lat & long

// size of markers should reflect magnitude of quakes. higher mag = bigger radius
// function setSize(){
//    switch
// }
// color of markers should reflect depth of quakes, darker color = greater depth 
// function setColor(){
//    switch feature['geometry']['coordinates'][2]
// }
// include pop ups for each marker when clicked with information 

    // create a legend
    var legend=L.control({
        position: 'bottomright'
        })//.addTo(myMap);

    legend.onAdd=function(){
        legendDiv=L.DomUtil.create('div', 'legend');

        // create rectangles to represent each "color"
        var colors = ['lightpink', 'lightcoral', 'deeppink', 'indianred', 'firebrick', 'darkred'];
        // under each rectangle would be the range of values
        var range = ['<100', '100-200', '200-300', '300-400', '400-500', '500+']
        // forEach
        for (var i=0; i <colors.length; i++){
            legendDiv.innerHTML +=
            '<li style="background-color:'+ colors[i] + '">' + range[i] + '</li> <br>'
        }
        return legendDiv;
    }
    legend.addTo(myMap)
};
