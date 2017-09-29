
//== Main Initialization ==\\
var app = new PIXI.Application(STAGE_WIDTH,STAGE_HEIGHT,{backgroundColor:0xeeeeee});
document.getElementById("game-canvas").append(app.view);

//== Initialize Variables for use ==\\
var mouseObjects=new Array();
//var mouse=app
var mouse={x:0,y:0,down:false};

//keybard, mobile, mouse



var stageBorders=collision_rect(app.view.offsetLeft,app.view.offsetTop,STAGE_WIDTH,STAGE_HEIGHT);
//== Initialize Supporting Structures ==\\

app.stage.interactive=true;
window.addEventListener("resize",function(){
	stageBorders.left=app.view.offsetLeft;
	stageBorders.top=app.view.offsetTop;
});
/*app.stage.on("mousedown",onMouseDown);
app.stage.on("mouseup",onMouseUp);
*///app.ticker.add(resetMouse);

window.addEventListener("keydown",onKeyDown)
window.addEventListener("keyup",onKeyUp)
window.addEventListener("pointerdown",onMouseDown);
window.addEventListener("pointerup",onMouseUp);
window.addEventListener("pointermove",onMouseMove);
//== Initialize the game after everything is setup ==\\
game_init();


//== Utility Functions ==\\
// (Call These)
function trace(_text){
	console.log(_text);
}

function traceProperties(obj){
	for (var a in obj){
		trace(a);
	}
}

//== Support Functions ==\\
// (Don't Call These)

function resetMouse(){
	//mouseDown=false;
}
function onMouseDown(e){
	var mouseObject=mouseObject_constructor();
	mouseObject.id=e.pointerId;
	mouseObject.down=true;
	mouseObject.drag=game_getClosestBox(e);
	if (mouseObject.drag!=null) game_putFirst(mouseObject.drag);
	mouseObjects.push(mouseObject);
	mouse.down=true;
}

function onMouseUp(e){
	for (var i=0;i<mouseObjects.length;i+=1){
		if (mouseObjects[i].id==e.pointerId){
			mouseObjects.splice(i,1);
			return;
		}
	}
	mouse.down=false;
}

function onMouseMove(e){
	mouse.x=e.x-stageBorders.left;
	mouse.y=e.y-stageBorders.top;
	for (var i=0;i<mouseObjects.length;i+=1){
		if (mouseObjects[i].drag!=null){
			let _box=mouseObjects[i].drag;
			_box.pullTo(e.x,e.y);
		}
	}
}

function onKeyDown(e){
}

function onKeyUp(e){
}

function mouseObject_constructor(){
	var m={
		id:0,
		x:0,
		y:0,
		down:false,
		key:0,
		drag:null,
	}

	return m;
}