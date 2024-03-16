let map;
let markers = [];
let locationDivs = [];
let infowindows = [];
let clickedMarkerIcon;

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 30, lng: 10 }, // Adjusted center
        zoom: 3,
        styles: [
            {
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }]
            },
            {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#858585" }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#f5f5f5" }]
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#bdbdbd" }]
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
            },
            {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#dadada" }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }]
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }]
            },
            {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
            }
        ],
        suppressInfoWindows: true
    });

    const locations = [
        { lat: 47.39021, lng: 8.78152 },
        { lat: 50.08416, lng: 14.4465 },
        { lat: 3.15806, lng: 101.6997 },
        { lat: 47.13552, lng: 9.52247 }
    ];

    locationDivs = [
        document.getElementById("location1"),
        document.getElementById("location2"),
        document.getElementById("location3"),
        document.getElementById("location4")
    ];

    infowindows = [
        new google.maps.InfoWindow({ content: "" }),
        new google.maps.InfoWindow({ content: "" }),
        new google.maps.InfoWindow({ content: "" }),
        new google.maps.InfoWindow({ content: "" })
    ];

    const blackMarkerIcon = {
        url: "assets/image/icon/location-marker.png",
        scaledSize: new google.maps.Size(40, 40)
    };

    clickedMarkerIcon = {
        url: "assets/image/icon/location-marker-colored.png",
        scaledSize: new google.maps.Size(40, 40)
    };

    markers = locations.map((location, index) => {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: blackMarkerIcon
        });

        marker.addListener("click", () => {
            infowindows.forEach(infoWindow => infoWindow.close());
            infowindows[index].open(map, marker);
            locationDivs.forEach(div => div.classList.remove("active"));
            locationDivs[index].classList.add("active");
            const isActive = locationDivs.some(div => div.classList.contains("active")); 
            if (isActive) {
                $("#search-form").addClass("hide");
            } else {
                $("#search-form").removeClass("hide");
            }
            marker.setIcon(clickedMarkerIcon);
            markers.forEach((otherMarker, otherIndex) => {
                if (otherIndex !== index) {
                    otherMarker.setIcon(blackMarkerIcon);
                }
            });
        });

        return marker;
    });

    const searchBox = new google.maps.places.SearchBox(document.getElementById('search'));

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    document.getElementById('searchBtn').addEventListener('click', searchNearestLocation);
    document.querySelectorAll('.backBtn').forEach(btn => btn.addEventListener('click', resetMap));

    function searchNearestLocation() {
        const query = document.getElementById('search').value;
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: query }, function(results, status) {
            if (status === 'OK' && results[0]) {
                const userLocation = results[0].geometry.location;
                let nearestLocationIndex = 0;
                let shortestDistance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, markers[0].getPosition());

                for (let i = 1; i < markers.length; i++) {
                    const distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, markers[i].getPosition());
                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        nearestLocationIndex = i;
                    }
                }

                


                markers[nearestLocationIndex].setIcon(clickedMarkerIcon);

                markers.forEach((marker, index) => {
                    if (index !== nearestLocationIndex) {
                        marker.setIcon(blackMarkerIcon);
                    }
                });

                const nearestLocation = markers[nearestLocationIndex].getPosition();
                map.setCenter(nearestLocation);
                map.setZoom(5);
                infowindows[nearestLocationIndex].open(map, markers[nearestLocationIndex]);
                locationDivs.forEach(div => div.classList.remove("active"));
                locationDivs[nearestLocationIndex].classList.add("active");

                // Check if any location info is active
                const isActive = locationDivs.some(div => div.classList.contains("active")); 
                if (isActive) {
                    $("#search-form").addClass("hide");
                } else {
                    $("#search-form").removeClass("hide");
                }
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    function resetMap() {
        map.setCenter({ lat: 30, lng: 10 });
        map.setZoom(3);
        const searchForm = document.getElementById('search-form');
        searchForm.classList.remove("hide");
        document.getElementById('search').value = '';
        locationDivs.forEach(div => div.classList.remove("active"));
        const blackMarkerIcon = {
            url: "assets/image/icon/location-marker.png",
            scaledSize: new google.maps.Size(40, 40)
        };
        markers.forEach(marker => {
            marker.setIcon(blackMarkerIcon);
        });
    }
}

