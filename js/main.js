var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;  // 上一帧执行的时间
var deltaTime; // 两帧间隔的时间差

var bgPic = new Image();

var canWidth;  // 画布宽度
var canHeight; // 画布高度

// 页面加载完后，执行game
document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	// 获得canvas context
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext("2d");

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
    canHeight = can1.height;

    // 初始化海葵
    ane = new aneObj();
    ane.init();

}

function gameloop(){
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	drawBackground();

	//绘制海葵
	ane.draw();
	//console.log(deltaTime);
}