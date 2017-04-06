var oUl = document.getElementById('oUl');
var oIn = document.getElementsByTagName('input')[0];
var oLis = document.getElementsByTagName('li');

var size = 20;
var open = [];
var close = [];
var k = 0;
var newLi;
var flag = false;

var map = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
var cols = Math.sqrt(map.length);
init();
function init() {
	createMap();
	oIn.onclick = function() {
		openFn();
	}
}


function createMap() {
	oUl.style.width = cols * (size + 1) +'px';
	
	for(var i = 0; i < map.length; i++) {
		var oli = document.createElement('li');
		oli.style.width = size + 'px';
		oli.style.height = size + 'px';

		oUl.appendChild(oli);

		if(map[i] == 1) {
			oli.className = 'star';
			open.push(oli);
		}else if(map[i] == 2) {
			oli.className = 'end';
		}else if (map[i] == 3) {
			oli.className = 'obst';
			close.push(oli);
		}
	}
}


var starLi = document.getElementsByClassName('star');
var endLi = document.getElementsByClassName('end');

function f(nodeLi) {
	return g(nodeLi) + h(nodeLi);

}
function g(nodeLj) {  //起点到节点
	var a = starLi[0].offsetLeft - nodeLj.offsetLeft;
	var b = starLi[0].offsetTop - nodeLj.offsetTop;
	return Math.sqrt(a*a+b*b);
}
function h(nodeLj) {  //终点到节点
	var a = endLi[0].offsetLeft - nodeLj.offsetLeft;
	var b = endLi[0].offsetTop - nodeLj.offsetTop;
	return Math.sqrt(a*a+b*b);
}


function openFn() {   //查找所有要走的路线
	newLi = open.shift();  
	newLi.style.background = 'lightyellow';
	newLi.innerText = k++;
	open.length = 0;

	lookup(newLi);
	closeFn(newLi);
	if(newLi == endLi[0]) { //结束了
		return false;
	}

	open.sort(function(li1, li2) {
		return li1.num - li2.num;
	});
	openFn();

}
function closeFn(li) {
	close.push(li);
}
//想寻找下一个目标点
function lookup(newLi) {
	var result = [];
	for(var i = 0; i < oLis.length; i++) {  //减小查找范围 空白格子
		if(filter(oLis[i])) {
			result.push(oLis[i]);
		}
	}

	for(var j = 0; j < result.length; j++) {  //找到九宫格
		if(Math.abs(newLi.offsetLeft - result[j].offsetLeft) <= size+1 && 
			Math.abs(newLi.offsetTop - result[j].offsetTop) <= size+1 && result[j] != newLi) {
			open.push(result[j]);
			result[j].num = f(result[j]);
			result[j].parent = newLi;
		}
	}

}

function filter(node) {  //过滤函数
	for(var i = 0; i < close.length; i++) {
		if(close[i] == node) { //遇到障碍物   
			return false;
		}
	}

	for(i = 0; i < open.length; i++) {
		if(open[i] == node) {
			return false;
		}
	}
	return true;
}