var aneObj = function()
{
	//start point, control point, end point(sin)
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = []; //摆动 振幅
	this.alpha = 0; // 摆动的角度
}

aneObj.prototype.num = 50;

// 初始化海葵
aneObj.prototype.init = function()
{
	for(var i=0; i<this.num; i++)
	{
		this.rootx[i] = i * 16 + Math.random() * 20; 
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 70;
	}
}

aneObj.prototype.draw = function()
{

	this.alpha += deltaTime * 0.0006;
	var l = Math.sin(this.alpha); //摆动角度

	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	
	for (var i= 0; i< this.num; i++)
	{
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i] + l * this.amp[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}