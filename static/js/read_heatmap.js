//出典：https://coliss.com/articles/build-websites/operation/javascript/js-real-time-heatmap-used-canvas.html

var carefully_image = document.getElementById('carefully_image');
console.log('carefully_image : ', carefully_image);

window["onload"]=function(){
    var canvas, ctx;
//    var Xclient = window.innerWidth; // 윈도우창의 너비를 구함
    var Xclient = carefully_image.width; // 윈도우창의 너비를 구함
//    var Yclient = document.body.scrollHeight; // 본문의 높이를 구함
    var Yclient = carefully_image.height; // 본문의 높이를 구함
    console.log('Xclient : ', Xclient, 'Yclient : ', Yclient);
    canvas = document.getElementById('d');
    canvas.width = Xclient;
    canvas.height = Yclient;
    canvas.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    canvas.style.zIndex = "20";
//    canvas.style.border = "2px solid black";
    canvas.style.position = "absolute";
    canvas.style.top = "96px";
    canvas.style.right = "16px";
    ctx = canvas.getContext("2d");

    var width,
        height,
//        radius1 = 20,　　　원래의 값
//        radius2 = 40,　　　원래의 값
        radius1 = 20,
        radius2 = 50,
        colorize = function(x,y,x2){
        if(x+x2>width)
            x=width-x2;
        if(x<0)
            x=0;
        if(y<0)
            y=0;
        if(y+x2>height)
            y=height-x2;
        var image = ctx.getImageData(x,y,x2,x2),
            imageData = image.data,
            length = imageData.length;
        for(var i=3; i < length; i+=4){

            var r = 0,
                g = 0,
                b = 0,
                tmp = 0,
                alpha = imageData[i];

            if(alpha<=255 && alpha >= 235){
                tmp=255-alpha;
                r=255-tmp;
                g=tmp*12;
            }else if(alpha<=234 && alpha >= 200){
                tmp=234-alpha;
                r=255-(tmp*8);
                g=255;
            }else if(alpha<= 199 && alpha >= 150){
                tmp=199-alpha;
                g=255;
                b=tmp*5;
            }else if(alpha<= 149 && alpha >= 100){
                tmp=149-alpha;
                g=255-(tmp*5);
                b=255;
            }else
                b=255;
            imageData[i-3]=r;
            imageData[i-2]=g;
            imageData[i-1]=b;
        }
        image.data = imageData;
        ctx.putImageData(image,x,y);
    }

//    var inner_width = window.innerWidth;

    for (var i = 0; i <= chapter_data.length; i++) {
        var x, y;

        clientX = chapter_data[i]['fields']['clientX'];
        clientY = chapter_data[i]['fields']['clientY'];

        width = chapter_data[i]['fields']['width'];
        height = chapter_data[i]['fields']['height'];

        var result_x = Xclient * clientX / 100;
        var result_y = Yclient * clientY / 100;

        var second_x = ((window.innerWidth - width) * ((clientX-25) / 100));
        var second_y = ((document.body.scrollHeight - height) * ((clientY) / 100));

        var clientResultX = result_x - second_x;
        var clientResultY = result_y;


//        console.log('clientResultY: ', clientResultY);

        layerX = chapter_data[i]['fields']['layerX'];
        layerY = chapter_data[i]['fields']['layerY'];
        offsetX = chapter_data[i]['fields']['offsetX'];
        offsetY = chapter_data[i]['fields']['offsetY'];
        clientX = chapter_data[i]['fields']['clientX'];
        clientY = chapter_data[i]['fields']['clientY'];
        if (clientX) { // Firefox
            x = clientResultX;
            y = clientResultY;
//            console.log('Firefox!!!!!!!!!!!!');
        } else if (offsetX) { // Opera
            x = offsetX;
            y = offsetY;
            console.log('Opera!!!!!!!!!!!!');
        }
        if(typeof(x)=='undefined')
            return;
        var r1 = radius1;
        var r2 = radius2;

        var rgr = ctx.createRadialGradient(x,y,r1,x,y,r2);
        rgr.addColorStop(0, 'rgba(0,0,0,0.01)');
        rgr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rgr;
        ctx.fillRect(x-r2,y-r2,2*r2,2*r2);
        colorize(x-r2,y-r2,2*r2);
    }
}

