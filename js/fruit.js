var fruitObj = function()
{
	this.alive = [];
	this.x = [];
	this.y = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function()
{
	for(var  i= 0; i < this.num; i++)
	{
		this.alive[i] = true;
		this.x[i] = 0;
		this.y[i] = 0;
		this.born(i);
	}

	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function()
{
	for(var i = 0;  i<this.num; i++)
	{
		// draw 
		// find an ane, grow , fly up
		ctx2.drawImage(this.orange, this.x[i] - this.orange.width * 0.5, this.y[i] - this.orange.height * 0.5);
	}
}


// 果实出生
fruitObj.prototype.born = function(i)
{
	// 随机找到一个海葵的位置，生成一个果实
	var aneId = Math.floor(Math.random() * ane.num);
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.len[aneId];
}



