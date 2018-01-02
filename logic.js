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
            // console.log(data.Stations);

            // Color Stations: Test Code
            // var orange_stations = [];
            // for (var i = 0; i < stations.length; i++){
            //   if (stations[i].LineCode1 == "OR" || stations[i].LineCode2 == "OR" || stations[i].LineCode3 == "OR" || stations[i].LineCode4 == "OR"){
            //     orange_stations.push(stations[i]);
            //
            //   }
            // }
            // console.log(orange_stations);

            var stations = data.Stations;

            var railMarkers = [];

            for (var i = 0; i < stations.length; i++){
              var railStation = stations[i];

              var railMarker = L.marker([railStation.Lat, railStation.Lon])
                // .bindPopup("<h3>" + railStation.Name + "<p>" + railStation.Address.Street + "<p>" + railStation.Address.City + "<p>" + railStation.Address.State + "<p>" + railStation.Address.Zip);
                .bindPopup("<h4>" + railStation.Name + "<br>" + railStation.Address.Street + "<br>" + railStation.Address.City + " " + railStation.Address.State + " " + railStation.Address.Zip);

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
                  "Washington Metropolitan Area": plainmap
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
