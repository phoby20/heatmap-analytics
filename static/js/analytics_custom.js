//console.log(Object.keys(list_dic).length);
//console.log(list_dic);
//
//var dict_len = Object.keys(list_dic).length;
//const tableBody = document.getElementById('tableBody');
//
//buf = '';
//cnt = 1
//for (var key in list_dic) {
////    console.log(list_dic[key][1]);
//
//    buf += '<tr>';
//
//    buf += '<td>';
//    buf += cnt;
//    buf += '</td>';
//
//    buf += '<td>';
//    buf += key;
//    buf += '</td>';
//
//    // click count표시
//    buf += '<td>';
//    buf += list_dic[key][0];
//    buf += '</td>';
//
////    熟読分析
//    buf += '<td>';
//    buf += "<a href='analytics/carefully_read";
////    console.log(list_dic[key][1]);
//    buf += list_dic[key][1].slice( -37 );
////    buf += "list_dic[key][1]";
////    if (list_dic[key][1] == '') {
////        buf += "index";
////    } else {
////        buf += list_dic[key][1];
////    }
//    buf += "'>";
//    buf += "<i class='icmn-gradient' aria-hidden='true'></i>";
//    buf += '</a>';
//    buf += '</td>';
//
////    エリア閲覧率
//    buf += '<td>';
//    buf += "<a href='analytics/masu_heatmap";
////    if (list_dic[key][1] == '') {
////        buf += "index";
////    } else {
////        buf += list_dic[key][1];
////    }
//    buf += "'>";
//    buf += "<i class='icmn-grid6' aria-hidden='true'></i>";
//    buf += '</a>';
//    buf += '</td>';
//
//
////    エリア閲覧率
//    buf += '<td>';
//    buf += "<a href='analytics/allclickmap";
////    if (list_dic[key][1] == '') {
////        buf += "index";
////    } else {
////        buf += list_dic[key][1];
////    }
//    buf += "'>";
//    buf += "<i class='icmn-grid5' aria-hidden='true'></i>";
//    buf += '</a>';
//    buf += '</td>';
//
//
////    削除ボタン
//    buf += '<td>';
//    buf += "<a href='analytics/delete";
//    buf += "'>";
//    buf += "<i class='icmn-eraser' aria-hidden='true'></i>";
//    buf += '</a>';
//    buf += '</td>';
//
//    buf += '</tr>';
//    tableBody.innerHTML = buf;
//    cnt += 1
//}