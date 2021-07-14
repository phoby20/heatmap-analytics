/*************************************/
/* ページ上部へリンクの設定 */
/*************************************/
$(function(){
  // 滑らかな移動
  $('a.page-top').click(function() {
    // スクロールの速度
    var speed = 400; // ミリ秒で記述
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
  // フェードイン・フェードアウト
  var pagetop = $('.page-top');
  $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
          pagetop.fadeIn();
      } else {
          pagetop.fadeOut();
      }
  });
});

/*************************************/
/* 検索ボックスの開閉（SP表示時） */
/*************************************/
$(function(){
  // クリック時
  $('.header .btn-serch').click(function() {
    $('.header .serch-wrap').slideToggle('fast');
    $(this).toggleClass('btn-serch-close');
  });

});

/*************************************/
/* グローバルメニューの開閉（SP表示時） */
/*************************************/
$(function(){
  // クリック時
  $('.header .btn-global').click(function() {
    $('.header .gnav-wrap').slideToggle(300);
    $(this).toggleClass('btn-global-close');
  });

});

/*************************************/
/* グローバルメニューのサブ項目のアコーディオン切り替え */
/*************************************/
$(function(){

  // .toggle-list-buttonがクリックされたら
  $('.toggle-list-button').click(function(){
    // クリックされた要素に隣接する.inner-listが開閉する。
    $(this).next('.toggled-list').slideToggle('fast');
  });

  // スライド式の開閉は不可！（FirefoxとEdgeで、is(‘:hover’）が効かないため。）

  // .has-sub-itemがマウスオーバーされたら
  $('.has-sub-item').hover(function(){
    // PC時
    if($(window).width() >= 768) {
      // クリックされた要素に隣接する.inner-listが開く。
      $(this).nextAll('.toggled-list').css('display', 'block');
    }
  }, function(){
    // PC時
    if($(window).width() >= 768) {
      // クリックされた要素に隣接する.inner-listが閉じる。
      $(this).nextAll('.toggled-list').css('display', 'none');
    }

  });

  //.toggled-listがマウスオーバーされたら
  $('.toggled-list').hover(function(){
    // 開く。
    $(this).css('display', 'block');
  }, function(){
    // 閉じる。
    $(this).css('display', 'none');
  });

});

/*************************************/
/* 処理 */
/*************************************/
$(function(){

  // $('.cbox-movie').colorbox({
  //   maxWidth:"80%",
  //   maxHeight:"80%",
  //   opacity: 0.7
  // });

  $('.cbox-photo').colorbox({
    // iframe:true,
    rel:'slideshow',
    slideshow:true,
    maxWidth:"80%",
    maxHeight:"80%",
    slideshowSpeed:4000,
    opacity: 0.7
  });

});
