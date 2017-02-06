// getClass(classname，range) 获取指定类名的元素
// classname是你指定要获取元素的classname
// range 指定的范围  是一个具体的对象
// 思路：
// 1、判断浏览器是否支持
      // document.getElementsByClassName
// 2、获取所有的元素
// 3、元素的类名是否等于指定的类名
// 4、符合条件用数组来存储。
// 5、返回数组
function getclass(classname,range){
  range=range||document;
  // 三元表达式的方法
  // range=range?range:document;
  // range=range==undefined?document:range;
	if (document.getElementsByClassName) {
        // w3c使用
        return range.getElementsByClassName(classname);
	}
	else{
       var a=range.getElementsByTagName('*');
       var arr=[];
       for (var i =0; i<a.length; i++) {
        // 当前元素的className中是否包含指定的类名
       	if (checkclass(a[i].className,classname)) {
 
   }        arr.push(a[i]);
       }
   return arr;
	}
}
function checkclass(classStr,classname){
  var arr=classStr.split(" ");
   for (var i = 0; i <arr.length; i++) {
       if (arr[i]==classname) {
        return true;
       }
   }
   return false;
}
// *****************************************************
// $函数
// 1、初始化范围
// 2、selecter去空
// 3、判断第一个字符
// 4、获取元素
function $(selecter,range){
  if(typeof selecter=="function"){
    window.onload=function(){
      selecter();
    }
  }else if(typeof selecter=="string"){
    range=range?range:document;
  // selecter=selecter.trim();
  if (selecter.charAt(0)==".") {
    return getclass(selecter.substring(1),range);
  }
  else if (selecter.charAt(0)=="#") {
    return range.getElementById(selecter.substring(1))
  }
  else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selecter)){
    return range.getElementsByTagName(selecter);
  }else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selecter)){
    return document.createElement(selecter.slice(1,-1));
  }

  }
}
//设置或者获取文本
// getContent(obj,value)
// obj指定对象 value 设置的文本
// 1、判断获取与设置
//       参数个数
//       value
// 2、获取
//      判断浏览器是否支持属性
  //      return obj.innerText
  //      return obj.textContent 
// 3、设置
//    判断浏览器是否支持属性
//        IE obj.innerText=value
//        w3c obj.textContent=value;
function getContent(obj,value){
  if (value) {
        if (obj.innerText) {
             obj.innerText=value;
        }
        else{
              obj.textContent=value;
        }
  }
  else{
       if (obj.innerText) {
            return obj.innerText;
        }
        else{
            return obj.textContent;
        }
  }
}
// *********************************************************************
// getStyle(obj,attr) 获取指定元素的样式
  // obj指定对象 attr样式属性
  // 1、判断浏览器是否支持
  // 2、返回属性值
function getStyle(obj,attr){
  if (window.getComputedStyle) {
    return getComputedStyle(obj,null)[attr];
  }
   else {
    return obj.currentStyle[attr];
   }
}


//getChilds(obj,type) 获取指定对象的子元素集合
//obj指定的对象
// 获取子元素节点的类型
   // true 获取的是元素节点 
   // false 获取元素节点和有意义的文本
//1、先获取所有子元素
//2、节点类型1
function getChilds(obj,type){
  type=type==undefined?true:type;
  var childs=obj.childNodes;
  var arr=[];
  if(type){
  for (var i = 0; i<childs.length; i++) {
    if (childs[i].nodeType==1) {
      arr.push(childs[i]);
    }
  }
}else{
  for (var i = 0; i<childs.length; i++) {
    if (childs[i].nodeType==1||childs[i].nodeType==3&&
      childs[i].nodeValue.replace(/^\s*|\s*$/g,"")) {
      arr.push(childs[i]);
    }
  }
}
  return arr; 
}
//找到第一个元素
function firstChild(obj){
  return getChilds(obj)[0];
}

//找到最后一个元素
function lastChild(obj){
  var nd=getChilds(obj)
  return nd[nd.length-1];
}

//找到随机一个元素  i表示要找的第几个
function randomChild(obj,i){
  var nd=getChilds(obj)
  var n=nd.length;
  if(i>0&&i<nd.length){
    return nd[i];
  }
}

//获得对象下一个兄弟对象 now表示当前对象
function getNext(now){
  var nextN=now.nextSibling;//获得下一个兄弟节点
  if(nextN==null){
    return ;
  }else{
    while(nextN.nodeType!==1){
      nextN=nextN.nextSibling;
      if(nextN==null){
        return ;
      }
    }
    return nextN;
  }
}

//获得对象上一个兄弟对象 now表示当前对象

function getPrevious(now){
  var previousN=now.previousSibling;//获得上一个兄弟节点
  if(previousN==null){
    return ;
  }else{
    while(previousN.nodeType!==1){
      previousN=previousN.previousSibling;
      if(previousN==null){
        return ;
      }
    }
    return previousN;
  }
}


//插入到插入到某个对象后面  obj1:当前对象，obj2要插入的对象
function insertAfter(obj1,obj2){
  var next=getNext(obj1);//获得下一个兄弟节点

  if(next){
    this.insertBefore(obj2,next);
  }else{
    this.appendChild(obj2);
  }
}
