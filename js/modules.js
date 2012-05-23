Core.registerModule("info", function(sandbox) {
	var container = null;
	return {
		init: function() {
			container = sandbox.container;
			sandbox.show(container);

            var str = '{\n"name":"ClarenceAu",\n"sex":"male",\n"email":"ozhencong@gmail.com"\n}';
	        var infoAsync = eval(Jscex.compile("async", function(element, str) {
		        for(var i = 0; i < str.length; i++) {
		            var span = document.createElement("span");
		            span.innerText = str[i];
		            element.appendChild(span);
			        $await(Jscex.Async.sleep(100));
			    }

			    element.innerText = str;
		    }));

		    infoAsync(container, str).start();
		},

		destroy: function() {
			
		}
	};
});



Core.startAll();