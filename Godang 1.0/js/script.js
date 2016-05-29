var me = true;
var over = false;
var chessBoard = [];

var wins = [];//赢法数组
var myWin = [];//赢法的统计数组
var computerWin = [];

//初始化一个二维数组，存储每一个交叉点
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}

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

for (var i = 0; i < count; i++) {
	myWin[i]=0;
	computerWin[i]=0;
}

//画棋盘
var chess=document.getElementById('chess');
var context = chess.getContext('2d');
context.strokeStyle = "#A9A9A9";
var logo=new Image();
logo.src="images/logo1.jpg";
logo.onload =function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();
}
var drawChessBoard = function() {
	for(var i=0;i<15;i++){
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
        //用来描边
        context.stroke();
    }
}

var OneStep=function(i,j,me){
	context.beginPath();
    // 画棋子
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    context.closePath();
    var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
    if(me){
    	gradient.addColorStop(0,"#0A0A0A");
    	gradient.addColorStop(1,"#636766");
    }else{
    	gradient.addColorStop(0,"#D1D1D1");
    	gradient.addColorStop(1,"#F9F9F9");
    }
	//fill(),用来填充
	context.fillStyle=gradient;
	context.fill();	
}

chess.onclick=function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	
	if(chessBoard[i][j] == 0){
		OneStep(i,j,me);
		chessBoard[i][j] =1;
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k]=6;
				if(myWin[k]==5){
					window.alert("你赢了！！");
					over=true;
				}
			}
		}
		if(!over){
			me = !me;
			computerAI();
		}
	}
}

var computerAI=function(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if(chessBoard[i][j]==0){
				for(var k=0;k<count;k++){
					if (wins[i][j][k]){
						if(myWin[k]==1){
						myScore[i][j]+=200;
					}else if(myWin[k]==2){
						myScore[i][j]+=400;
					}else if(myWin[k]==3){
						myScore[i][j]+=2000;
					}else if(myWin[k]==4){
						myScore[i][j]+=5000;
					}
					if(computerWin[k]==1){
						computerScore[i][j]+=220;
					}else if(computerWin[k]==2){
						computerScore[i][j]+=420;
					}else if(computerWin[k]==3){
						computerScore[i][j]+=4000;
					}else if(computerWin[k]==4){
						computerScore[i][j]+=10000;
					}
				}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
					    v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>computerScore[u][v]){
						u=i;
					    v=j;
					}
				}
			}
		}
	}
	OneStep(u,v,false);
	chessBoard[u][v]=2;
	for(var k=0;k<count;k++){
			if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k]=6;
				if(computerWin[k]==5){
					window.alert("计算机赢了！！");
					over=true;
				}
			}
		}
		if(!over){
			me =! me;
		}
}