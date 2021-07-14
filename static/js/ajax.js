//出典：https://coliss.com/articles/build-websites/operation/javascript/js-real-time-heatmap-used-canvas.html

var clientX = [];
var clientY = [];
var windowWidth = [];
var windowHeight = [];
var data_array = [];


const result = document.getElementById("result");
const body = document.getElementById("body");

function clickEvent(event) {
    pointX = event.clientX / window.innerWidth * 100;
    pointY = event.pageY / document.body.scrollHeight * 100;

    title = document.title; // title
    scrollHeight = document.body.scrollHeight; // 전체 스크롤바 위치
    scrollLocation = window.scrollY; // 현재 스크롤바 위치

    userAgent = window.navigator.userAgent.toLowerCase(); // 접속 프라우져 판정
//    if(userAgent.indexOf('msie') != -1 ||
//        userAgent.indexOf('trident') != -1) {
//        console.log('Internet Explorer');
//    } else if(userAgent.indexOf('edge') != -1) {
//        console.log('Edge');
//    } else if(userAgent.indexOf('chrome') != -1) {
//        console.log('Google Chrome');
//    } else if(userAgent.indexOf('safari') != -1) {
//        console.log('Safari');
//    } else if(userAgent.indexOf('firefox') != -1) {
//        console.log('FireFox');
//    } else if(userAgent.indexOf('opera') != -1) {
//        console.log('Opera');
//    } else {
//        console.log('その他');
//    }
//    console.log('window.innerWidth : ', window.innerWidth);

    var json = {
        "pointX": pointX,
        "pointY": pointY,
        "width": window.innerWidth,
        "height": scrollHeight,
        "scrollY": scrollLocation,
        "percentY": scrollLocation / scrollHeight * 100,
        "agent": userAgent,
        "path": window.location.pathname,
        "title": title,
        };
    var obj = JSON.stringify(json);
//    console.log(obj);
    return obj
}

var clickClass = document.getElementsByClassName("click_event");
body.addEventListener('click', function(event) {
    obj = clickEvent(event)
});
//body.addEventListener('mousemove', function(event) {
//    obj = clickEvent(event)
//});


// 여기서 부터는 마우스의 움직임을 체크
var heatmapApp = (function(){
    var invoke = false,
        mouseMoveHandler = function(ev){
//        console.log("ev['view'] : ", ev);
        var clientX = ev['clientX'] / window.innerWidth * 100;
        var clientY = ev['pageY'] / document.body.scrollHeight * 100;
        var width = ev['view']['innerWidth']
        var height = ev['view']['innerHeight']
        if (ev['view']['scrollHeight']) {
            var height = ev['view']['scrollHeight']
        }
//        console.log("ev['view'] : ", ev['view']);
        var heatmap_obj = {
        "clientX": clientX,
        "clientY": clientY,
        "width": width,
        "height": height,

        "path": window.location.pathname,

        "fromElement": ev['fromElement'],
        "layerX": ev['layerX'],
        "layerY": ev['layerY'],
        "offsetX": ev['offsetX'],
        "offsetY": ev['offsetY'],
        };
//        setTimeout(function() {
//          console.log('Works!');
//          data_array.push(heatmap_obj)
//        }, 13000);

         data_array.push(heatmap_obj)

        return data_array
        },
        activate = function(){
            invoke = !invoke;
        };

    return {
        initialize: function(body, wt, ht){
            body = document.getElementById(body);

            // 캔버스 옵션을 이용해서 마우스 무브 이벤트를 작성
            body["onmousemove"] =  function(ev){
                mouseMoveHandler(ev);
            };

        },
    };
})();

window["onload"]=function(){
    heatmapApp.initialize("body");
}


//$.ajax({ // .like 버튼을 클릭하면 <새로고침> 없이 ajax로 서버와 통신하겠다.
//      type: "POST", // 데이터를 전송하는 방법을 지정
//      url: "{% url 'index:post_input' %}", // 통신할 url을 지정
//      data: {'obj': obj, 'csrfmiddlewaretoken': '{% csrf_token %}'}, // 서버로 데이터 전송시 옵션
//      dataType: "json", // 서버측에서 전송한 데이터를 어떤 형식의 데이터로서 해석할 것인가를 지정, 없으면 알아서 판단
//      // 서버측에서 전송한 Response 데이터 형식 (json)
//      // {'likes_count': post.like_count, 'message': message }
//      success: function(response){ // 통신 성공시 - 동적으로 좋아요 갯수 변경, 유저 목록 변경
//        alert(response.message);
//    //    $("#count-"+pk).html(response.like_count+"개");
//    //    var users = $("#like-user-"+pk).text();
//    //    if(users.indexOf(response.nickname) != -1){
//    //      $("#like-user-"+pk).text(users.replace(response.nickname, ""));
//    //    }else{
//    //      $("#like-user-"+pk).text(response.nickname+users);
//    //    }
//      },
//      error: function(request, status, error){ // 통신 실패시 - 로그인 페이지 리다이렉트
//        alert("로그인이 필요합니다.",request, status, error)
//    //    window.location.replace("/accounts/login/")
//        //  alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
//      },
//    });