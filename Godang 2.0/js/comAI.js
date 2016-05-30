var myWin = [];//赢法的统计数组
var computerWin = [];

for (var i = 0; i < count; i++) {
	myWin[i]=0;
	computerWin[i]=0;
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