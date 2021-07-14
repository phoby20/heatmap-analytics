console.log(chapter_data);
var masu_image = document.getElementById('masu_image');
console.log('masu_image : ', masu_image.height);
var total_count = chapter_data.length; // 클릭 총 갯수

//const client_width = window.innerWidth;
//const client_height = document.body.scrollHeight;
const client_width = masu_image.width-18;
const client_height = 1080 * client_width / 1920;
//const client_height = masu_image.height;
console.log(client_width, client_height);
var divided = 7; // 画面を横に何等分するかを決める

var masu_width = client_width / divided;　//한 칸의 가로 넒이를 구함
var height_devid_count = client_height / masu_width // 세로로는 몇 줄이 나오는지 구함
console.log('masu_width: ', masu_width);
console.log('height_devid_count: ', height_devid_count);

var alpha = 0.6;
var green = "rgba(0,155,0,"+ alpha +")";
var green = "rgba(0,155,0,"+ alpha +")";
var green = "rgba(0,155,0,"+ alpha +")";
var green = "rgba(0,155,0,"+ alpha +")";
var red = "rgba(155,0,0,"+ alpha +")";

function color_style (per, alpha) {
    if (0.1 < per && per <= 10) {
        var red = 0;
        var green = 0;
        var blue = 255;
    } else if (10 < per && per <= 20) {
        var red = 0;
        var green = 255;
        var blue = 255;
    } else if (20 < per && per <= 35) {
        var red = 0;
        var green = 255;
        var blue = 0;
    } else if (35 < per && per <= 40) {
        var red = 255;
        var green = 255;
        var blue = 0;
   } else if (40 < per && per <= 100) {
        var red = 255;
        var green = 0;
        var blue = 0;
    } else {
        var red = 0;
        var green = 0;
        var blue = 0;
        var alpha = 0.7;
    }

    var color = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    return color
}



var canvas = document.getElementById("masu");
canvas.style.position = "absolute";
//canvas.style.top = "0px";
canvas.style.right = "16px";
canvas.style.zIndex = "20";
canvas.width = client_width;
canvas.height = client_height;
canvas.style.border = "3px solid red";

var start_width = 0
var start_height = 0
for (var row_count = 0; row_count < height_devid_count; row_count++) {
    for (var i = 0; i < divided; i++) {
        var masu_result_width_center = (masu_width*i)+masu_width/2; //한 칸에 들어가는 문자를 가로정렬
        var masu_result_height_center = (masu_width*row_count)+masu_width/2; //한 칸에 들어가는 문자를 새로정렬

        var masu_width_per = masu_result_width_center / client_width * 100
        var masu_height_per = masu_result_height_center / client_height * 100
//        console.log(masu_width_per, masu_height_per);

        var sagaku_x = (masu_width_per - start_width) / 2; //끝의 넓이와 시작 넓이의 차익의 반
        var sagaku_y = (masu_height_per - start_height) / 2; //끝의 높이와 시작 높이의 차익의 반

        count = 0;
        for (var k = 0; k < chapter_data.length; k++) {
            var x = chapter_data[k]['fields']['pointX'] - sagaku_x; // x의 클릭 %를 구함 (단, 끝의 넓이와 시작 넓이의 차익을 빼야 함)
            var y = chapter_data[k]['fields']['pointY']; - sagaku_y;// y의 클릭 %를 구함 (단, 끝의 높이와 시작 높이의 차익을 빼야 함)
//            console.log(x, y);
            if (start_width < x && x < masu_width_per) {
                if (start_height < y && y < masu_height_per) {
//                    console.log(start_width + '<>' + masu_width_per);
//                    console.log('x: ', x);
                    count++;
                }
            }
        }
        start_width = masu_width_per;


//        console.log(start_width);
        var result = Math.round(count / total_count * 100);



        var context = canvas.getContext( "2d" ) ;
        // パスをリセット
        context.beginPath () ;
        // レクタングルの座標(50,50)とサイズ(75,50)を指定
        context.rect( masu_width*i, masu_width*row_count, masu_width, masu_width )
        // 塗りつぶしの色
        context.fillStyle = color_style(result, alpha);
        // 塗りつぶしを実行
        context.fill() ;
        // 線の色
        context.strokeStyle = "purple" ;
        // 線の太さ
        context.lineWidth = 3;
        // 線を描画を実行
        context.stroke() ;
        context.font = "40px serif";
        context.textAlign = "center";

        context.fillStyle = "white"; // 안에 들어가 글자 색깔을 다시 지정
        if (!result==0) {
            context.fillText(result+"%", masu_result_width_center, masu_result_height_center); //한 칸에 % 결과를 표시
        }

//        break;
    }
    start_height = masu_height_per;
//    break;
}