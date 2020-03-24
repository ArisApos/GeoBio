
// When you are scrolling down change the header shape and add some movements of the button 
const header = document.getElementById("header");
const wrapper = document.getElementById("menu-icon-wrapper");
const dummy = document.getElementById('dummy');
const bio_Options = document.getElementById("bioOptions"); 
const container = document.getElementById("container"); 
const containerBig = document.getElementById("containerBig");
const karditsa = document.getElementById("karditsa");
let karditsaOneClick = true;

//Do somethink when the animation off the logo finished
dot.addEventListener("animationend", () => {
     wrapper.style.display = "inline-block";
      delayDoOpa(0.4, () => {
           wrapper.style.opacity = 1;
           mapDocElement.style.transition = "3s";
           karditsa.style.opacity = 1;
           changeOpacity();
        }) 
    }, false);


// Karditsa button functionality
 karditsa.addEventListener("click", function() {
     if (karditsaOneClick){ insider(); karditsaOneClick = !karditsaOneClick; } 
});

//------------------>>>>For the auto initMap function
var map, overlay, deletions;
const mapDocElement = document.getElementById("map");


function initMap() {
    //Soft display.. We substitute this three statements with the last
     mapDocElement.style.transition = 'none';
     mapDocElement.style.opacity = 0;
     opacityActive = !opacityActive;
    var locationKarditsa = {
        lat: 39.3651987,
        lng: 21.9276915
    };

    map = new google.maps.Map(mapDocElement, {
        zoom: 1.2,
        center: locationKarditsa,
       // mapTypeId: "satellite",
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });
    

    //make some tv effect
    overlayDiv = document.createElement('div');
    overlayDiv.setAttribute("class", "overlay");
    overlayDiv.style.opacity = 0.4;
    overlayDiv.style.zIndex = 2;
    mapDocElement.appendChild(overlayDiv);


    // On tiles loaded
    var listenerStarter = map.addListener("tilesloaded", function () {
        listenerStarter.remove();
        deletions = mapDocElement.getElementsByClassName("gm-style")[0].children;
        var firstMapChild = mapDocElement.children[0];
        firstMapChild.style.height = '110%';
        delayDoOpa(500, () => {
            mapDocElement.style.visibility = 'visible';
            // insider();//-------------------------------------------------------------------->>GoPoint
        });



      //Problemmm!!! Doesnt work and i dont know why---But now i know because the googleMaps API is little bit tricky
        // console.log(deletions.length);
        // var first = true;

        // var waitForLoadDivs = setInterval(() => {

        //     if (deletions[4].style.visibility != 'hidden' ) {
                
        //             for(let i = 2; i < deletions.length; i++) {
        //             deletions[i].style.visibility = "hidden";
        //             }
        //         //With empty we ask to change with transition on with true parameter we ask without transition for make it fast
        //         changeOpacity();
        //         if (deletions[4].style.visibility == 'hidden') {
        //         clearInterval(waitForLoadDivs);
        //         //console.log(deletions);
        //         }
        //         //console.log('wtf');
        //     }
        // }, 500);




        // Soft functionality... with build in funtion code and under the hood setTimeout  do somethink after somethink with asyghronus mode
        // delayDoOpa(3000, () => { 
        //     changeOpacity();//first disapear it slowly 
        //     delayDoOpa(3000, () => {
        //         initializePanorama();//then initialize the agly thing of loading and building the panorama
        //       }, false);
        //  }, false);

        // Soft functionality... with native code do somethink after somethink with asyghronus mode
        // setTimeout(()=>{   
        //     changeOpacity();//first disapear it slowly 
        //     setTimeout(() => {
        //         initializePanorama();//then initialize the agly thing of loading and building the panorama
        //     }, 3000);

        // }, 3000);//


    });


}



// The life documentary with rotation

var before, after, delayG, repeatG, zoomFromG, timeExecution = 0;

function mapInception(delay, repeat, zoomFrom) {
    delayG = delay;
    repeatG = repeat;
    zoomFromG = zoomFrom;
    if (repeatG <= 0) {
        return 1;
    }
    // var setDelay = (delay - timeExecution >= 0) ? delay - timeExecution : delay<0? -delay : 1000 ; 
    console.log(`++++++++++++++++++++++++++++++hello map \ndelay:${delayG}\nzoom:${zoomFromG}\nrepeat:${repeatG}\n..please wait..\n\n`);
    setTimeout(function () {
        before = performance.now(); // The request-working starts
        map.setZoom(zoomFromG);
    }, delayG)
}

// The middleware (Listener) adjuster for the life documentra
function initListener() {
    map.addListener("tilesloaded", function () {
        if (repeatG <= 0) {
            return 1;
        }
        after = performance.now(); //the working completes
        timeExecution = after - before;
        console.log(`\n------------------------------------------Zoom changed.... time execution: ${timeExecution}`);
        repeatG--;
        var decimals = zoomFromG - 0.5;
        var wtf = Number(decimals.toFixed(1));

        mapInception(delayG, repeatG, wtf); //call the function with adjusted variables
    });
}

