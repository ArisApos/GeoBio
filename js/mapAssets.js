//Level 2
// var easeOutCubic = function(t) {
//   return --t * t * t + 1;
// };

// function myFunction(msPerRun) {
//     setTimeout(function () { console.log("Hello"); }, msPerRun);
// }
// {
//     myFunction(msPerRun)
// }
function initMap() {
  var locationKarditsa = { lat: 39.36416183, lng: 21.9275525 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: locationKarditsa,
    mapTypeId: "satellite",
    gestureHandling: "none",
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });
}

map.setZoom(18);
// Static inception with diving
var before, after, delayG, repeatG, zoomFromG, timeExecution=0;
function mapInception(delay, repeat, zoomFrom) {
    delayG = delay;
    repeatG = repeat;
    zoomFromG = zoomFrom;
    if (repeatG <= 0) {
        return 1;
    }
    // var setDelay = (delay - timeExecution >= 0) ? delay - timeExecution : delay<0? -delay : 1000 ; 
    console.log(`++++++++++++++++++++++++++++++hello map \ndelay:${delayG}\nzoom:${zoomFromG}\n..please wait..\n\n`);
    setTimeout(function () {
        before =  performance.now();// The request-working starts
        map.setZoom(zoomFromG);
    }, delayG  )
}

// The middleware (Listener) adjuster

map.addListener("tilesloaded", function() {
    if (repeatG <= 0) {
        return 1;
    }
    after = performance.now();//the working completes
    timeExecution = after - before;
    console.log(`\n------------------------------------------Zoom changed.... time execution: ${timeExecution}`);
    var decimals = zoomFromG - 0.5;
     
    mapInception(delayG, --repeatG, Number(decimals.toFixed(1))); //call the function with adjusted variables
});






//The panorama function
function initializePanorama(){

var locationKarditsaSview = { lat: 39.36351318, lng: 21.92799884 };
var panorama = new google.maps.StreetViewPanorama(
    document.getElementById("map"),
    {
        position: locationKarditsaSview,
        pov: {
            heading: 34,
            pitch: 10
        },
        addressControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        streetViewControl: false
    }
    
);
//With tv screen effect
let overlayDiv = document.createElement('div');
overlayDiv.setAttribute("class", "overlay");
overlayDiv.style.opacity = 0.4;
mapDocElement.appendChild(overlayDiv);
//And some default settings
panorama.setVisible(true);
panorama.setPov({ heading: 90, pitch: 0 });
var locationFreedomSquare = { lat: 39.36478586, lng: 21.92429718 };
panorama.setPosition(locationFreedomSquare);

}





//For StreetView....
function inception(time, repeat, intervalHeading, intervalPitch=0) {
  if (repeat <= 0) {
    return 1;
  }
  var positionHead = panorama.getPov().heading -0.1;//-intervalHeading
  var positionPitch = panorama.getPov().pitch -0;//-intervalPitch
  panorama.setPov({ heading: positionHead, pitch: positionPitch });
    console.log(`hello time:${time} repeat:${repeat} interval${intervalHeading} Head${positionHead} Pitch${positionPitch}`);
  setTimeout(function() {
    inception(time, --repeat );
  }, time);
}


