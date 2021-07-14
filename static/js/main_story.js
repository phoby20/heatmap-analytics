var dict = Object.keys(list_data);

const lnav_list = document.getElementById('lnav-list');
buf = '';
id_list = []

// 왼쪽의 메뉴 를 표시
for(var i = 0; i < dict.length; i++) {
    id = json_object[i]['pk']

    buf += "<li class='item'>";
    if (i == 0) {
        buf += "<a class='in' id='";
        buf += "title_id" + i;
        buf += "' ";
        buf += "href='";
        buf += id;
        buf += "'>第";
        buf += i+1 + "章　" + dict[i];
        buf += "</a>";
    } else {
        buf += "<a class='in' id='";
        buf += "title_id" + i;
        buf += "' ";
        buf += "href='";
        buf += id;
        buf += "'>第";
        buf += i+1 + "章　" + dict[i];
        buf += "</a>";
    }



    buf += "<ul class='inner-list'>";
//    console.log(list_data[dict[i]]);
    for (var k = 0; k < list_data[dict[i]].length; k++) {
        var key = Object.keys(list_data[dict[i]][k])[0];
        var value = Object.values(list_data[dict[i]][k])[0];
        id_list.push(value)

        buf += "<li class='item'>";
        if (i == 0 && k == 0) {
            buf += "<a class='in link selected' ";
            buf += "href='";
            buf += value;
            buf += "' id='";
            buf += value;
            buf += "'>";
            buf += k+1+ ". " + key;
            buf += "</a>";
            buf += "<li>";
        } else {
            buf += "<a class='in link'";
            buf += "href='";
            buf += value;
            buf += "' id='";
            buf += value;
            buf += "'>";
            buf += k+1+ ". " + key;
            buf += "</a>";
            buf += "<li>";
        }
    }
    buf += "</ul>";
    buf += "</li>";
    lnav_list.innerHTML = buf;
}

// 클릭 된 리스트만 selected 클레스를 붙이기
var targetElements = document.getElementsByClassName('selected');
[].forEach.call(targetElements, function(elem) {
    elem.classList.remove('selected');
})

var urlParam = window.location.pathname;
var id = urlParam.slice(-36);


for (var i = 0; i < id_list.length; i++) {
    // url에있는 ID가 id_list리스트에 있는지 확인하고 있다면 같은 그룹안에 있는 또 다른 a태그들의 ID를 ID리스트에서 삭제
    if (id_list[i] === id) {
        var targetElem = document.getElementById(id);
        parrentElem = targetElem.parentNode.parentNode;
        childElem = parrentElem.childNodes
        naiyou_len = parrentElem.childNodes.length

        // 선택된 항목과 같은 그룹안에 있는 a태그를 추출
        for (var k = 0; k < naiyou_len; k++) {
            if (k % 2 === 0 || k === 0) {
                selectGroup = childElem[k].childNodes[0];
//                selectGroup.style.display = 'blank';
                // 선택된 항목과 같은 그룹안에 있는 ID는 ID리스트에서 삭제한다
                for (var g = 0; g < id_list.length; g++) {
                    if (selectGroup.id === id_list[g]) {
                        id_list.splice(g, 1);
                    }
                }
            }
        }

        // 선택된 항목에 클래스 붙이기
        targetElem.classList.add('selected');

        // 선택된 항목의 어미 오브젝트에 클레스 붙이기
        targetParent_id = childElem[0].parentNode.previousSibling.id;
        targetParentElem = document.getElementById(targetParent_id)
        targetParentElem.classList.add('unlink');
    }
}

// 위에서 삭제 처리 된 ID리스트에 있는 객체들은 비표시 처리
for (var t = 0; t < id_list.length; t++) {
    var nonDisplayElem = document.getElementById(id_list[t]).parentNode;
    nonDisplayElem.style.display = 'none';
}