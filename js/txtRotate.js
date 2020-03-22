var TxtRotate = function (el, toRotate, period, times, withDelete, cursorEl, underEl, title = 'false') {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(cursorEl);
  fragment.appendChild(underEl);
  el.parentNode.insertBefore(fragment, el.nextSibling);
  this.numInstance = TxtRotate.numInstance++;
  this.cursorEl = cursorEl;
  this.title = title;
  this.underEl = underEl;
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.isDeleting = false;
  this.times = times;
  this.withDelete = withDelete;
  this.animateCursor = true;
  this.onLoadInstance();
  // this.tick();
};

TxtRotate.allInstances = [];
TxtRotate.numInstance = 0;
TxtRotate.prototype.onLoadInstance = function () {
  TxtRotate.allInstances.push(this);
}
//We start Typing each sentence instances
TxtRotate.prototype.tick = function (deletion = true, stopPoint = false, promise = null) {
  //console.log(deletion, stopPoint, promise);
  if (!this.isDeleting && this.txt === '' && this.loopNum == 0) { //First time ..GoodMorning time
    this.cursorEl.style.visibility = "visible";
    this.underEl.style.visibility = 'hidden';
    this.underEl.style.width = 0;
    //Clear all the mess for the replay
    for (let x = this.numInstance; x < TxtRotate.allInstances.length; x++) {
      TxtRotate.allInstances[x].el.innerHTML = '';
      TxtRotate.allInstances[x].underEl.style.visibility = "hidden";
    }
  }

  if (this.animateCursor) {
    this.animateCursor = !this.animateCursor;
    this.cursorEl.classList.toggle("flashCursor");
  } //stop the cursor before typing

  var i = this.loopNum % this.toRotate.length; //The Modulus (Division Remainder) Loop method e.g(0-2)
  // console.log('i', i);
  // console.log(this.loopNum, this.toRotate.length);

  //prepair and change the text
  var fullTxt = this.toRotate[i];
  var that = this;
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1); //what you already have - 1 for Deleting state, Loop breaker,Loop term
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1); //what you already have + 1 for !Deleting state Loop breaker,Loop term
  }
  //Typing = change the value
  this.el.innerHTML = this.txt;

  //Make it a litle bit or more faster by random
  var delta = 200 - Math.random() * 100;
  //If you are in deleting state make every delete 2 times faster each time you delete one character
  if (this.isDeleting) {
    delta /= 2;
  }

  //Control the situation-The case -The state of the typing action && handle the loop terms
  var finitoWord = function (finito = true) {
    if (finito) { //only if you have finished the word...not for deleting
      that.loopNum++; //Move to the next word && Take care the stop index array(from 0-toRotate.length) safety
      delta = 2000; //Take a  3sec breath to start typing again
    }
    that.cursorEl.classList.toggle("flashCursor"); //Activate the flashCursor
    that.animateCursor = true; // Point it to the code by the easy way ... the flag way.
  }

  if (!this.isDeleting && this.txt === fullTxt) { //If the word typing is finished and the action state !isDeleting
    //Have you insert data-withDelete=true?
    //Do you allow from the prototype.tick() method instanse?
    //Is this the last word you want to present?
    if (this.withDelete == "true" && deletion && this.loopNum < this.times - 1) {
      // console.log(this.withDelete);
      delta = this.period;
      this.isDeleting = true; //isDeleting state action
      finitoWord(false);
    } else { //In case we dont want to delete it just move to the next word in the array of messages and delete the content
      finitoWord();
      this.txt = "";
    }

  } else if (this.isDeleting && this.txt === '') { //Deleting is finished
    this.isDeleting = false;
    finitoWord();
  }



  //The normal flow and the loop gator, Recursive function
  if (this.loopNum < this.times) { //Have you finished the showing the desirable words in the given data-array
    // console.log("counter", this.counter, "times", this.times);
    setTimeout(function () {
      that.tick(deletion, stopPoint, promise);
    }, delta);

  } else { //resest
    this.loopNum = 0;
    this.txt = '';
    this.isDeleting = false;
    this.underEl.style.visibility = 'visible';
    this.cursorEl.style.visibility = 'hidden';
    this.underEl.style.width = this.title;
    promise();
  }


};

window.onload = function () {
  var cursorElements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < cursorElements.length; i++) {
    var toRotate = cursorElements[i].getAttribute('data-rotate');
    var period = cursorElements[i].getAttribute('data-period');
    var times = cursorElements[i].getAttribute("data-times");
    var withDelete = cursorElements[i].getAttribute("data-withDelete");
    var title = cursorElements[i].getAttribute("data-title");
    var cursorEl = document.createElement('span');
    cursorEl.setAttribute("class", "textCursor animeCursor");
    cursorEl.style.color = cursorElements[i].style.color;
    cursorEl.style.fontSize = cursorElements[i].style.fontSize;
    cursorEl.style.fontWeight = cursorElements[i].style.fontWeight;
    cursorEl.innerHTML = '|';
    var underEl = document.createElement("div");
    underEl.setAttribute("class", "underLine");
    underEl.style.backgroundColor = cursorElements[i].style.color;
    if (toRotate) {
      new TxtRotate(cursorElements[i], JSON.parse(toRotate), period, times, withDelete, cursorEl, underEl, title);
    }
  }
};

//Promise asset for GeoBio Personal presentation
function promiseSome(somethink) {
  return new Promise((resolve, reject) => {
    somethink(resolve);//passing the resolve object of the Promise through the callBack who we calling
  })
} 


//The first one statement is the template i use The others is very messy because we have many nested thinks...The return is the solution
// promiseSome((resolve) => {
//    TxtRotate.allInstances[0].tick(true, false, () => {
//    console.log('haha');
//    resolve(); 
//    }) 
//   }).then(() => {
//      console.log('finito') 
//     })
    //The end of the example

//Chaining Different promises by return the new one inside inside the then of the old one
function autoWrite() {
  
promiseSome(resolve => {
  TxtRotate.allInstances[0].tick(true, false, () => {
    console.log("Inside-haha00");
    resolve();
  });
})
  .then(() => {
    console.log("out-BigSlider is finished!!");
    return promiseSome(resolve => {
      TxtRotate.allInstances[1].tick(true, false, () => {
        console.log("Inside-haha11");
        resolve();
      });
    });
  })
  .then(() => {
    console.log("out-finitoSec-runningThird...");
    return promiseSome(resolve => {
      TxtRotate.allInstances[2].tick(true, false, () => {
        console.log("Inside-haha22");
        resolve();
      });
    });
  })
  .then(() => {
    console.log("out-finitoThird-runningFourth");
    return promiseSome(resolve => {
      TxtRotate.allInstances[3].tick(true, false, () => {
        console.log("Inside-haha33");
        resolve();
      });
    });
  })
  .then(() => {
    console.log("out-finitoFirst-runningSec...and run SliderFx.Big[0]");
    return promiseSome(resolve => {
      SliderFx.smallAndBigInstances[1]._navigateSecond(0, () => {
        console.log("Inside-BigSlider");
        resolve();
      });
    });
  })
  .then(() => {
    console.log("finitoAll!!!!!!!!");
  });
}


function bigBro(place){
SliderFx.smallAndBigInstances[1]._navigateSecond(place);
}
console.log('autoWrite(), bigBro(0-3), insider()');