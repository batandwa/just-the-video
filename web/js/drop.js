(function () {
'use strict';

var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload !== 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		};
	}
}

function dropLoad() {
  var drop = new Dropzone('.drop', {
    url: "#",
    clickable: false,
  });
  drop.on("drop", function(e) {
    if(e.stopPropagation) {
      e.stopPropagation();
    }
    if(e.preventDefault) {
      e.preventDefault();
    }

    var url = e.dataTransfer.getData('Text');
    console.log('Drop of {0} registered. Attempting to play video.'.format(url));
    Observable.notifyObservers(url);
  });
  drop.on('dragstart', function(e) {
    console.log('dragstart.');
  });
  drop.on('dragenter', function(e) {
    console.log('dragenter.');
  });
  drop.on('dragover', function(e) {
    console.log('dragover.');
  });
  drop.on('dragleave', function(e) {
    console.log('dragleave.');
  });

  console.log('Waiting for drag and drop events.');
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

addLoadEvent(dropLoad);
}());
