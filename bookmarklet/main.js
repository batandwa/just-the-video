var p = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,' +
    'width=0,height=0,left=-400,top=-400';
open('http://just-the-video.docker.local/?v=' + encodeURIComponent(window.location.href), 'test', p);
