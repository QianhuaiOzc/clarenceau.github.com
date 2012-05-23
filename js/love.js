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
	var content = "姚嘉悦：\n谢谢你，谢谢你骂我。我想没有你不断这么在身边骂我，我想我可能不知道会变得怎么样。"+
			"我们在一起也快5年了，5年前的那一天，仍然历历在目。5年前的那一个晚上，我对自己说，我一定要努力，一定要给你好的生活。"+
			"5年了，我不断地努力，坚持着，走到了今天。但是，自己却慢慢地忘却了一样更重要的东西。感谢你，是你的文字骂醒了我。"+
			"我所有努力，奋斗的意义并不是所有的这一切的物质，最重要的是你！"+
			"如果没有了你，一切都是没有意义的。今天我看一个视频，大概是一些即将毕业的大学生，对感情的坚持，里面有个人说了这么一句话，"+
			"”工作的话，不管是在哪个岗位，都可以通过自己的努力，获得自己想要的东西。但是人如果一旦错过的话，就很难找到另一个合适的。“"+
			"不知道是不是因为上了大三，眼看马上就要毕业了，又要找工作，我变了很多。我承认在这一年你回去以后，我真的很多时候都忽略你。"+
			"其实，我之前就很想跟你说一段话。我发现，其实我是一个很自私的人。你偶尔会跟我说，如果不是你当时经常打扰我，我会考上中大的。但是，我其实很想跟你说，我考不上中大，其实根本就是我自己没能力。但是我是那么自私，那时候的我，常常只顾自己的学习，就不理你。我真的觉得自己很错。"+
			"想不到，三年后，我又一次发作。不知道，你还愿不愿意再给我一次机会？我愿意再努力一次，这一次，不再为所有其他东西左右，只为你而努力，努力去爱你，真系你！"+
			"\nPS:想起你过，我一直没有送过花给你。真实的花，我还买不起，但是在我的世界里，我送你999朵玫瑰！\n\n"+"爱你的 欧振聪";

	return {
		init: function() {
			container = sandbox.container;
			sandbox.show(container);
			var infoAsync = eval(Jscex.compile("async", function(element, str) {
		        for(var i = 0; i < str.length; i++) {
		            element.innerText += str[i];
			        $await(Jscex.Async.sleep(50));
			    }

			    $await(Jscex.Async.sleep(2000));
			    element.innerHTML = "<span>最浪漫的三个字，不是我爱你</span>";
			    element.innerHTML = "<span>而是一辈子</span>";
			    element.innerText = str;
		    }));

		    infoAsync(container, content).start();
		},



		destroy: function() {

		}
	};
});



Core.startAll();