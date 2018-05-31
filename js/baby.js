// 鱼宝宝
var babyObj = function()
{
	this.x;
	this.y;
	this.angle;
	this.babyEye = new  Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	this.babyTailTimer = 0; // 计时器
	this.babyTailCount = 0; // 当前执行到哪一帧了

	this.babyEyeTimer = 0;        // 计时器
	this.babyEyeCount = 0;        // 当前执行到哪一帧了
	this.babyEyeInterval = 1000;  //  时间间隔图片，该图片持续多久

	this.babyBodyTimer = 0;        // 计时器
	this.babyBodyCount = 0;        // 当前执行到哪一帧了
	this.babyBodyInterval = 1000;  //  时间间隔图片，该图片持续多久
}

babyObj.prototype.init = function()
{
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;

	//this.babyEye.src = "./src/babyEye0.png";
	this.babyBody.src = "./src/babyFade0.png";
	//this.babyTail.src = "./src/babyTail0.png";
}

babyObj.prototype.draw = function()
{
	// lerp x ,y  // 移动鼠标使一个值趋向一个目标值
	this.x = lerpDistance(mom.x, this.x , 0.98);
	this.y = lerpDistance(mom.y, this.y , 0.98);

	// delta angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	// baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50)
	{
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	// baby Eye 计数
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval)
	{
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0)
		{
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.babyEyeInterval = 200;
		}
	}

	// baby Body 
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300)
	{
		this.babyBodyCount = this.babyBodyCount +1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19)
		{
			this.babyBodyCount = 19;
			
			// game over;
			data.gameOver = true;
		}
	}
	

	// lerp angle 
	this.angle = lerpAngle(beta, this.angle, 0.6);

	// ctx1
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 +23 , -babyTail[babyTailCount].height * 0.5);

	var babyBodyCount = this.babyBodyCount ;
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);

	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
	
	ctx1.restore();
}