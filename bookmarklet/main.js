var p = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,' +
    'width=0,height=0,left=-1000,top=-1000';
open('http://just-the-video.docker.local/?v=' + encodeURI(window.location.href), 'test', p);
