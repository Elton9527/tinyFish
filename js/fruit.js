var fruitObj = function()
{
	this.alive = [];
	this.x = [];
	this.y = [];
	this.aneNO= []; //
	this.l = [];   // 图片长度
	this.spd = []; // 果实上浮的速度
	this.fruitType = []; //果实类型
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
		this.aneNO[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003;  //[0.003, 0.02)
		this.born(i);
		this.fruitType[i] ='';
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

			if(this.fruitType[i] == 'blue'){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}

			if(this.l[i] <= 14){
				var NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime; // 随时间变化，长度变长

			} else{

				this.y[i] -= this.spd[i] * 7 * deltaTime; // 果实长大到一定程度，慢慢上浮;
			}

			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] -  this.l[i] * 0.5, this.l[i], this.l[i]);
			

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
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] ='blue'; // orange, blue
	} else {
		this.fruitType[i] ='orange'; // orange, blue
	}
}

// 果实被吃掉
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}


// 监控果实的数量
function fruitMonitor()
{
	var num = 0;
	for(var i=0; i< fruit.num; i++)
	{

		if(fruit.alive[i]){
			num++;
		}
	}

	// 如果果实的数量小于15个，那么就生成一个果实
	if(num < 15){
		// send fruit
		sendFruit();
		return;
	}
}

function sendFruit()
{
	for( var i=0; i< fruit.num; i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
		}

	}
}


