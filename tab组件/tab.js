window.onload = function() {

	var GLOBAL = {};
	GLOBAL.namespace = function(str) {
		var arr = str.split("."),
			o = GLOBAL;
		for (i = (arr[0] == 'GLOBAL') ? 1 : 0; i < arr.length; i++) {
			o[arr[i]] = o[arr[i]] || {};
			o = o[arr[i]];
		}
	}
	GLOBAL.namespace("DOM");
	GLOBAL.DOM.getElementsByClassName = function(str, root, tag) {
		if (root) {
			root = typeof root === "string" ? document.getElementById(root) : root;
		} else {
			root = document.body;
		}
		tag = tag || "*";
		var els = root.getElementsByTagName(tag),
			arr = [];
		for (var i = 0; i < els.length; i++) {
			for (var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++) {
				if (k[j] == str) {
					arr.push(els[i]);
					break;
				}
			}
		}
		return arr;
	}
	GLOBAL.DOM.addClass = function(node, str) {
		if (!new RegExp("(^|\\s+)" + str).test(node.className)) {
			node.className = node.className + " " + str;
		}
	}
	GLOBAL.DOM.removeClass = function(node, str) {
		node.className = node.className.replace(new RegExp("(^|\\s+)" + str), "");
	}

	GLOBAL.namespace("Event");
	GLOBAL.Event.on = function(node, eventType, handler,scope) {
		node = typeof node === 'string' ? document.getElementById(node) : node;
		scope = scope||node;

		if (document.all) {
			node.attachEvent("on" + eventType, function(){handler.apply(scope,arguments)})
		} else {
			node.addEventListener(eventType, function(){handler.apply(scope,arguments)}, false);
		}
	}

	function setTab(config) {
		var root = config.root;
		var currentClass = config.currentClass;
		var trigger = config.trigger||"click";
		var handler = config.handler;
		var autoPlay = config.autoPlay;
		var playTime = config.playTime||3000;


		var tabMenu = GLOBAL.DOM.getElementsByClassName("J_tab_menu", root),
			tabContentMenu = GLOBAL.DOM.getElementsByClassName("J_tab_content", root);
			trigger = trigger||"click";
			playTime = playTime || 3000;

		var currentIndex = 0;
		function showItem(n) {
			for (var j = 0; j < tabContentMenu.length; j++) {
				tabContentMenu[j].style.display = "none";
			}
			tabContentMenu[n].style.display = "block";
			if (currentClass) {
				var currentMenu = GLOBAL.DOM.getElementsByClassName(currentClass, root)[0];
				if (currentMenu) {
					GLOBAL.DOM.removeClass(currentMenu, currentClass)
				}
				GLOBAL.DOM.addClass(tabMenu[n], currentClass)
			}
			if (handler) {
				handler(n);
			}
		}
		function autoHandler(){
			currentIndex++;
			if (currentIndex>=tabs.length) {
				currentIndex = 0;
			}
			showItem(currentIndex);
		}
		if (autoPlay) {
			setInterval(autoHandler,playTime);
		}


		for (var i = 0; i < tabMenu.length; i++) {
			tabMenu[i]._index = i;
			GLOBAL.Event.on(tabMenu[i],trigger,function() {
				showItem(this._index);
				currentIndex = this._index;
			});
		}
	}
	var tabs = GLOBAL.DOM.getElementsByClassName("J_tab");
	setTab({root:tabs[0],currentClass:"tab-currentMenu1",trigger:"mouseover",handler:function(index){alert(index)}});
	setTab({root:tabs[1],currentClass:"tab-currentMenu",trigger:"mouseover",handler:function(index){
		alert("You active"+(index+1)+"tabs");
	}});

}