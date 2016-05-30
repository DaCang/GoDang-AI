var me = true;
var over = false;
var chessBoard = [];

//初始化一个二维数组，存储每一个交叉点
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
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
	//落子
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