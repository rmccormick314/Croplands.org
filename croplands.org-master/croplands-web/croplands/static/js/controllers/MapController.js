app.controller("MapController", ['$scope', 'mapService', 'DataService', 'leafletData', '$timeout', '$window', '$location', 'mappings', 'log', function ($scope, mapService, DataService, leafletData, $timeout, $window, $location, mappings, log) {

    ///////////
    // Utils //
    ///////////

    function stopPropagation(e) {
        L.DomEvent.stopPropagation(e);
    }

    $location.moveCenter = function (lat, lng, zoom) {
        this.search(_.merge(this.search(), {lat: Math.round(lat * Math.pow(10, 5)) / Math.pow(10, 5), lng: lng, zoom: zoom}));

    };

    $location.setId = function (id) {
        this.search(_.merge(this.search(), {id: id}));
    };

    $location.removeId = function () {
        this.search(_.omit(this.search(), 'id'));
    };

    $location.getId = function () {
        return parseInt(_.pluck(this.search(), 'id'), 10);
    };

    $location.getCenter = function () {
        var parameters = this.search();
        if (parameters.lat && parameters.lng && parameters.zoom) {
            return {lat: parseFloat(parameters.lat),
                lng: parseFloat(parameters.lng),
                zoom: parseInt(parameters.zoom, 10)
            };
        }
    };

///////////////////////
// Listen for Events //
///////////////////////

    $scope.$watch(function () {
        return mapService.center;
    }, function (center) {
        $scope.center = center;
        $scope.setCenterLocation();
    }, true);

    $scope.$watch('busy', function () {
        if ($scope.busy) {
            $scope.busyDialogVisible = true;
        }
    });


///////////////////////
// Button Actions    //
///////////////////////

    //SearchButton Stuff


    $scope.toggleLayerInfo = function (layer, e) {
        e.preventDefault();
        stopPropagation(e);
        layer.infoVisible = !layer.infoVisible;
    };

    $scope.zoomExtent = function () {
        mapService.center.lat = 0;
        mapService.center.lng = 0;
        mapService.center.zoom = 2;
    };

    $scope.print = function () {
        window.print();
    };

    $scope.helpModal = function () {
        modal;
    };

    $scope.autoComplete = function initMap() {

    };



    // Updates the URL for the current view
    $scope.setCenterLocation = function () {
      var lat = mapService.center.lat;
      var lng = mapService.center.lng;
      var zoom = mapService.center.zoom;
      $location.moveCenter(lat, lng, zoom);
    };

// Get the modal
var modal = document.getElementById('helpModal');

// Get the button that opens the modal
var btn = document.getElementById("helpModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

$(document).ready(function() {
        var address = document.getElementById('address');
        var autocomplete = new google.maps.places.Autocomplete(address);

        document.getElementById("submitLoc").onclick = function () {
        address = document.getElementById('address');
        var geocoders = new google.maps.Geocoder();

        geocoders.geocode({'address': address.value}, function (results, status) {
            if (status === 'OK') {
                var center = results[0].geometry.location;

                // Testing logs
                // console.log("Button:" + results[0].geometry.location);

                $scope.center.lat = center.lat();
                $scope.center.lng = center.lng();
                // mapService.fitBounds(center);
                $scope.center.zoom = 16;
                $scope.$apply();
            }

            else if(address.value.length <= 0) {
                alert('You must have something to search for, please enter something into the text box.');


            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
})
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//////////
// Init //
//////////

    function init() {
//        requestFullscreen($("#map-app"));
        var defaults = {
            tableOfContentsVisible: true,
            showHelp: false,
            showDownloadModal: false,
            busy: false,
            busyDialogVisible: false,
            table: {
                visible: false
            },
            center: mapService.center,
            layers: mapService.layers

        };

        // Load Url Parameters if Found
        var center = $location.getCenter();

        if (center && center.lat) {
            mapService.center.lat = center.lat;
        }
        if (center && center.lng) {
            mapService.center.lng = center.lng;
        }
        if (center && center.zoom) {
            mapService.center.zoom = center.zoom;
    }


        // Apply defaults
        angular.extend($scope, defaults);
        console.log($scope);
    }

    init();

}])
;

