var mymap = L.map('mapid').setView([38.91, 77.04], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={pk.eyJ1IjoiYnJvd24yMjA2IiwiYSI6ImNqYnUxNjh3dDFjbWkycW1rbWEzOG9kZzkifQ.-G3Zsn-0wDbCcSfM8C7w0A}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYnJvd24yMjA2IiwiYSI6ImNqYnUxNjh3dDFjbWkycW1rbWEzOG9kZzkifQ.-G3Zsn-0wDbCcSfM8C7w0A'
}).addTo(mymap);
