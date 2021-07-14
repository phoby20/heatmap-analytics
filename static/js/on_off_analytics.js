var path = location.pathname;
var userAgentInfo = window.navigator.userAgent;

console.log(navigator.appName);
//
if (navigator.appName == 'Netscape') {
//    var head = document.getElementsByTagName('head')[0];
//    var link = document.createElement('link');
//    link.setAttribute('rel','stylesheet');
//    link.setAttribute('type','text/css');
//    link.setAttribute('href','static/css/style.css');
//    head.appendChild(link);
    console.log("path");
    var circle_js = document.getElementById('inDataDrow');
    circle_js.remove();
}


