var image = document.getElementById('click_image');
var canvas = document.getElementById('canvas');

var imageWidth = image.clientWidth;
//var imageHeight = image.clientHeight;
var imageHeight = 1080 * imageWidth / 1920;

// image의 높이를 1080으로 지정해서 캔버스의 높이를 설정했음.
console.log('imageWidth : ', imageWidth, 'imageHeight : ', imageHeight);

canvas.width = imageWidth-16;
canvas.height = imageHeight;
canvas.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
canvas.style.zIndex = "20";
canvas.style.position = "absolute";
canvas.style.top = "145px";
canvas.style.right = "16px";
var ctx = canvas.getContext("2d");

var bef = "";
var circles = document.getElementById("circles");
for (var i = 0; i < chapter_data.length; i++) {

    var y = chapter_data[i]['fields']['pointY'];
    var x = chapter_data[i]['fields']['pointX'];
    var width = chapter_data[i]['fields']['width'];
    var height = chapter_data[i]['fields']['height'];
//     console.log(width, height);

    var date = chapter_data[i]['fields']['upload_dt'];
//    var result_y = (document.body.scrollHeight * y / 100) - 5;
//    var result_x = (window.innerWidth * x / 100) - 10;
    var result_y = imageHeight * y / 100;
    var result_x = imageWidth * x / 100;
//    console.log(result_x);

    var second_x = ((window.innerWidth - width) * ((x-0) / 100));
    var second_y = ((document.body.scrollHeight - height) * (y / 100));
//    console.log(second_y);
//    var second_x = ((window.innerWidth - width) * x / width);

    ctx.fillRect(result_x, result_y+32, 5, 5);
    ctx.fillStyle = `rgba(255, 255, 0, 0.7)`;

}