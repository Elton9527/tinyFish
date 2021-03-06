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

var momTail= [];
var momEye = [];

var momBodyOra = [];  // 鱼妈妈身体颜色 Orage
var momBodyBlue = []; // 鱼妈妈身体颜色 Blue

var wave = [];

var dust; //漂浮物
var dustPic = [];

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
    
    data = new dataObj();

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

    //鱼妈妈 的尾巴
    for(var i = 0; i< 8; i++){
    	momTail[i] = new Image();
    	momTail[i].src = "./src/bigTail" + i + ".png";
    }

    //鱼妈妈 的眼睛
    for(var i = 0; i< 2; i++){
    	momEye[i] = new Image();
    	momEye[i].src = "./src/bigEye" + i + ".png";
    }

    for(var i = 0; i< 8; i++){
    	momBodyOra[i] = new Image();
    	momBodyBlue[i] = new Image();
    	momBodyOra[i].src = "./src/bigSwim" + i + ".png";
    	momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }


    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();


    for(var i=0; i < 7; i++)
    {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }

    dust = new dustObj();
    dust.init();

    

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

	// 绘制鱼宝宝
	baby.draw();
	// 碰撞检测
	momFruitsCollision();
	// 鱼妈妈 鱼宝宝 碰撞检测
	momBabyCollision();

	// 
	data.draw();

    // wave Draw 
    wave.draw();
    
    // 大鱼 喂 小鱼的特效
    halo.draw();
    // 绘制漂浮物
    dust.draw();
}


// 检测鼠标移动
function onMouseMove(e)
{
    if(!data.gameOver)
    {
        if(e.offSetX || e.layerX)
        {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
	
}