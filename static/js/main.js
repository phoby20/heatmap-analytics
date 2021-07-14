//window.onmousemove = handleMouseMove;
//
//function handleMouseMove(event) {
//
//    event = event || window.event; // IE対応
//    output_clientX = document.getElementById("output_clientX");
//    output_clientY = document.getElementById("output_clientY");
//
//    var Xpercent = event.clientX / window.innerWidth * 100;
//    var Ypercent = event.pageY /document.body.scrollHeight * 100;
//    var Y = event.pageY;
//
//    output_clientX.innerHTML = "clientX:" + Xpercent + "%";
//    output_clientY.innerHTML = "clientY:" + Ypercent + "%";
//
//    target = document.getElementById("output_screen");
//    target.innerHTML = "Screen X:" + window.innerWidth + ", Screen Y:" + event.screenY;
//};
//
