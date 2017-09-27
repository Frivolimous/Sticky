
//== Main Initialization ==\\
var interactionMode="keyboard";
try{
	document.createEvent("TouchEvent");
	interactionMode="mobile";
	STAGE_WIDTH=window.innerWidth;
	STAGE_HEIGHT=window.innerHeight;
}catch(e){
	interactionMode="keyboard";
}
var app = new PIXI.Application(STAGE_WIDTH,STAGE_HEIGHT,{backgroundColor:0xeeeeee});
document.getElementById("game-canvas").append(app.view);

//== Initialize Variables for use ==\\
var mouseObjects=new Array();
//var mouse=app
var mouse={x:0,y:0,down:false};
var keyCodes={left:"a",right:"d"};
var keyStates={left:false,right:false};
var NO_SPAWN=false;
var NO_STARS=false;
var NO_FIREWORKS=false;

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
	//traceProperties(app.renderer);
	//trace(e.pointerId);

	var mouseObject=mouseObject_constructor();
	mouseObject.id=e.pointerId;
	mouseObject.down=true;
	mouseObject.drag=game_getClosestBox(e);
	if (mouseObject.drag!=null) game_putFirst(mouseObject.drag);
	mouseObjects.push(mouseObject);
	mouse.down=true;

	//trace(e.target.cursor=="pointer");
//	traceProperties(e);
//	trace(e.type);
}

function onMouseUp(e){
	//if (interactionMode=="keyboard") return;
	for (var i=0;i<mouseObjects.length;i+=1){
		if (mouseObjects[i].id==e.pointerId){
			//onKeyUp(mouseObjects[i]);
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
	//trace(e.tiltX+" "+e.screenX+" "+e.pageX+" "+e.clientX+" "+e.layerX);
	//	trace(i);
	
	//trace(e.list);
}

function onKeyDown(e){
	switch(e.key){
		case keyCodes.left: keyStates.left=true; break;
		case keyCodes.right: keyStates.right=true; break;
		case "p": NO_SPAWN=!NO_SPAWN; break;
	}
	//traceProperties(e);
	//trace(e.key);
	//trace("key pressed")
}

function onKeyUp(e){
	switch(e.key){
		case keyCodes.left: keyStates.left=false; break;
		case keyCodes.right: keyStates.right=false; break;
	}
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

//var key={};
//key.code=keyCode;