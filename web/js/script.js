(function () {
'use strict';

function main() {
  var domain = getDomain();

  Observable.addObserver(youtubeObserver);
  Observable.addObserver(tedObserver);

  Observable.notifyObservers('youtube.com', 'https://www.youtube.com/watch?v=xPZDoHNpobE');
  // Observable.notifyObservers(domain, window.location.href);
}

/**
 * Gets domain name from the address bar.
 * @return {string} The domain name without subdomains.
 */
function getDomain() {
  var loc = window.location;
  return loc.hostname;
}

/**
 * The observable where we'll register and centrally distribute requests to
 * convert a url to an Iframe.
 * @type {Object}
 */
var Observable = {
  /**
   * Available repository of observers.
   * @type {Array}
   */
  observers: [],

  /**
   * Adds an observer to the list.
   * @param  {Object} observer A function to handle one of the domains hosting
   *                           videos.
   * @todo                     Handle situations where the handler does not
   *                           exist.
   * @return {void}
   */
  addObserver: function(observer) {
    this.observers.push(observer);
  },

  /**
   * Remove an observer from the list.
   * @param  {Object} observer The function to be removed from the handler list.
   * @todo                     Handle situations where the handler does not
   *                           exist.
   * @return {void}
   */
  removeObserver: function(observer) {
    var index = this.observers.indexOf(observer);

    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  },

  /**
   * Request an Iframe from the list of handlers available.
   * @param  {string} domain The domain name.
   * @param  {[type]} url    The full URL of the domain name.
   * @todo                   Handle extracting of the domain name in here.
   * @return {string}        The Iframe generated by one of the profiders.
   *                         Null is returned if none of the providers
   *                         can handle this domain.
   */
  notifyObservers: function(domain, url) {
    var embedCode;
    for (var i = this.observers.length - 1; i >= 0; i--) {
      embedCode = this.observers[i](domain, url);
      if(typeof(embedCode) !== 'undefined') {
        // var code = '<iframe width="400" height="300" src="https://www.youtube.com/embed/JjFwNlbIYXs" frameborder="0" allowfullscreen></iframe>';
        var fragment = createElement(embedCode);
        document.body.insertBefore(fragment, document.body.childNodes[0]);
        return;
      }
      console.debug('We don\'t have a for handler for this URL.');
    }
  }
};

/**
 * Handler for Youtube videos.
 * @param  {string} domain The hostname of the video.
 * @param  {string} url    The full video URL.
 * @return {string}        The embed code.
 */
function youtubeObserver(domain, url) {
  // TODO: Check if the regex won't be enough to nullify the need for this switch.
  switch (domain) {
    case 'youtu.be':
    case 'youtube.com':
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/;
      var match = url.match(regExp);
      if (match && match.length >= 2) {
        // return match[2];
        // var vidId = ^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*
        var code = '<iframe width="400" height="300" src="https://www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>';
        console.debug("Loading Youtube video: " + url);
        return code;
      } else {
        console.error('Could not safely determine Youtube video ID.');
        return '';
      }
      break;

    default:
      return null;
  }
  // var fragment = createElement(code);
  // document.body.insertBefore(fragment, document.body.childNodes[0]);

  // var script=document.createElement('script');
  // script.type='text/javascript';
  // script.src="https://cdn.adf.ly/js/link-converter.js";

  // document.body.appendChild(script);
}

/**
 * Handler for TED talk videos.
 * @param  {string} domain The hostname of the video.
 * @param  {string} url    The full video URL.
 * @return {string}        The embed code.
 */
function tedObserver(domain, url) {
  console.debug("Loading Ted video: " + url);
}

function createElement(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

main();
}());
