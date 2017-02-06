$(function(){
	/*画表格*/
		var box=$("#box");
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				var div=$("<div>");
				div.id=i+"-"+j;
				box.appendChild(div);
			}
		}
		/*蛇*/
		var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		
		for(var i=0;i<she.length;i++){
			var obj=$("#"+she[i].x+"-"+she[i].y);
			obj.className="she";
			if(i==she.length-1){
				obj.className="headerR";
			}
		}
		/*食物*/
		function getFood(){
			do{
				var x=Math.floor(Math.random()*20);
				var y=Math.floor(Math.random()*20);
			}while(panduan(x,y));
			var obj=$("#"+x+"-"+y);
			obj.className="food";
			return {x:x,y:y};
		}
		function panduan(a,b){
			for(var i=0;i<she.length;i++){
				if(she[i].x==a&&she[i].y==b){
					return true;
				}else{
					return false;
				}
			}
		} 
		var food=getFood();
//		function move(time){
		/*蛇动*/
		var fangxiang="you";
		function run(){
			var oldHead=she[she.length-1];
			if(fangxiang=="you"){
				var olderHead=$("#"+oldHead.x+"-"+(oldHead.y))
				var newHead=$("#"+oldHead.x+"-"+(oldHead.y+1));
				if(newHead==null||panduan(oldHead.x,oldHead.y+1)){
					failShow();
				}
				olderHead.className="she"
				newHead.className="headerR";
				she.push({x:oldHead.x,y:oldHead.y+1});
			}
			if(fangxiang=="zuo"){
				var olderHead=$("#"+oldHead.x+"-"+(oldHead.y))
				var newHead=$("#"+oldHead.x+"-"+(oldHead.y-1));
				if(newHead==null||panduan(oldHead.x,oldHead.y-1)){
					failShow();
				}
				olderHead.className="she"
				newHead.className="headerL";
				she.push({x:oldHead.x,y:oldHead.y-1});
			}
			if(fangxiang=="shang"){
				var olderHead=$("#"+oldHead.x+"-"+(oldHead.y))
				var newHead=$("#"+(oldHead.x-1)+"-"+oldHead.y);
				if(newHead==null||panduan(oldHead.x-1,oldHead.y)){
					failShow();
				}
				olderHead.className="she"
				newHead.className="headerS";
				she.push({x:oldHead.x-1,y:oldHead.y});
			}
			if(fangxiang=="xia"){
				var olderHead=$("#"+oldHead.x+"-"+(oldHead.y))
				var newHead=$("#"+(oldHead.x+1)+"-"+oldHead.y);
				if(newHead==null||panduan(oldHead.x+1,oldHead.y)){
					failShow();
				}
				olderHead.className="she"
				newHead.className="headerX";
				she.push({x:oldHead.x+1,y:oldHead.y});
			}
			if(she[she.length-1].x==food.x&&she[she.length-1].y==food.y){
				food=getFood();
			}else{
				var wei=$("#"+she[0].x+"-"+she[0].y);
				wei.className="";
				she.shift();
			}
		}
		var t;
		/*键盘事件*/
		document.onkeydown=function(e){
			var e=e||window.event;
			var num=e.keyCode;
			if(num==37){
				if(fangxiang=="you"){
					return;
				}
				fangxiang="zuo";
			}else if(num==38){
				if(fangxiang=="xia"){
					return;
				}
				fangxiang="shang";
			}else if(num==39){
				if(fangxiang=="zuo"){
					return;
				}
				fangxiang="you";
			}else if(num==40){
				if(fangxiang=="shang"){
					return;
				}
				fangxiang="xia";
			}
		}
//	}
	var but=$(".button",$(".butBox")[0]);
	but[0].onclick=function(){
		t=setInterval(run,400);
	}
	but[1].onclick=function(){
		t=clearInterval(t);
	}
	but[2].onclick=function(){
		location.href="index.html";
	}
	
	
	var start_box = $('#start-box');
	var start = $('.logo',start_box)[0];
	function start1(){
		start.style.display = 'none';
	}
	
	var begin = $('.start',start_box)[0];
	begin.onclick = function() {
		start1();
		t=setInterval(run,400);
	}
	
	/*游戏失败*/
	var fail = $('#fail-box');
	console.log(fail);
	function failShow() {
		fail.style.display = 'block';
	}
	/*游戏失败*/
})