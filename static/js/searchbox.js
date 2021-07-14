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

  html += '<form id="sitesearch" name="sitesearch" action="' + prefix + 'search.html" method="get">';
  html += '<input type="text" name="keyword" value="" id="keyword" class="browser-default serch-input" placeholder="キーワード"/>';
  html += '<button type="submit" class="serch-button">検索</button>';
  html += '</form>';

  $('.serch-wrap').html(html);

});
