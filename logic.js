$(function() {
    var params = {
        "api_key": "a8bfd4227589430d84ce3ebd4ecb46da",
        // Request parameters
        // "LineCode": "RD",
    };

    $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            type: "GET",
        })
        .done(function(data) {
            // alert("success");
            // console.log(data.Stations[0].Name);
            var stations = data.Stations;

            var railMarkers = [];

            for (var i = 0; i < stations.length; i++){
              var railStation = stations[i];

              var railMarker = L.marker([railStation.Lat, railStation.Lon])
                .bindPopup("<h3>" + railStation.Name);

            railMarkers.push(railMarker);
            }

            createMap(L.layerGroup(railMarkers));

            function createMap(railStations) {
                var plainmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiYnJvd24yMjA2IiwiYSI6ImNqYnUxNjh3dDFjbWkycW1rbWEzOG9kZzkifQ.-G3Zsn-0wDbCcSfM8C7w0A'
                });

                var initialMaps = {
                  "Plain Map": plainmap
                };

                var overlayMaps = {
                  "Rail Stations": railStations
                };

                var mymap = L.map('mapid', {
                  center: [38.91, -77.04],
                  zoom: 13,
                  layers: [plainmap, railStations]
                });

                L.control.layers(initialMaps, overlayMaps, {
                  collapsed: false
                }).addTo(mymap);

            }

        })
        .fail(function() {
            alert("error");
        });
});

// var mymap = L.map('mapid').setView([38.91, -77.04], 13);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoiYnJvd24yMjA2IiwiYSI6ImNqYnUxNjh3dDFjbWkycW1rbWEzOG9kZzkifQ.-G3Zsn-0wDbCcSfM8C7w0A'
// }).addTo(mymap);
