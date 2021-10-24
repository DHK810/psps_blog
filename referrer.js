var ref = document.referrer;
var url = new URL(ref);
var hostname = url.hostname;

var whereData = {
  nexearch : '통합검색',
  view:'VIEW',
  image: '이미지',
  kin:'지식인'
}
if (hostname == 'search.naver.com' || hostname == 'm.search.naver.com'){
  var query = url.searchParams.get('query');
  var where = url.searchParams.get('where');
  var where_result = whereData[where];
}
