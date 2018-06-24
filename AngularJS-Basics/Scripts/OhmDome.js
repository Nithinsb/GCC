//
var ngApp = angular.module('myNgApp', []);
ngApp.controller('myController', function ($scope) {
    $scope.load = function () {
        $scope.Palette =  ['red' , 'blue','black','brown']
        
        var svgDoc = document.getElementById("Ohm-alphasvg");
        

        // It's important to add an load event listener to the object,
        // as it will load the svg doc asynchronously
        svgDoc.addEventListener("load", function () {

            // get the inner DOM of alpha.svg
            var svgInnerDoc = svgDoc.contentDocument;
            // get the inner element by id
            $scope.bands = [svgInnerDoc.getElementById("rect3796"),
            svgInnerDoc.getElementById("rect3798"),
             svgInnerDoc.getElementById("rect3800"),
            svgInnerDoc.getElementById("rect3819")];
            // add behaviour
            $scope.bands[0].addEventListener("mousedown", $scope.bandMouseDown, false);
            $scope.bands[1].addEventListener("mousedown", $scope.bandMouseDown, false);
            $scope.bands[2].addEventListener("mousedown", $scope.bandMouseDown, false);
            $scope.bands[3].addEventListener("mousedown", $scope.bandMouseDown, false);

            $scope.bands[0].colorSet=false;
            $scope.bands[1].colorSet=false;
            $scope.bands[2].colorSet=false;
            $scope.bands[3].colorSet=false;
            
        }, false);
    }
    
    
   
    $scope.bandMouseDown = function ($event) {
        var leftPosition = $scope.getLeftOffset($event.target),
         topPosition = $scope.getTopOffset($event.target);
        $scope.paletteShowToggle(leftPosition, topPosition);
        $scope.selectedBand = $event.target;
        

    }
    $scope.SetColor = function ($event) {
        $scope.selectedBand.style.fill = $event.currentTarget.id;
        if ($event.currentTarget.id != "") {
            $scope.selectedBand.color = $event.currentTarget.id;
            $scope.paletteShowToggle();
            $scope.selectedBand.colorSet = true;
        }
        if ($scope.bands[0].colorSet == true && $scope.bands[1].colorSet == true && $scope.bands[2].colorSet == true && $scope.bands[3].colorSet == true)
        {
            alert($scope.bands[0].color + " " + $scope.bands[1].color + " " + $scope.bands[2].color + " " + $scope.bands[3].color);
        }
        //alert($event.target.firstChild());
    }

    $scope.getOhmValue = function () {
        //call apI
    }

    $scope.paletteShowToggle = function (leftPosition,topPosition) {
        var x = document.getElementById("Ohm-Color-Palette");
        if (x.style.visibility === "hidden") {
            x.style.visibility = "visible";            
        } else {
            x.style.visibility = "hidden";
        }
        if (leftPosition != null && topPosition != null) {
            x.style.left = leftPosition + "px";
            x.style.top = (topPosition-70) + "px";
        }

        
    }
    $scope.getLeftOffset = function (targetElement) {
        var bodyRect = document.body.getBoundingClientRect();
        if (targetElement != null) {
            var elemRect = targetElement.getBoundingClientRect();
            return (elemRect.left - bodyRect.left);
        }
        return 0;
    }
    $scope.getTopOffset = function (targetElement) {
        var bodyRect = document.body.getBoundingClientRect();
        if (targetElement != null) {
            var elemRect = targetElement.getBoundingClientRect();
            return (elemRect.top - bodyRect.top);
        }
        return 0;
    }

    
});