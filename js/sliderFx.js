;
(function (window) {
	'use strict';

	function SliderFx(el, isBig = false) {

		this.el = el;
		this.isBig = isBig;
		this.first = true;
		console.log(isBig)
		if (!isBig) {
			this.options = {
				speed: 500,
				easing: 'ease',
				paths: {
					rect: "m 75,7.5 v 45 c -28.240734,0 -44.101611,0 -70,0 v -45 c 27.331586,0 41.604083,0 70,0",
					curve: {
						right: "m 75,7.5 v 45 C 50.074486,43.484389 30.013902,43.92633 5,52.5 v -45 c 24.768325,-9.5459415 45.228005,-9.5459415 70,0",
						left: "m 75,7.5 v 45 c -24.925514,9.63433 -44.986098,9.457553 -70,0 v -45 c 25.03349,7.954951 45.581559,7.689786 70,0"
					}
				}
			};
		} else { //This is for the big Guy
			console.log('The bigBoy sets his options');
			this.options = {
				speed: 1000,
				easing: 'ease',
				paths: {
					rect: 'M33,0h41c0,0,0,9.871,0,29.871C74,49.871,74,60,74,60H32.666h-0.125H6c0,0,0-10,0-30S6,0,6,0H33',
					curve: {
						right: 'M33,0h41c0,0,5,9.871,5,29.871C79,49.871,74,60,74,60H32.666h-0.125H6c0,0,5-10,5-30S6,0,6,0H33',
						left: 'M33,0h41c0,0-5,9.871-5,29.871C69,49.871,74,60,74,60H32.666h-0.125H6c0,0-5-10-5-30S6,0,6,0H33'
					}
				}
			};

		}
		//this._init();
		//Ternary conditional with multiple statements e.g condition ? (statement,statement,statement) : (statement,statement,statement)
		SliderFx.smallAndBigInstances.push(this);
		this._init();
		this._initEvents();

	}

	// SliderFx.prototype.options = {}
	SliderFx.smallAndBigInstances = [];
	SliderFx.dummyChildren = [].slice.call(document.getElementById("dummy").children);


	SliderFx.prototype._init = function () {
		this.itemsList = this.el.querySelector('ul'); //for move all the slider with transition
		this.items = [].slice.call(this.itemsList.querySelectorAll('li')); //for svg animate
		this.itemsCount = this.items.length;
		this.curr = this.old = 0;
		this.isAnimating = false;
		this.was = 'left';
		this.value = 0;
		var self = this;
		var createSvg = function (html) {
			var frag = document.createDocumentFragment(),
				temp = document.createElement('div');
			temp.innerHTML = html;
			while (temp.firstChild) {
				frag.appendChild(temp.firstChild);
			}
			return frag;
		}



		// add svgs with rectangle path in every item = li in ul element of the specific target el
		this.items.forEach(function (item) {
			var svg = createSvg('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none"><path d="' + self.options.paths.rect + '"/></svg>');
			item.insertBefore(svg, item.childNodes[0]); //Make the js Builded Svg Element the first element of the item li 

			var s = Snap(item.querySelector('svg')); //We must snap it in live elem?Why?
			item.path = s.select('path'); //Save some instructions on this element?
		});
	}


	SliderFx.prototype._initEvents = function () {
		var self = this;
		//From array like an object(HTMLCOllectionvar ) to array..Create an array and use the given specific refference
		//The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
		//We can use the forEach array methods now
		//Make a conection with the menu
		//BuildConnection 
		if (!this.isBig) {

			SliderFx.dummyChildren.forEach((child, index) => {
				child.addEventListener('click', function () {
					//Style(reset) the old clicked element
					SliderFx.dummyChildren[self.curr].style.color = '';
					SliderFx.dummyChildren[self.curr].className = 'menuItem';
					//Style the clicked element
					this.classList.toggle("dummyActive");
					//In relation with what button you have used-clicked, power-turn on the sliderFx
					self._navigateSecond(index);
				});
			});
		} else { //this._navigateSecond(0); //This is the bridge trigger for an event listener////Now we se it in auto 
		}

	}


	SliderFx.prototype._navigateSecond = function (place, promise=false) { //e.g the seconde button just hitted palce = 1
		if (this.isAnimating) {
			return false;
		}
		if(promise) this.promise = promise;
		this.old = this.curr;
		//New brand event tooked by the place of the place....the second trigger to the second slider
		this.curr = place;
		this.isAnimating = true;

		this._slideSecond();
		console.log('from navigateSecond:',this.old, this.curr);
	}

	SliderFx.prototype._slideSecond = function () {
		var self = this;
		//isBig spliter cases
		if (!this.isBig) {
			var startSlider = function () {
				self.value = (self.curr * 25) * -1; //HOw much to slide in relation to the this.curr = place= index of the dummyChildren[i]
				self.itemsList.style.transform = 'translateY(' + self.value + '%)'; //Vertical slider
			};
		} else {
			//The Big concept differences
			var startSlider = function () {
				//we need to execute 2 times one for show and one for hide..We will place all the bigEls on top to eachother
				//We want to appear it on the empty left place of the page ...from right hide to left visibble
				//Is it out?,go in...Is it in?,go out
				//self.value = (self.out) ? 100 : -100; //first Out?go left= minus
				console.log(self.old, self.curr);
				self.items[self.old].style.transform = 'translateX(' + 0 + '%)'; //Slide out the view old item!
				self.items[self.curr].style.transform = 'translateX(' + -100 + '%)'; //Slide in the view curr item!
			

				//self.out = !self.out;
			};
		}

		//Maybe the bigEl doesnt need that shit but the small needs them for sure
		if (!this.isBig) {
			if (self.old < self.curr) {
				self.direction = 'right';
				self.stable = false;
			} else if (self.old > self.curr) {
				self.direction = 'left';
				self.stable = false;
			} else {
				self.direction = self.was;
				self.stable = true;
			}
		}

		//console.log(self.value, self.stable, self.direction, self.was, self.old, self.curr);
		this._morphSVGsSecond(startSlider);
	}


	SliderFx.prototype._morphSVGsSecond = function (callback) {
		var self = this,
			speed = this.options.speed,
			pathCurvedLeft = this.options.paths.curve.left,
			pathCurvedRight = this.options.paths.curve.right,
			pathRectangle = this.options.paths.rect,
			dir = this.direction;


		//AAA exiting the old one
		if (!this.isBig) {
			this.items[this.old].path.stop().animate({
				'path': dir === 'left' ? pathCurvedLeft : pathCurvedRight
			}, speed * .5, mina.easeout);
		} else {
            if(!this.first){
			this.items[this.old].path.stop().animate({
				'path': pathCurvedRight
			}, speed * 1, mina.easeout);
		}
		}


		//BBB entering..set all the lis to the morhp related with the direction
		if (!this.isBig) {
			this.items.forEach((item) => {
				item.querySelector('path').setAttribute('d', dir === 'left' ? pathCurvedLeft : pathCurvedRight);

			});
		} else {
			//In the 'big's case we dont want to morph all the items..only just the current and the old one
			this.items[self.curr].querySelector('path').setAttribute('d', pathCurvedLeft);
			this.first = !this.first;
		}

		//CCC slider...all the lis if !this.isBig
		setTimeout(function () {
			callback.call();
		}, speed * .2);


		var currItem = this.items[this.curr];
		var timeLength = (self.isBig) ? 0.7 : 0.5;
		//DDD entering  to rectangle
		setTimeout(function () {
			if(self.promise){
				setTimeout(() => { self.promise() },self.options.speed * 3)
			}
			currItem.path.stop().animate({
				'path': pathRectangle
			}, speed * 3, mina.elastic);
			self.isAnimating = false;
			self.was = self.direction;
		}, speed * timeLength );

	}

	window.SliderFx = SliderFx;

})(window);