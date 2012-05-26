Core.registerModule("container", function(sandbox) {
	var container = null;
	var audio = null, loading = null;

	return {
		init: function() {
			container = sandbox.container;

			loading = sandbox.createElement("div");
			loading.className = "loading";
			document.body.appendChild(loading);
			sandbox.hide(loading);

			audio = new Audio();
			audio.src = "static/only_you.mp3";
			audio.autoplay = "autoplay";
			var interval = setInterval(function() {
				if(audio.readyState != 4) {
					sandbox.show(loading);
					sandbox.hide(container);
				} else {
					clearInterval(interval);
					container.appendChild(audio);
					sandbox.hide(loading);
					sandbox.show(container);
					sandbox.notify({"type": "wordsBegin"});
				}
			}, 50);
		},
		destroy: function() {}
	};
});

Core.registerModule("stars", function(sandbox) {
	var canvas = null, ctx = null;
	return {
		init: function() {
			canvas = sandbox.container;
			sandbox.show(canvas);
			ctx = canvas.getContext("2d");
			canvas.setAttribute("width", 1024);
			canvas.setAttribute("height", 768);

			var lingrad = ctx.createLinearGradient(0, 0, 1024, 768);
			ctx.fillStyle = "#232256";
			ctx.fillRect(0, 0, 1024, 768);
			
		},

		destroy: function() {

		}
	};
});

Core.registerModule("flowers", function(sandbox) {
	var canvas = null, ctx = null;
	var flower = null;
	var grid = new Array(11), sumOfFlowers = 0;

	var height = 768, width = 1024;
	return {
		init: function() {
			canvas = sandbox.container;
			sandbox.show(canvas);
			ctx = canvas.getContext("2d");
			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);

			for(var i = 0; i < 11; i++) {
				grid[i] = new Array(11);
				for(var j = 0; j < 11; j++)
					grid[i][j] = 0;
			}

			flower = new Image();
		    flower.src = "img/f1.png";
		    var interval = setInterval(function() {
				var x = Math.random() * 550, y = Math.random() * 475;
				var i = Math.floor(x / 50), j = Math.floor(y / 50);
				if(grid[i][j] <= 10) {
					grid[i][j]++;
					sumOfFlowers++;
					ctx.drawImage(flower, 205 + x, 125 + y, 50, 50);
					if(sumOfFlowers > 1000) 
						clearInterval(interval);
				}
		    }, 50);
		    	
			ctx.shadowOffsetX = 10;
			ctx.shadowOffsetY = 10;
			ctx.shadowColor = 'rgba(100, 100, 100, 0.5)';
			ctx.shadowBlur = 7.5;
			this.drawHeart();
		},

		drawHeart: function() {
			ctx.fillStyle = "#cc00ff";
			ctx.beginPath();
			ctx.moveTo(480, 200);
			ctx.bezierCurveTo(480, 185, 455, 125, 355, 125);
			ctx.bezierCurveTo(205,125,205,312.5,205, 312.5);
			ctx.bezierCurveTo(205,400,305,510,480,600);
			ctx.bezierCurveTo(655,510,755,400,755,312.5);  
			ctx.bezierCurveTo(755,312.5,755,125,605,125);  
			ctx.bezierCurveTo(505,125,480,185,480,200);
			ctx.stroke();
			ctx.fill();
			ctx.clip();
		},

		destroy: function() {

		}
	};
});

Core.registerModule("words", function(sandbox) {
	var container = null;
	


	return {
		init: function() {
			container = sandbox.container;
			sandbox.show(container);
			var infoAsync = eval(Jscex.compile("async", function(element, str, second, third) {
		        for(var i = 0; i < str.length; i++) {
		            element.innerText += str[i];
			        $await(Jscex.Async.sleep(100));
			    }
			    element.innerText = str;
			    $await(Jscex.Async.sleep(2000));
			    element.innerHTML = '<span class="second">'+second+"</span>";
			    $await(Jscex.Async.sleep(2000));
			    element.innerHTML = '<span class="third"><p>'+third+"</p></span>";
		    }));
			sandbox.listen({"wordsBegin": function() {
				infoAsync(container, "content", "second", "third").start();	
			}});
		},



		destroy: function() {

		}
	};
});



Core.startAll();