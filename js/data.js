var  dataObj = function()
{
	this.fruitNum = 0; // 吃掉果实的个数
	this.double = 1;   // 是否吃到了蓝色的果实，蓝色果实可以使当前吃到的果实数翻倍
	this.score = 0;    // 游戏分值
}



dataObj.prototype.draw = function()
{
	var w = can1.width;
	var h = can1.height;

	ctx1.fillStyle = "white";
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
	ctx1.fillText("Score: " + this.score, w * 0.5, h - 20);
}

dataObj.prototype.addScore = function()
{
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}