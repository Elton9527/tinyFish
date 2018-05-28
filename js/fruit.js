var fruitObj = function()
{
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];   // 图片长度
	this.spd = []; // 果实上浮的速度
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
		this.l[i] = 0;
		this.spd[i] = Math.random() * 0.01 + 0.005;  //[0.005, 0.15)
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
		if(this.alive[i]){
			if(this.l[i] <= 15){
				this.l[i] += this.spd[i] * deltaTime; // 随时间变化，长度变长
			} else{
				this.y[i] -= this.spd[i] * 7 * deltaTime; // 果实长大到一定程度，慢慢上浮;
			}
			ctx2.drawImage(this.orange, this.x[i] - this.l[i] * 0.5, this.y[i] -  this.l[i] * 0.5, this.l[i], this.l[i]);

			if(this.y[i] < 10)
			{
				this.alive[i] = false;
			}
		}
	}
}


// 果实出生
fruitObj.prototype.born = function(i)
{
	// 随机找到一个海葵的位置，生成一个果实
	var aneId = Math.floor(Math.random() * ane.num);
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.len[aneId];
	this.l[i] = 0;
}



