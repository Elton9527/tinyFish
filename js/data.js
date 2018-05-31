var  dataObj = function()
{
	this.fruitNum = 0; // 吃掉果实的个数
	this.double = 1;   // 是否吃到了蓝色的果实，蓝色果实可以使当前吃到的果实数翻倍
	this.score = 0;    // 游戏分值
	this.alpha = 0;    // GAMEOVER 字样透明度
}



dataObj.prototype.draw = function()
{
	var w = can1.width;
	var h = can1.height;

	ctx1.save();
	ctx1.fillStyle = "white";
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
	ctx1.fillText("Score: " + this.score, w * 0.5, h - 20);
	if(this.gameOver)
	{
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1)
		{
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255, 255, 255,"+ this.alpha +")";
		ctx1.fillText("GAMEOVER", w * 0.5, h * 0.5);
	}
	ctx1.restore();
}

dataObj.prototype.addScore = function()
{
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}