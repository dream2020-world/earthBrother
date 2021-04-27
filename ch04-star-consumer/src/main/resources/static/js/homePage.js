	var BtnList = document.getElementsByClassName('bottomBtn')[0].getElementsByTagName('ul')[0];
	var bgDiv1 = document.getElementsByClassName('bgDiv1')[0],
		bgDiv2 = document.getElementsByClassName('bgDiv2')[0],
		bgDiv3 = document.getElementsByClassName('bgDiv3')[0];
	var	figure = document.getElementsByClassName('figure')[0];
	// 四个传送门DOM
	var forest = document.getElementsByClassName('forest')[0],
		sea = document.getElementsByClassName('sea')[0],
		Cyberpunk = document.getElementsByClassName('Cyberpunk')[0],
		galaxy = document.getElementsByClassName('galaxy')[0];
	var musicIcon = document.getElementsByClassName('musicIcon')[0];
	var scrollSum = 0;
	var timer = null;
	var figureTimer = null;
	// 人物每次移动的距离
	var figureSpeed = 120;
	// 初始方法(){
	init();
	function init(){
		rolling();
		// 人物移动
		// 键盘控制人物移动
		figureDown();
		// 底部按钮
		bottomBtnClick();
		// 音乐按钮点击
		musicClick();
	}
	function rolling(){
		if (window.addEventListener){
			window.addEventListener('DOMMouseScroll', wheel, false);
		}//FF,火狐浏览器会识别该方法
		window.onmousewheel = document.onmousewheel = wheel;//W3C
		//统一处理滚轮滚动事件
		function wheel(event){
			var delta = 0;
			if (!event) event = window.event;
			if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
				delta = event.wheelDelta/120; 
				if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
			} else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
				delta = -event.detail/3;
			}
			scrollSum++;
			if (delta <0){//向下滚动
				console.log(666)
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					leftMove();
				},100)
			}else{//向上滚动
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					rightMove();
				},100)
			}
		}
	}
	function leftMove(){
		console.log(-bgDiv1.offsetWidth + document.body.clientWidth);
		figureMove('right',false,true);
		if(bgDiv1.offsetLeft - 100 * scrollSum > -4832){
			bgDiv1.style.left = bgDiv1.offsetLeft -80 * scrollSum + 'px';
			bgDiv2.style.left = bgDiv2.offsetLeft -70 * scrollSum + 'px';
			bgDiv3.style.left = bgDiv3.offsetLeft -60  * scrollSum + 'px';
		}else{
			bgDiv1.style.left = -bgDiv1.offsetWidth + document.body.clientWidth + 'px';
			if(bgDiv2.offsetLeft - 80 * scrollSum > -4832){
				bgDiv2.style.left = bgDiv2.offsetLeft -70 * scrollSum + 'px';
				bgDiv3.style.left = bgDiv3.offsetLeft -60  * scrollSum + 'px';
			}else{
				bgDiv2.style.left = -bgDiv1.offsetWidth + document.body.clientWidth + 'px';
				if(bgDiv3.offsetLeft - 80 * scrollSum > -4832){
					bgDiv3.style.left = bgDiv3.offsetLeft -60  * scrollSum + 'px';
				}else{
					bgDiv3.style.left = -bgDiv1.offsetWidth + document.body.clientWidth + 'px';	
				}
			}
		}
		PortalPromptShow();
		setTimeout(function(){
			scrollSum = 0;
		},50)
	}
	function rightMove(){
		figureMove('left',false,true);
		if(bgDiv1.offsetLeft + 80 * scrollSum < 0){
			bgDiv1.style.left = bgDiv1.offsetLeft + 80 * scrollSum + 'px';
			bgDiv2.style.left = bgDiv2.offsetLeft + 70 * scrollSum + 'px';
			bgDiv3.style.left = bgDiv3.offsetLeft + 60 * scrollSum + 'px';
		}else{
			bgDiv1.style.left = '0px';
			bgDiv2.style.left = '0px';
			bgDiv3.style.left = '0px';
			$('.PPForest').hide(1000);
		}
		PortalPromptShow();
		setTimeout(function(){
			scrollSum = 0;
		},50)
	}
	// 人物移动
	// 键盘控制人物移动
	function figureDown(){
		var lastTime = 0;
		document.onkeydown = function(e){
			var nowTime = new Date().getTime();
			if(nowTime - lastTime > 300){
				if(e.keyCode == 37 || e.keyCode == 65){
					// 每次移动的距离
					figureMove('left',true,true);
				}else if(e.keyCode == 39 || e.keyCode == 68){
					console.log(55555)
					figureMove('right',true,true);
				}
				lastTime = nowTime;
			}
		};
	}
	// 移动动画
	function figureMove(direction,Walking,xx){
		PortalPromptShow(xx);
		if(direction == "left"){
			if(Walking){
				if(figure.offsetLeft - figureSpeed > 0){
					figure.style.left = figure.offsetLeft - figureSpeed + 'px';
				}else{
					figure.style.left = '0px';
				}
			} 
			figure.style.transform = 'rotateY(180deg)'; 
		}else if(direction = 'right'){
			if(Walking){
				if(figure.offsetLeft + figure.clientWidth + figureSpeed < document.body.clientWidth){
					figure.style.left = figure.offsetLeft + figureSpeed + 'px';
				}else{
					figure.style.left = document.body.clientWidth - 400 + 'px';
				}
			}
			figure.style.transform = ''; 
		}
		figure.style.width = 600 + 'px';
		figure.style.backgroundImage = 'url(/images/figureMove.gif)';
		if(figureTimer){
			clearTimeout(figureTimer);
		}
		figureTimer = setTimeout(function(){
			figure.style.width = '';
			figure.style.backgroundImage = '';
		},1000)
	}
	// 气泡
	function PortalPromptShow(xx){
		var obj;
		var forestLeft = forest.offsetLeft,
			seaLeft = sea.offsetLeft,
			CyberpunkLeft = Cyberpunk.offsetLeft,
			galaxyLeft = galaxy.offsetLeft,
			bgDiv1Left = bgDiv1.offsetLeft,
			figureLeft = figure.offsetLeft;
		if(forestLeft + bgDiv1Left - figureLeft < 500 && forestLeft  + bgDiv1Left - figureLeft > -400){
			$('.PPForest').show('1s');
			bottomHide(xx,0);
		}else if(seaLeft  + bgDiv1Left - figureLeft < 500 && seaLeft  + bgDiv1Left - figureLeft > -400){
			$('.PPSea').show('1s');
			bottomHide(xx,1);
		}else if(CyberpunkLeft  + bgDiv1Left - figureLeft < 500 && CyberpunkLeft  + bgDiv1Left - figureLeft > -400){
			$('.PPCyberpunk').show('1s');
			bottomHide(xx,2);
		}else if(galaxyLeft  + bgDiv1Left - figureLeft < 500 && galaxyLeft  + bgDiv1Left - figureLeft > -400){
			$('.PPGalaxy').show('1s');
			bottomHide(xx,3);
		}else{
			PortalPromptHide();
		}
		function bottomHide(xx,index){
			if(xx){
				BtnList.getElementsByClassName('active')[0].className = '';
				BtnList.children[index].className = 'active';
			}
		}
	}
	function PortalPromptHide(){
			$('.PPForest').hide(1000);
			$('.PPSea').hide(1000);
			$('.PPCyberpunk').hide(1000);
			$('.PPGalaxy').hide(1000);
	}
	// 音乐按钮点击
	function musicClick(){
		musicIcon.addEventListener('click',function(){
			if(musicIcon.style.webkitAnimationPlayState == 'paused'){
				musicIcon.style.webkitAnimationPlayState = 'running';
			}else{
				musicIcon.style.webkitAnimationPlayState = 'paused'
			}
		},false)
	}
	// 底部按钮
	function bottomBtnClick(){
		for(let i = 0; i < BtnList.children.length; i++){
			BtnList.children[i].addEventListener('click',function(){
				var index = [].indexOf.call(BtnList.children,BtnList.getElementsByClassName('active')[0]);
				BtnList.getElementsByClassName('active')[0].className = '';
				console.log(BtnList.getElementsByClassName('active')[0]);
				BtnList.children[i].className = 'active';
				console.log(i);
				if(i > index || i == index){
					figureMove('right');
				}else{
					figureMove('left');
				}
				PortalPromptHide();
				switch(i){
					case 0:
						bgDiv1.style.left = '0';
						bgDiv2.style.left = '0';
						bgDiv3.style.left = '0';
						figure.style.left = '200px';
						$('.PPForest').show(1000);
						break;
					case 1:
						bgDiv1.style.left = '-2186px';
						bgDiv2.style.left = '-1914px';
						bgDiv3.style.left = '-1640px';
						figure.style.left = '200px';
						$('.PPSea').show(1000);
						break;
					case 2:
						bgDiv1.style.left = '-4832px';
						bgDiv2.style.left = '-4353px';
						bgDiv3.style.left = '-3737px';
						figure.style.left = '200px';
						$('.PPCyberpunk').show(1000);
						break;
					case 3:
						bgDiv1.style.left = '-4832px';
						bgDiv2.style.left = '-4832px';
						bgDiv3.style.left = '-4832px';
						figure.style.left = '1200px';
						$('.PPGalaxy').show(1000);
						break;
				}
			})
		}
	}