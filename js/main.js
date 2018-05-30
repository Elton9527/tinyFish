var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;  // 上一帧执行的时间
var deltaTime; // 两帧间隔的时间差

var bgPic = new Image();

var ane;
var fruit;
var mom; 
var baby; // 鱼宝宝

var mx;  // 鼠标X坐标
var my;  // 鼠标Y坐标

var canWidth;  // 画布宽度
var canHeight; // 画布高度

var babyTail = [];  // 鱼宝宝的尾巴数组
var babyEye = [];   // 鱼宝宝的眼睛
var babyBody = [];  // 鱼宝宝的身体逐渐变白

// 页面加载完后，执行game
document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;          //距离上次执行时间的间隔时间
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

    // 初始化果实
    fruit = new fruitObj();
    fruit.init();

    // 初始化鱼妈妈
    mom = new momObj();
    mom.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    //监听鼠标的移动
    can1.addEventListener('mousemove', onMouseMove, false);

    // 初始化鱼宝宝
    baby = new babyObj();
    baby.init();

    // 初始化鱼宝宝的尾巴
    for(var i = 0; i< 8; i++){
    	babyTail[i] = new Image();
    	babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    // 初始化鱼宝宝的眼睛
    for(var i = 0; i < 2; i++)
    {
    	babyEye[i] = new Image();
    	babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    for(var i = 0; i < 20; i++)
    {
    	babyBody[i] = new Image();
    	babyBody[i].src = "./src/babyFade" + i + ".png";
    }
}

function gameloop(){
	requestAnimFrame(gameloop);

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	// 优化，防止果实会变的异常大
	if(deltaTime > 40){
		deltaTime = 40;
	}
	drawBackground();

	//绘制海葵
	ane.draw();

	//绘制果实
	fruit.draw();

	//监控果实的数量
	fruitMonitor();

	//绘制鱼妈妈
	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();

	// 碰撞检测
	momFruitsCollision();

	// 绘制鱼宝宝
	baby.draw();
}


// 检测鼠标移动
function onMouseMove(e)
{
	if(e.offSetX || e.layerX)
	{
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
}