//////////////////////////////////The panorama function
var panorama;

function initializePanorama() {

    var locationKarditsaSview = {
        lat: 39.36479307,
        lng: 21.92430303
    };
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("map"), {
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

    delayDoOpa(500, () => {
        changeOpacity();
    }, false) //!!! Show the streetView after the terrible black window dissapears 


    //Add function trigger for once
    var panListenerStarter = panorama.addListener('position_changed', function () {
        //We want this just once so remove the eventListener
        panListenerStarter.remove();
        //Delete the buttons from the streetView window
        buttonsDeletion(1);

        //change the opacity of the overlayDiv
        overlayDiv.style.opacity = 0;

        //Initialize the life navigator
        setTimeout(function () {
            inception(30, 2540, 0.35);
        }, 1000);



    });

    //And some default settings
    // panorama.setPov({ heading: 90, pitch: 0 });
    // var locationFreedomSquare = { lat: 39.36478586, lng: 21.92429718 };
   // var locationFreedomSquare = { lat: 39.36479307, lng: 21.92430303 };
    // panorama.setPosition(locationFreedomSquare);
}




//For StreetView....
var flagFirstTime = true,
    repeatSet, timeSet, intervalHeadingSet;

function inception(time, repeat, intervalHeading) {
    if (flagFirstTime) {
        repeatSet = repeat;
        timeSet = time; //With some try with mathematics timeSet= (time + time * (repeatSet-repeat) / repeatSet)
        intervalHeadingSet = intervalHeading;
        flagFirstTime = !flagFirstTime;
    }
    if (repeat <= 0) {
        return 1;
    }
    var positionHead = panorama.getPov().heading - intervalHeading; //-intervalHeading
    var positionPitch = panorama.getPov().pitch - 0; //-intervalPitch
    panorama.setPov({
        heading: positionHead,
        pitch: positionPitch
    });
    console.log(`hello time:${time} repeat:${repeat} ----interval${intervalHeading}-- Head${positionHead} Pitch${positionPitch}`);

    setTimeout(function () {
        inception(easeInOutQuad(repeatSet - repeat, 0, timeSet, repeatSet), --repeat, intervalHeading - intervalHeadingSet / repeatSet);
    }, time);
}



/*
    @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
    @b is the beginning value of the property.
    @c is the change between the beginning and destination value of the property.
    @d is the total time of the tween.
*/
function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}

//-----------------------------Assets v1

//delayDoOpa
function delayDoOpa(timeout, somethink, opaChange = false) {
    if (opaChange) {
        changeOpacity();
    }
    setTimeout(() => {
        somethink();
    }, timeout);

}

//Opacity asset
var opacityActive = true;
var changeOpacity = function (withoutTransition = false) {
    if (withoutTransition) {
        mapDocElement.style.transition = 'none';
        setTimeout(() => {
            mapDocElement.style.transition = "opacity 3s";
        }, 300)

    }

    mapDocElement.style.opacity = opacityActive ? 0 : 1;
    opacityActive = !opacityActive;
}
//AutoZoom asset
function insider(times = 15, zoom = 2) {
    delayDoOpa(500, () => {
        map.setZoom(zoom);
        if (times > 0) insider(times - 1, zoom + 1);
        else {
            //first disapear it slowly
            promiseSomethink(2000 * 1, () => {
                changeOpacity();
                clockTicking();
            }).then(() => {
                promiseSomethink(1000, () => {
                    initializePanorama();
                }).then(() => {
                    clearInterval(myclockTicking)
                });
            });
        }
    });
}

//Delete the buttons from the map(0) & streetView(1) window asset
function buttonsDeletion(mode) {
    var deletions = mapDocElement.getElementsByClassName("gm-style")[mode].children;
    while (deletions.length > 1) {
        for (let i = 1; i < deletions.length; i++) {
            deletions[i].parentNode.removeChild(deletions[i]);

        }
    }
}

//Promise asset....Do somethink after timeout
function promiseSomethink(timeout, somethink) {
    return new Promise((resolve, reject) => {
        //    Or-GetData Here we set artificial delay with setTimeOut  
        setTimeout(() => {
            somethink();
            resolve();
        }, timeout) //I dont care about the question mark because es6 is powerFull
    })
}

//Problem!!! Syghronized

// promiseSomethink(3000, () => {
//     changeOpacity();
// }).then(promiseSomethink(3000, () => {
//     initializePanorama();
// })
// );
var myclockTicking;

function clockTicking() {
    return new Promise((resolve, reject) => {
        var i = 0;
        myclockTicking = setInterval(function () {
            console.log(`${++i / 4}:s`);
        }, 250);
    });
}