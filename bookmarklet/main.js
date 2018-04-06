var domainName = 'justthevideo.batandwa.me';
var properties = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,' +
    'width=0,height=0,left=-400,top=-400';
open(
    'http://' + domainName + '/watch.html?v=' + 
    encodeURIComponent(window.location.href + '&autoplay=1&disablekb=1'), null, properties
);
