$(document).ready(function(){
  var objFullTextSearch;

  objFullTextSearch = new FullTextSearch();
  objFullTextSearch.init(data, document.location.search);
  objFullTextSearch.initElement('stat', 'navi', 'result');

  if (objFullTextSearch.keyword)
    objFullTextSearch.do_find(objFullTextSearch.keyword.join(" "));
});

