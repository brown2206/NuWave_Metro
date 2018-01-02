$(function() {
    // Code to make ajax call to WMATA Station List API
    var params = {
        "api_key": "a8bfd4227589430d84ce3ebd4ecb46da",
    };

    $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            type: "GET",
        })
        .done(function(data) {

            // Set JSON data as stations variable.
            var stations = data.Stations;

            // Create an empty array to hold rail station markers.
            var railMarkers = [];

            // Loop through rail station objects.
            for (var i = 0; i < stations.length; i++) {
                var railStation = stations[i];

                // Retrieve Latitude and Longitude for each Metro station.
                var railMarker = L.marker([railStation.Lat, railStation.Lon])
                    // .bindPopup("<h3>" + railStation.Name + "<p>" + railStation.Address.Street + "<p>" + railStation.Address.City + "<p>" + railStation.Address.State + "<p>" + railStation.Address.Zip);
                    .bindPopup("<h4>" + railStation.Name + "<br>" + railStation.Address.Street + "<br>" + railStation.Address.City + " " + railStation.Address.State + " " + railStation.Address.Zip);

                // Placed railMarker into empty railMarkers array.
                railMarkers.push(railMarker);
            }

            // Calls on the createMap function and passes the variable railMarkers
            createMap(L.layerGroup(railMarkers));

            // Function that creates map of Washington, DC
            function createMap(railStations) {
                var plainmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiYnJvd24yMjA2IiwiYSI6ImNqYnUxNjh3dDFjbWkycW1rbWEzOG9kZzkifQ.-G3Zsn-0wDbCcSfM8C7w0A'
                });

                // Sets base & overlay layers of map.
                var initialMaps = {
                    "Washington Metropolitan Area": plainmap
                };

                var overlayMaps = {
                    "Rail Stations": railStations
                };

                //  Centers map on Washington, DC
                var mymap = L.map('mapid', {
                    center: [38.91, -77.04],
                    zoom: 13,
                    layers: [plainmap, railStations]
                });

                // Adds control layers to map.
                L.control.layers(initialMaps, overlayMaps, {
                    collapsed: false
                }).addTo(mymap);

            }

        })

        .fail(function() {
            alert("error");
        });
});
