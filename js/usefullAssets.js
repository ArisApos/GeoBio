// Static inception with diving

function inception(time, repeat) {
    
     if( repeat<0 ){
         return 1;
     } 
     console.log(`hello ${time}`);
     time = time - 200; 
     setTimeout(function(){inception(time, repeat-1)}, time);
    
    }





////////////////Understand Promises chapter

//Promise asset
function promiseSomethink(timeout, somethink) {
    return new Promise((resolve, reject) => {
        //    Or-GetData Here we set artificial delay with setTimeOut

        setTimeout(() => {
            somethink();
            resolve();
        }
            , timeout) //I dont care about the question mark because es6 is powerFull
    })
}
console.log("zeeeeee");
clockTicking();
promiseSomethink(1000, () => { console.log("firsttttttt"); }).then(() => {
    promiseSomethink(1000, () => { console.log("second"); clearInterval(myclockTicking); }).then(() => { });
});
console.log('hiiiiii');




//Dynamic inception with steps ,, How Promises are working
function msgAfterTimeout(msg, who, timeout) {
    return new Promise((resolve, reject) => {
        console.log(`BeforeTimeout--------in`);
    //    Or-GetData Here we set artificial delay with setTimeOut
       setTimeout(() =>{ 
           resolve(`${msg} Hello from ${who}! with delay-timeThinkingTimeResolving=${timeout}--\n`);
           console.log('after resolve buttttt inside the promise');
           for(let y=0; y<50;y++) console.log('AfterTimeout---------resolved-Inside');
    }, timeout)
    })
}

//Metter the times in promises
clockTicking();
msgAfterTimeout("ThisArtMessage", "Foo", 5000).then(
    (msg) => {
    console.log('first-------resolved-outside');
        msgAfterTimeout(msg, "Bar", 5000).then(() => { console.log("This is so fuckin terrible mess"); clearInterval(myVar);})
    console.log('second-------resolved-outside and i have called the promise again');
})

// .then((msg) => {
//     console.log(`done both:--\n${msg}`);
//     console.log("Finito");
//     clearInterval(myVar);
// })

//ClockTicking .... I use Promise without any point...its useless
var myVar;
function clockTicking() {
    return new Promise((resolve, reject) => {
        var i = 0;
        myVar = setInterval(function () { console.log(`${++i / 4}:s`) }, 250);
    })
}

//Ending chapter with promises testing




//Dynamic inception with diving and delay
function msgAfterTimeout(msg, who, timeout) {
    return new Promise((resolve, reject) => {
        //    Or-GetData Here we set artificial delay with setTimeOut
        var beforeQuery = performance.now();

        setTimeout(() => resolve({messageFromPromise:`${msg} Hello from ${who}! with delay-timeThinkingTimeResolving=${timeout}--\n`,beforeQueryTime:beforeQuery}), timeout)
    })
}






function DynamicInception(time, repeat, message, beforeQuery) {
  
    console.log(`Good Morning`);
    if (repeat == 0) {
        return 1;
    }
    var afterQuery = performance.now();
    var queryDelay = afterQuery - beforeQuery; 
    console.log(`queryDelay=${queryDelay}`);
    time = time - 200; // slow down the artificial delay
    repeat--;

    if (queryDelay > time) {//Do it emidiatly because we are late
        msgAfterTimeout(message, "Foo" + time, time/2).then((objPromise) => {
            console.log(` queryDelay > time-->done:--\n${objPromise.messageFromPromise}\n\n`);
            DynamicInception(time, repeat, objPromise.messageFromPromise, objPromise.beforeQueryTime);
            console.log('!!!!!ErrorRistasss');
            return 1;
        })
    }  
    
    
    console.log(`setTimeoutStarting...`);
    clockTicking();
    setTimeout(function () {
    console.log(`setTimeoutFinished...\n`);
    clearInterval(myVar);
    //make a promise with the half timeDelay 
        console.log(`Promise-----Starting...`);
        clockTicking();       
    msgAfterTimeout(message, "Foo"+time, time/2).then((objPromise) => {
        console.log(`Promise----Finished...\n`);
        clearInterval(myVar);

        console.log(`done:--\n${objPromise.messageFromPromise} &&&&&& queryDelay= ${objPromise.queryDelay}`);
        console.log("another statement\nstatement\n\n\n");
        DynamicInception(time, repeat, objPromise.messageFromPromise, objPromise.beforeQueryTime);
        console.log("!!!!!Muahahhahaha"); 
    });
    }, time )//If you have already late make some adjustments  time-  queryDelay
    
}

//performance issue
var start = new Date().getTime();
var t0 = performance.now();
for (i = 0; i < 50000; ++i) {
    // do something
}
var t1 = performance.now();
var end = new Date().getTime();
console.log(`time1 = ${end-start} and time2 = ${t1-t0}`);

var t0 = performance.now();
var t1 = performance.now();
console.log(`time2 = ${t1 - t0}`);








//For the inception

function getData(time, repeat) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}



var time = 0;
var diff = 30;
var minTime = 0;
var maxTime = 1000;

// http://upshots.org/actionscript/jsas-understanding-easing
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

for (var i = 0, len = diff; i <= len; i++) {

    setTimeout(function () {
    self.turnPages(s);                           
    console.log("Page " + s + " turned");
    }, time);
    time = easeInOutQuad(i, minTime, maxTime, diff);
    console.log(time);
}

