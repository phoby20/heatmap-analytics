/*************************************/
/* 処理 */
/*************************************/
$(function(){

  var prefix = '';
  var html = '';

  // var $dirs = location.href.split("/");

  // var $dir2 = $dirs[$dirs.length -3];// 2階層目
  // var $dir3 = $dirs[$dirs.length -4];// 3階層目
  // var $dir4 = $dirs[$dirs.length -5];// 4階層目

  // if($dir2 === 'sb-demo'){
  //   prefix = '../';
  // }else if($dir3 === 'sb-demo'){
  //   prefix = '../../';
  // }else if($dir4 === 'sb-demo'){
  //   prefix = '../../../';
  // }

  html += '<nav class="gnav">';
  html += '<ul class="gnav-list pc-inner">';
  html += '<li class="item">';
  html += '<a class="in link has-sub-item" href="' + prefix + 'javascript:void(0);">沿革編<br class="is-tablet"><span class="sub-text">History</span></a>';
  html += '<div class="in sub-item toggle-list-button"><i class="material-icons">keyboard_arrow_down</i></div>';
  html += '<ul class="inner-list toggled-list">';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);" target="_blank">ＰＤＦ版</a></li>';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);" target="_blank">電子ブック版</a></li>';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">ＨＴＭＬ版</a></li>';
  html += '</ul>';
  html += '</li>';
  html += '<li class="item">';
  html += '<a class="in link has-sub-item" href="' + prefix + 'javascript:void(0);">資料<br class="is-tablet"><span class="sub-text">Data</span></a>';
  html += '<div class="in sub-item  toggle-list-button"><i class="material-icons">keyboard_arrow_down</i></div>';
  html += '<ul class="inner-list toggled-list">';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">経営数値</a></li>';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">年表1</a></li>';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">年表2</a></li>';
  html += '</ul>';
  html += '</li>';
  html += '<li class="item">';
  html += '<a class="in link has-sub-item" href="' + prefix + 'javascript:void(0);">インタビュー<br class="is-tablet"><span class="sub-text">Interview</span></a>';
  html += '<div class="in sub-item  toggle-list-button"><i class="material-icons">keyboard_arrow_down</i></div>';
  html += '<ul class="inner-list toggled-list">';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">インタビュー（文章）</a></li>';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">インタビュー（動画）</a></li>';
  html += '</ul>';
  html += '</li>';
  html += '<li class="item">';
  html += '<a class="in link has-sub-item" href="' + prefix + 'javascript:void(0);">ギャラリー<br class="is-tablet"><span class="sub-text">Gallery</span></a>';
  html += '<div class="in sub-item  toggle-list-button"><i class="material-icons">keyboard_arrow_down</i></div>';
  html += '<ul class="inner-list toggled-list">';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">写真集</a></li>';
  html += '<li class="item"><a class="in link" href="' + prefix + 'javascript:void(0);">動画ギャラリー</a></li>';
  html += '</ul>';
  html += '</li>';
  html += '<li class="item">';
  html += '<a class="in link" href="' + prefix + 'javascript:void(0);">ムービー<br class="is-tablet"><span class="sub-text">Movie</span></a>';
  html += '</li>';
  html += '</ul>';
  html += '</nav>';

  $('.gnav-wrap').html(html);

});
