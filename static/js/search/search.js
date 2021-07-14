function FullTextSearch()
{
	var charset;
	var keyword;
	var lastquery;
	var param;
	var dataset;
	var st;
	var re;
	var nv;
	var max;
	var KC;
	var last;
	var result_prefix;
	var result_suffix;
	var result_prefix_glue;
	var result_suffix_glue;
	var param_name;
	var case_array;
	var zenhan;
	var refine;
	var caption;

	this.charset    = 'UTF-8';
	this.max        = 10;
	this.param_name = 'keyword'
	this.refine     = true;
	this.zenhan     = true;

	this.result_prefix = 70;
	this.result_suffix = 70;

	this.result_prefix_glue = Math.floor(this.result_prefix / 4);
	this.result_suffix_glue = Math.floor(this.result_suffix / 4);

	this.KC = {
		enter: 13,
		left : 37,
		right: 39
	};

	this.case_array = [
		'[AaＡａ]', '[BbＢｂ]', '[CcＣｃ]',
		'[DdＤｄ]', '[EeＥｅ]', '[FfＦｆ]',
		'[GgＧｇ]',	'[HhＨｈ]', '[IiＩｉ]',
		'[JjＪｊ]',	'[KkＫｋ]', '[LlＬｌ]',
		'[MmＭｍ]',	'[NnＮｎ]',	'[OoＯｏ]',
		'[PpＰｐ]',	'[QqＱｑ]', '[RrＲｒ]',
		'[SsＳｓ]',	'[TtＴｔ]', '[UuＵｕ]',
		'[VvＶｖ]',	'[WwＷｗ]', '[XxＸｘ]',
		'[YyＹｙ]',	'[ZzＺｚ]',
		'[0０]', '[1１]',
		'[2２]', '[3３]',
		'[4４]', '[5５]',
		'[6６]', '[7７]',
		'[8８]', '[9９]',
		'[\-ーｰ]', '[。｡]', '[、､]', '[｢「]', '[｣」]', '[%％]',
		'([がガ]|ｶﾞ)', '([ぎギ]|ｷﾞ)', '([ぐグ]|ｸﾞ)', '([げゲ]|ｹﾞ)',	'([ごゴ]|ｺﾞ)',
		'([ざザ]|ｻﾞ)', '([じジ]|ｼﾞ)', '([ずズ]|ｽﾞ)', '([ぜゼ]|ｾﾞ)',	'([ぞゾ]|ｿﾞ)',
		'([だダ]|ﾀﾞ)', '([ぢヂ]|ﾁﾞ)', '([づヅ]|ﾂﾞ)', '([でデ]|ﾃﾞ)',	'([どド]|ﾄﾞ)',
		'([ばバ]|ﾊﾞ)', '([びビ]|ﾋﾞ)', '([ぶブ]|ﾌﾞ)', '([べベ]|ﾍﾞ)',	'([ぼボ]|ﾎﾞ)',
		'([ぱパ]|ﾊﾟ)', '([ぴピ]|ﾋﾟ)', '([ぷプ]|ﾌﾟ)', '([ぺペ]|ﾍﾟ)',	'([ぽポ]|ﾎﾟ)',
		'[あアｱ]', '[いイｲ]', '[うウｳ]', '[えエｴ]', '[おオｵ]',
		'[かカｶ]', '[きキｷ]', '[くクｸ]', '[けケｹ]', '[こコｺ]',
		'[さサｻ]', '[しシｼ]', '[すスｽ]', '[せセｾ]', '[そソｿ]',
		'[たタﾀ]', '[ちチﾁ]', '[つツﾂ]', '[てテﾃ]', '[とトﾄ]',
		'[なナﾅ]', '[にニﾆ]', '[ぬヌﾇ]', '[ねネﾈ]', '[のノﾉ]',
		'[はハﾊ]', '[ひヒﾋ]', '[ふフﾌ]', '[へヘﾍ]', '[ほホﾎ]',
		'[まマﾏ]', '[みミﾐ]', '[むムﾑ]', '[めメﾒ]', '[もモﾓ]',
		'[やヤﾔ]', '[ゆユﾕ]', '[よヨﾖ]',
		'[らラﾗ]', '[りリﾘ]', '[るルﾙ]', '[れレﾚ]', '[ろロﾛ]',
		'[わワﾜ]', '[をヲｦ]', '[んンﾝ]',
		'[ぁァｧ]', '[ぃィｨ]', '[ぅゥｩ]', '[ぇェｪ]',	'[ぉォｫ]',
		'[っッｯ]', '[ゃャｬ]', '[ゅュｭ]', '[ょョｮ]', '[ゎヮﾜ]'
	];

	this.caption = {
		stat       : '{%TOTAL%}ページの中から、{%RESULT%}件のワードが見つかりました。',
		notfound   : '指定されたキーワードでは見つかりませんでした。',
		error      : '検索キーワードを指定してください。',
		navi_first : '←',
		navi_last  : '→',
		navi_prev  : '…',
		navi_next  : '…',
		result_pdf : ' (PDF)'
	};
}

