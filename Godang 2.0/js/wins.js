var wins = [];//赢法数组

//初始化一个三维赢法数组
//前面两个维代表棋盘上的位置
for(var i=0;i<15;i++){
	wins[i]=[];
	for (var j = 0; j < 15; j++){
		wins[i][j]=[];
	}
}

//赢法种类的索引
var count=0;

//横线索引
for(var i = 0; i < 15; i++) {//i=横行15
	for (var j = 0; j < 11; j++) {//j=竖行11
			/*第0种赢法
			 wins[0][0][0]=true;棋盘坐标0，0
			 wins[0][1][0]=true;棋盘坐标0，1
			 wins[0][2][0]=true;棋盘坐标0，2
			 wins[0][3][0]=true;棋盘坐标0，3
			 wins[0][4][0]=true;棋盘坐标0，4
			 */
			/*第2种赢法
			 wins[0][1][1]=true;棋盘坐标0，1
			 wins[0][2][1]=true;棋盘坐标0，2
			 wins[0][3][1]=true;棋盘坐标0，3
			 wins[0][4][1]=true;棋盘坐标0，4
			 wins[0][5][1]=true;棋盘坐标0，5
			 */
		for (var k = 0; k < 5; k++) {//k=同一色连在一起的棋子
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线索引
for(var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//正对角线索引
for(var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		/*第0种赢法
		wins[0][0][0]=true;棋盘坐标0，0
		wins[1][1][0]=true;棋盘坐标1，1
		wins[2][2][0]=true;棋盘坐标2，2
		wins[3][3][0]=true;棋盘坐标3，3
		wins[4][4][0]=true;棋盘坐标4，4
		*/
		for (var k = 0; k < 5; k++) {
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反对角线索引
for(var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
console.log(count);