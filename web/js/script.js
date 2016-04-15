function main() {
  var domain = getDomain();

  Observable.addObserver(youtubeObserver);

  Observable.notifyObservers(domain, window.location.href);
}

function getDomain() {
  var loc = window.location;
  return loc.hostname;
}

var Observable = {
  observers: [],
  addObserver: function(observer) {
    this.observers.push(observer)
  },
  removeObserver: function(observer) {
    var index = this.observers.indexOf(observer)

    if (~index) {
      this.observers.splice(index, 1)
    }
  },
  notifyObservers: function(domain, url) {
    for (var i = this.observers.length - 1; i >= 0; i--) {
      this.observers[i](domain, url)
    };
  }
}

youtubeObserver = function(domain, url){
  console.log("Loading Youtube video: " + url)
};

main();
