// 鱼妈妈 与 海葵果实 的碰撞检测
function momFruitsCollision(){
	for (var i =0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			// 计算鱼妈妈和果实的距离
			var len =  calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if ( len < 900){
				// 果实被吃掉
				fruit.dead(i);
			}
		}
	}
}