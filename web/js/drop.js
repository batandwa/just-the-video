// For discussion and comments, see: http://remysharp.com/2009/01/07/html5-enabling-script/
/*@cc_on'abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video'.replace(/\w+/g,function(n){document.createElement(n)})@*/

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

(function () {

var pre = document.createElement('pre');
pre.id = "view-source"

// private scope to avoid conflicts with demos
addEvent(window, 'click', function (event) {
  if (event.target.hash == '#view-source') {
    // event.preventDefault();
    if (!document.getElementById('view-source')) {
      // pre.innerHTML = ('<!DOCTYPE html>\n<html>\n' + document.documentElement.innerHTML + '\n</html>').replace(/[<>]/g, function (m) { return {'<':'&lt;','>':'&gt;'}[m]});
      var xhr = new XMLHttpRequest();

      // original source - rather than rendered source
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          pre.innerHTML = this.responseText.replace(/[<>]/g, function (m) { return {'<':'&lt;','>':'&gt;'}[m]});
          prettyPrint();
        }
      };

      document.body.appendChild(pre);
      // really need to be sync? - I like to think so
      xhr.open("GET", window.location, true);
      xhr.send();
    }
    document.body.className = 'view-source';

    var sourceTimer = setInterval(function () {
      if (window.location.hash != '#view-source') {
        clearInterval(sourceTimer);
        document.body.className = '';
      }
    }, 200);
  }
});

})();


(function () {
'use strict';
function windowLoaded() {
  // Dropzone.options.myAwesomeDropzone = {
  //   init: function() {
  //     this.on("addedfile", function(file) { alert("Added file."); });
  //   }
  // };
  drop = new Dropzone('div#drop', { url: '/file/post'});
  drop.on("addedfile", function(file) {
    alert("Added file.");
    console.log(file);
  });
  console.log(drop);

  $('#jq').bind('drop', function (e) {
    console.log(e);
    // var url = $(e.originalEvent.dataTransfer.getData('text/html')).filter('img').attr('src');
    // if (url) {
    //   jQuery('<img/>', {
    //     src: url,
    //     alt: 'resim'
    //   }).appendTo('#imgSection');
    // }

    return false;
  });

    var bin = document.getElementById('h5');

    addEvent(bin, 'drop', function (e) {
      if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
      if (e.preventDefault) e.preventDefault();

      var el = e.dataTransfer.getData('Text');
      console.log(e);
      console.log(el);

      // el.parentNode.removeChild(el);
      //
      // // stupid nom text + fade effect
      // bin.className = '';
      // yum.innerHTML = eat[parseInt(Math.random() * eat.length)];
      //
      // var y = yum.cloneNode(true);
      // bin.appendChild(y);
      //
      // setTimeout(function () {
      //   var t = setInterval(function () {
      //     if (y.style.opacity <= 0) {
      //       if (msie) { // don't bother with the animation
      //         y.style.display = 'none';
      //       }
      //       clearInterval(t);
      //     } else {
      //       y.style.opacity -= 0.1;
      //     }
      //   }, 50);
      // }, 250);

      return false;
    });

}

if(window.attachEvent) {
  window.attachEvent('onload', windowLoaded);
} else {
  if(window.onload) {
    var curronload = window.onload;
    var newonload = function(evt) {
      curronload(evt);
      windowLoaded(evt);
    };

    window.onload = newonload;
  } else {
    window.onload = windowLoaded;
  }
}
}());
