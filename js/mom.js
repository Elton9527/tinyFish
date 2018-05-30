//鱼妈妈
var momObj = function()
{
	this.x ;
	this.y;
	this.angle;   //鼠标与鱼妈妈的坐标差
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;  //  时间间隔图片，该图片持续多久
}

momObj.prototype.init = function()
{
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	this.bigBody.src = "./src/bigSwim0.png";
}

momObj.prototype.draw = function()
{ 

	// lerp x ,y  // 移动鼠标使一个值趋向一个目标值
	this.x = lerpDistance(mx, this.x , 0.99);
	this.y = lerpDistance(my, this.y , 0.99);

	// delta angle
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	// lerp angle 
	this.angle = lerpAngle(beta, this.angle, 0.6);

	// tail 
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	console.log('momEyeTimer:'+this.momEyeTimer);
	console.log('momEyeInterval:'+this.momEyeInterval);

	// mom Eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval)
	{
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;

		if(this.momEyeCount == 0)
		{
			this.momEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.momEyeInterval = 200;
		}
	}
	

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 +30 , -momTail[momTailCount].height * 0.5);

	var momEyeCount = this.momEyeCount;
	console.log('momEyeCount:' + momEyeCount);
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
	ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
	
	ctx1.restore();
}