FullTextSearch.prototype = {
	init : function (fullTextData, keyword)
	{
		this.dataset = fullTextData;
		this.param   = keyword;
		this.keyword = this.getParam(this.param);
	}
	,
	initElement : function (stat, navi, result)
	{
		this.st = this.getElement(stat);
		this.re = this.getElement(result);
		this.nv = this.getElement(navi);
	}
	,
	getParam : function (s)
	{
		if (!s) return null;
		s = s.replace(/\+/g, " ");
		var rg = new RegExp('[\?&]' + this.param_name + '\=([^&]*)');
		if (s.match(rg)) s = RegExp.$1;

		switch (this.charset) {
		case 'UTF-8':
			s = UnescapeUTF8(s);
			break;
		case 'SJIS':
			s = UnescapeSJIS(s);
			break;
		case 'EUC':
			s = UnescapeEUCJP(s);
			break;
		}

		return this.splitKeyword(s);
	}
	,
	splitKeyword : function (s)
	{
		s = s.replace(/　/g, " ");
		s = s.replace(/\s+/g, " ");

		s = s.split(" ");
		return s;
	}
	,
	getQueryParamValue : function (name, charset)
	{
		var s = document.location.search;

		if (!s) return '';

		if (!charset) charset = '';

		s = s.replace(/\+/g, " ");
		var rg = new RegExp('[\?&]' + name + '\=([^&]*)');
		if (s.match(rg)) {
			s = RegExp.$1;
		} else {
			return '';
		}

		switch (charset.toUpperCase()) {
		case 'UTF-8':
		case 'UTF8':
			s = UnescapeUTF8(s);
			break;
		case 'SJIS':
			s = UnescapeSJIS(s);
			break;
		case 'EUC':
			s = UnescapeEUCJP(s);
			break;
		}

		return s;
	}
	,
	getElement : function (idx)
	{
		return document.getElementById(idx);
	}
	,
	reg_escape : function (s)
	{
		return s.replace(/[\.\,\[\]\?\*\/\{\}\+\^\(\)\|\:\$\\]/g,
			function () {
				var a = arguments;
				a[0] = '\\' + a[0];
				return a[0];
			}
		);
	}
	,
	reg_optimize : function (q)
	{
		var _q  = [];
		for (var i = 0; i < q.length; i++) {
			q[i] = this.reg_escape(q[i]);
		}

		if (this.refine) {
			for (var i = 0; i < q.length; i++) {
				if (q[i] == '') continue;
				var r = new RegExp(q[i]);
				var f = 0;
				for (var j = 0; j < q.length; j++) {
					if (j == i) continue;
					if (q[j].match(r)) {
						if (q[j] == q[i]) {
							q[j] = '';
						} else {
							f = 1;
							break;
						}
					}
				}
				if (f == 0) _q.push(q[i]);
			}
		} else {
			for (var i = 0; i < q.length; i++) {
				if (q[i] == '') continue;
				var r = new RegExp(q[i]);
				var f = 0;
				for (var j = 0; j < q.length; j++) {
					if (j == i) continue;
					if (q[j] == q[i]) {
						q[j] = '';
					}
				}
				if (f == 0) _q.push(q[i]);
			}
		}

		return _q;
	}
	,
	ignore_ULHZ : function (aimai)
	{
		var str = '';
		for (var i = 0, len_i = aimai.length; i < len_i; i++) {
			var c     = aimai.substr(i, 1);
			var cnext = aimai.substr(i + 1, 1);
			var cc    = (cnext == 'ﾞ' || cnext == 'ﾟ' ? c + cnext : null);
			for (var j = 0, len_j = this.case_array.length; j < len_j; j++) {
				var reg = new RegExp(this.case_array[j]);
				if (cc && cc.match(reg)) {
					c = this.case_array[j];
					i++;
					break;
				} else if (c.match(reg)) {
					c = this.case_array[j];
					break;
				}
			}
			str += c;
		}
		return str;
	}
	,
	ignore_case : function ()
	{
		var a = arguments;
		return "[" + a[0].toLowerCase() + a[0].toUpperCase() + "]";
	}
	,
	ignore_number : function (aimai)
	{
		var str = '';
		for (var i = 0; i < aimai.length; i++) {
			var c = aimai.substr(i, 1);
			switch (c) {
			case '0' : str += "[0０]"; break;
			case '1' : str += "[1１]"; break;
			case '2' : str += "[2２]"; break;
			case '3' : str += "[3３]"; break;
			case '4' : str += "[4４]"; break;
			case '5' : str += "[5５]"; break;
			case '6' : str += "[6６]"; break;
			case '7' : str += "[7７]"; break;
			case '8' : str += "[8８]"; break;
			case '9' : str += "[9９]"; break;
			case '０': str += "[0０]"; break;
			case '１': str += "[1１]"; break;
			case '２': str += "[2２]"; break;
			case '３': str += "[3３]"; break;
			case '４': str += "[4４]"; break;
			case '５': str += "[5５]"; break;
			case '６': str += "[6６]"; break;
			case '７': str += "[7７]"; break;
			case '８': str += "[8８]"; break;
			case '９': str += "[9９]"; break;
			default: str += c;
			}
		}
		return str;
	}
	,
	reset_result : function ()
	{
		this.st.innerHTML = '';
		this.re.innerHTML = '検索中・・・';
		this.nv.innerHTML = '';
	}
	,
	do_find : function (v)
	{
		if (this.lastquery == v) return;

		this.lastquery = v;

		var re = this.find(v);

		this.set_st(re);

		if (re.length) {
			this.pagenavi(re);
			this.view(re);
		} else {
			this.pagenavi(re);
			this.view(re);
		}
	}
	,
	find : function (v)
	{
		if (!v) return [];

		var query = this.splitKeyword(v);
		var reg    = [];
		var reg_g  = [];
		var reg_s  = [];
		var result = [];
		var aimai;
		var aimai_array = [];

		if (query) {
			query = this.reg_optimize(query);
			for (var i = 0; i < query.length; i++) {
				if (query[i] == '') continue;
				if (this.zenhan) {
					aimai = this.ignore_ULHZ(query[i]);
				} else {
					aimai = query[i].replace(/[a-zA-Z]/g, this.ignore_case);
					aimai = this.ignore_number(aimai);
				}
				aimai_array.push(aimai);
				try {
					var qr   = new RegExp(aimai);
					var qr_g = new RegExp(aimai, 'g');
					reg.push(qr);
					reg_g.push(qr_g);
				} catch (e) {
					reg.push(/(.)/);
				}
			}
		} else {
			reg.push(/(.)/);
		}

		if (aimai_array.length > 1) {
			for (var i = 0, aimai_length = aimai_array.length; i < aimai_length; i++) {
				var tmp = [aimai_array[i]];
				for (var j = 0; j < aimai_length; j++) {
					if (i == j) continue;
					tmp.push(aimai_array[j]);
					reg_s[reg_s.length] = {
						reg   : new RegExp(tmp.join('')),
						reg_g : new RegExp(tmp.join(''), 'g'),
						len   : tmp.length,
						point : 10
					};
				}
			}
		}

		var d_key = ['title', 'body', 'date_ad', 'date_jp'];
		var d_pnt = [20,       1,      3,        3        ];
		var d_pnt_pdf = 5;

		for (var i = 0, d_len = this.dataset.length; i < d_len; i++) {
			var r, rg;
			var d_length = 0;
			var rg_len = 0;
			var rg_pos = null;
			var rg_per = 0;
			var rg_cnt = 0;
			var rg_pnt = 0;
			var res = [];
			var idx_len_title = [];
			var idx_len_body  = [];

			if (reg_s.length > 0) {
				for (var j = 0; j < d_key.length; j++) {
					for (var k = 0; k < reg_s.length; k++) {
						r = this.dataset[i][d_key[j]].match(reg_s[k].reg);
						if (r && r.index != -1) {
							rg = this.dataset[i][d_key[j]].match(reg_s[k].reg_g);
							rg_pnt += (rg.length + reg_s[k].len) * reg_s[k].point;
							res.push([r, d_key[j]]);
						}
					}
				}
			}

			for (var j = 0; j < reg.length; j++) {
				var chk = false;

				for (var k = 0; k < d_key.length; k++) {
					d_length += this.dataset[i][d_key[k]].length;
					r = this.dataset[i][d_key[k]].match(reg[j]);
					if (r && r.index != -1) {
						rg = this.dataset[i][d_key[k]].match(reg_g[j]);
						rg_len += rg.length;
						rg_cnt += rg.length * r[0].length;
						if (rg_pos == null || rg_pos > r.index) rg_pos = r.index;
						rg_pnt += d_pnt[k] * rg.length;
						if (this.dataset[i].type == 'pdf') rg_pnt += d_pnt_pdf;
						res.push([r, d_key[k]]);
						chk = true;
					}
				}
				if (this.refine && !chk) {
					res = [];
					break;
				}
			}

			if (!res || res.length == 0) continue;
			rg_per = Math.round(rg_cnt / (d_length) * 100000) / 1000;

			for (var j = 0; j < res.length; j++) {
				if (res[j][1] == 'title') {
					idx_len_title[idx_len_title.length] = [res[j][0].index, res[j][0][0].length];
				} else if (res[j][1] == 'body') {
					idx_len_body[idx_len_body.length]   = [res[j][0].index, res[j][0][0].length];
				}
			}
			result[result.length] = [i, idx_len_title, idx_len_body, rg_len, rg_pos, rg_per, rg_pnt];
		}

		for (var i = 0, result_length = result.length; i < result_length; i++) {
			for (var j = i + 1; j < result_length; j++) {
				if (result[i][6] > result[j][6]) {
					var temp   = result[j];
					result[j] = result[i];
					result[i] = temp;
				}
			}
		}
		for (var i = 0, result_length = result.length; i < result_length; i++) {
			for (var j = i + 1; j < result_length; j++) {
				if (result[i][5] > result[j][5] && result[i][6] == result[j][6]) {
					var temp   = result[j];
					result[j] = result[i];
					result[i] = temp;
				}
			}
		}
		return result;
	}
	,
	set_st : function (result)
	{
		var str = this.caption.stat;

		str = str.replace('{%TOTAL%}' , this.dataset.length);
		str = str.replace('{%RESULT%}', result.length);
		this.st.innerHTML = str;
	}
	,
	view : function (result, offset)
	{
		if (!offset) offset = 1;
		if (!result) {
			result = this.last.reverse();
		} else {
			this.last = result;
		}

		if (result.length == 0) {
			if (this.lastquery != '') {
				this.re.innerHTML = this.caption.notfound;;
			} else {
				this.re.innerHTML = this.caption.error;
			}
			return;
		}

		var r     = result.reverse();
		var count = 0;

		this.re.innerHTML = "";

		for (var i = (offset - 1) * this.max, r_len = r.length; i < r_len; i++) {
			var buf   = "<dl>";
			count++;
			if (count > this.max) break;

			var num           = r[i][0];
			var idx_len_title = r[i][1];
			var idx_len_body  = r[i][2];
			var rg_length     = r[i][3];
			var rg_pos        = r[i][4];
			var rg_per        = r[i][5];
			var rg_pnt        = r[i][6];
			var d             = this.dataset[num];

			buf += (d.type == 'pdf') ? '<dt class="pdf">' : '<dt>';
			var href = d.frame  + d.file;
			buf += '<a href="javascript:void(0);" onclick="location.href=\'' + href + '\';return false;">';
			if (idx_len_title.length > 0) {
				buf += this.snippet(d.title, idx_len_title);
			} else {
				buf += (d.title || "");
			}
			buf += "</a>";
			if (d.type == 'pdf') {
				buf += this.caption.result_pdf;
			}

			buf += "</dt><dd>";

			if (d.date_ad != '') {
				buf += d.date_ad + " (";
				buf += d.date_jp + ")<br />";
			}

			if (idx_len_body.length > 0) {
				buf += this.snippet(d.body, idx_len_body);
			} else {
				buf += d.body.substr(0, this.result_prefix + this.result_suffix);
			}
			buf += "</dd>";
			buf += '</dl>';
			this.re.innerHTML += buf;
		}
	}
	,
	snippet : function (body, idx_len)
	{
		for (var i = 0, idx_length = idx_len.length; i < idx_length; i++) {
			for (var j = i + 1; j < idx_length; j++) {
				if (idx_len[i][0] > idx_len[j][0]) {
					var temp   = idx_len[j];
					idx_len[j] = idx_len[i];
					idx_len[i] = temp;
				}
			}
		}

		if (idx_len.length == 1) {
			var idx   = idx_len[0][0];
			var len   = idx_len[0][1];
			var start = idx_len[0][0] - this.result_prefix;
			return [
				body.substring(start, idx),
				"<strong>",
				body.substr(idx, len),
				"</strong>",
				body.substr(idx + len, this.result_suffix)
			].join("");
		} else {
			var start  = idx_len[0][0] - this.result_prefix;
			var result = [body.substring(start, idx_len[0][0])];
			var skip   = false;
			for (var i = 0, idx_length = idx_len.length; i < idx_length; i++) {
				var idx = idx_len[i][0];
				var len = idx_len[i][1];

				if (!skip) {
					result.push("<strong>");
					result.push(body.substr(idx, len))
					result.push("</strong>");
				} else {
					skip = false;
				}
				if (idx_len[i + 1]) {
					var idx_next = idx_len[i + 1][0];
					var len_next = idx_len[i + 1][1];
					if (idx_next - (idx + len) >= this.result_prefix) {
						result.push(body.substr(idx + len, this.result_suffix_glue));
						result.push('.....');
						start = idx_next - this.result_prefix_glue;
						result.push(body.substring(start, idx_next));
					} else if(idx + len >= idx_next + len_next) {
						skip = true;
						if (!idx_len[i + 1]) {
							result.push(body.substr(idx + len, this.result_suffix));
						} else {
							idx_len[i + 1][0] = idx_len[i][0];
							idx_len[i + 1][1] = idx_len[i][1];
						}
					} else if((idx + len) > idx_next) {
						result.pop();
						start = idx + len;
						result.push(body.substring(start, idx_next + len_next));
						result.push("</strong>");
						skip = true;
						if (!idx_len[i + 1]) result.push(body.substr(idx_next + len_next, this.result_suffix));
					} else {
						start = idx + len;
						result.push(body.substring(start, idx_next));
					}
				} else {
					result.push(body.substr(idx + len, this.result_suffix));
				}
			}
			return result.join("");
		}
	}
	,
	pagenavi : function (result)
	{
		var len = result.length;
		var ct  = Math.ceil(len / this.max);
		var buf = [];

		var max_index = 20;

		var obj = this;

		this.nv.innerHTML = '';
		if (ct > max_index) {
			var span = document.createElement('span');
			var text = document.createTextNode(this.caption.navi_first);
			span.setAttribute('index', 1);
			span.onclick = function ()
			{
				var index = Number(this.getAttribute('index'));
				obj.view(null, index);
				obj.sw(index);
				obj.change_group(1);
			};
			span.appendChild(text);
			this.nv.appendChild(span);
		}

		for (var i = 1, group = 1; i <= ct; i++) {
			var span = document.createElement('span');
			var text = document.createTextNode(i);
			span.setAttribute('index', i);
			span.setAttribute('group', group);
			span.onclick = function ()
			{
				var index = Number(this.getAttribute('index'));
				obj.view(null, index);
				obj.sw(index);
			};
			if (group > 1) span.style.display = 'none';
			span.appendChild(text);
			this.nv.appendChild(span);

			if (i < ct && i % max_index == 0) {
				var span = document.createElement('span');
				var text = document.createTextNode(this.caption.navi_next);
				span.setAttribute('index', i + 1);
				span.setAttribute('group', group);
				span.onclick = function ()
				{
					var index = Number(this.getAttribute('index'));
					var g     = Number(this.getAttribute('group'));
					obj.view(null, index);
					obj.sw(index);
					obj.change_group(g + 1);
				};
				if (group > 1) span.style.display = 'none';
				span.appendChild(text);
				this.nv.appendChild(span);

				group++;
				var span = document.createElement('span');
				var text = document.createTextNode(this.caption.navi_prev);
				span.setAttribute('index', i);
				span.setAttribute('group', group);
				span.onclick = function ()
				{
					var index = Number(this.getAttribute('index'));
					var g     = Number(this.getAttribute('group'));
					obj.view(null, index);
					obj.sw(index);
					obj.change_group(g - 1);
				};
				span.style.display = 'none';
				span.appendChild(text);
				this.nv.appendChild(span);
			}

		}
		if (ct > max_index) {
			var span = document.createElement('span');
			var text = document.createTextNode(this.caption.navi_last);
			span.setAttribute('index', ct);
			span.onclick = function ()
			{
				var index = Number(this.getAttribute('index'));
				obj.view(null, index);
				obj.sw(index);
				obj.change_group(group);
			};
			span.appendChild(text);
			this.nv.appendChild(span);
		}

		this.sw(1);
	}
	,
	change_group : function (g)
	{
		var span = this.nv.getElementsByTagName("span");
		for (var i = 0; i < span.length; i++) {
			if (!span[i].getAttribute('group') || span[i].getAttribute('group') == '') continue;
			if (String(span[i].getAttribute('group')) == String(g)) {
				span[i].style.display = 'inline';
			} else {
				span[i].style.display = 'none';
			}
		}
	}
	,
	sw : function (t)
	{
		var span = this.nv.getElementsByTagName("span");
		for (var i = 0; i < span.length; i++) {
			span[i].className = ( String(span[i].getAttribute('index')) == String(t) ? "selected" : "");
		}
	}
	,
	key : function (c)
	{
		switch (c) {
		case this.KC.enter: this.mv(1); break;
		case this.KC.left : this.mv(-1);break;
		case this.KC.right: this.mv(1); break;
		}
	}
	,
	mv : function (to)
	{
		var span = this.nv.getElementsByTagName("span");
		var current;
		if (!span.length) return;

		for (var i = 0; i < span.length; i++) {
			if (span[i].className == "selected") {
				current = i;
				break;
			}
		}
		var moveto = current + to;
		if (moveto < 0) return;
		if (moveto > span.length - 1) moveto = 0;
		this.sw(moveto);
		this.view("", moveto + 1);
	}
};

