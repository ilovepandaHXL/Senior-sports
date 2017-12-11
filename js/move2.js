function doMove( obj,object,fn){
	clearInterval(obj.timer);
	var iCur = 0;
	var speed = 0;
	obj.timer = setInterval(function(){
		var iyn = true;
		for( var attr in object ){
			if( attr == "opacity" ){
				iCur = Math.round( getCss(obj,"opacity")*100 );
			}else{
				iCur = parseInt(getCss(obj,attr));
			}
			
			speed = (object[attr] - iCur)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			if( iCur != object[attr] ){
				iyn = false;
				if( attr == "opacity" ){
					obj.style.opacity = ( iCur + speed )/100;
					obj.style.filter = "alpha(opacity="+(iCur+speed)+")";
				}else{
					obj.style[attr] = iCur + speed + "px";
				}
			}
		}
		//看一下所有的属性是否都到目标点；
		if( iyn ){
			clearInterval( obj.timer );
			fn&&fn.call(obj);//把this指向改为obj运动完成的对象
		}
		
	},16)
}

function getCss( obj,attr ){
	if( obj.currentStyle ){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}