// 鱼妈妈 与 海葵果实 的碰撞检测
function momFruitsCollision()
{
	if(!data.gameOver)
	{
		for (var i =0; i < fruit.num; i++) 
		{
			if(fruit.alive[i]){
				// 计算鱼妈妈和果实的距离
				var len =  calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if ( len < 900){
					// 果实被吃掉
					fruit.dead(i);
					// 果实数增加
					data.fruitNum++;

					mom.momBodyCount++;
					if(mom.momBodyCount > 7)
					{
						mom.momBodyCount =7;
					}

					if(fruit.fruitType[i] == "blue")
					{
						data.double = 2;
					}

					wave.born(fruit.x[i], fruit.y[i]);
					//wave.draw();
				}
			}
		}

	}
	
}


// 鱼妈妈 和 鱼宝宝 碰撞检测

function momBabyCollision()
{
	// 如果鱼妈妈吃到了果实，才做下面的操作
	if(data.fruitNum > 0 && !data.gameOver)
	{
		var len = calLength2(mom.x , mom.y, baby.x , baby.y);

		if(len < 900)
		{
			// 鱼宝宝 满血复活
			baby.babyBodyCount = 0;
			mom.momBodyCount = 0;
			//score update
			data.addScore();

			// 大鱼 喂 小鱼的时候，产生圈圈
			halo.born(baby.x,  baby.y);
		}

	}
	
}