var boxes=[];

function game_putFirst(_box){
	for (var i=0;i<boxes.length;i+=1){
		if (boxes[i]===_box){
			boxes.splice(i,1)
			boxes.unshift(_box);
			return;
		}
	}

}
//== Initialize Game Elements==\\
function game_init(){
	app.ticker.add(game_onTick);
	for (var i=0;i<4;i+=1){
		let _box=box_gameBox2(50,0x0022ff);
		_box.id=0;
		_box.x=100;
		_box.y=100+50*i;
		boxes.push(_box);
		app.stage.addChild(_box);
	}

	for (var i=0;i<4;i+=1){
		let _box=box_gameBox2(150,0xff7700);
		_box.id=1;
		_box.x=300;
		_box.y=100+50*i;
		boxes.push(_box);
		app.stage.addChild(_box);
	}
}

//== Start/Stop the Game ==\\


//==Primary Game Loop==\\
function game_onTick(){
	for (var i=0;i<boxes.length;i+=1){
		boxes[i].alpha=0.5;
	}
	for (var i=0;i<boxes.length;i+=1){
		boxes[i].update();
		for (var j=i+1;j<boxes.length;j+=1){
			
			if (boxes[i].id!=boxes[j].id && box_getTouchDistance(boxes[i],boxes[j])){
				boxes[i].alpha=1;
				boxes[j].alpha=1;
			}
			boxes[i].hitTestAndStop(boxes[j]);
		}
		
		boxes[i].hitTestBorders(stageBorders);
	}
}

function game_getClosestBox(_point,_distance=100,_filter=null){
	var m=null;
	_distance*=_distance;
	var _distance2=0;
	
	for (var i=0;i<boxes.length;i+=1){
		if (_filter!=null && _filter===boxes[i]) continue;

		let _x2=boxes[i].x+boxes[i].width/2-_point.x;
		let _y2=boxes[i].y+boxes[i].height/2-_point.y;
		_distance2=_x2*_x2+_y2*_y2;
		if (_distance2<_distance){
			_distance=_distance2;
			m=boxes[i];
		}
	}
	return m;
}