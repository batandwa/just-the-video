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
  var drop = new window.Dropzone('.drop', {
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
    console.log('Drop of ' + url + ' registered. Attempting to play video.');
    window.Observable.notifyObservers(url);
  });

  console.log('Waiting for drag and drop events.');
}

addLoadEvent(dropLoad);
var bodyEl = document.getElementsByClassName('player');

addEvent(bodyEl, 'mouseover', function(e) {
  var element = event.target;
  element.classList.add('mouse-on');
});

addEvent(bodyEl, 'mouseout', function(event) {
  var destElement = event.toElement || event.relatedTarget;
  if ((destElement && destElement.parentNode == this) || destElement == this) {
    return;
  }
  var eventTarget = event.target;
  if (eventTarget == this) {
    eventTarget.classList.remove('mouse-on');
  }
});
}());
