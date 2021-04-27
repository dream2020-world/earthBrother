var local1=document.getElementById('videoID');  //获取，函数执行完成后local内存释放
var bgDiv2 = document.getElementsByClassName('bgDiv2')[0],
	bgDiv = document.getElementsByClassName('bgDiv')[0],
	element = document.getElementsByClassName('element')[0],
	videoID = document.getElementById('videoID');
var TLBtn = document.getElementsByClassName('TL-btn')[0];
//  第一页
var firstContent = document.getElementsByClassName('firstContent')[0];
var VBCOne = document.getElementsByClassName('VBCOne')[0];
var VBCTwo = document.getElementsByClassName('VBCTwo')[0];
var VBCvideoArr = document.querySelectorAll('.VBContent > ul > li');
// 第三页
var pageThreeV = document.getElementsByClassName('b-image')[0].children;
var clienHeight = document.body.clientHeight;
var twoPageVideo = document.getElementsByClassName('e-content-video');
var rollingSum = 0;
var rollingTimer;
var heightValue = 0.4;
var bImageHeight = document.querySelector('.b-image > ul > li').offsetHeight;	//每个图片元素的高
var bImageColumn = document.querySelectorAll('.b-image > ul');
var bImage1Padding = parseInt(getStyle(bImageColumn[0],'padding-top')),
	bImage2Padding = parseInt(getStyle(bImageColumn[1],'padding-top')),
	bImage3Padding = parseInt(getStyle(bImageColumn[2],'padding-top'));
// 遮罩
var mask = document.getElementsByClassName('mask')[0];
// 第四页
var fourPageContent = document.getElementsByClassName('fourPage-Content')[0];
// 回到顶部
var goTop = document.getElementById('go-top');
// 下一次滚动到的位置
// 节流数值
var lastTime = 0;
var interval = 800;
var nowTime;
// 	浏览器显示窗口的高度
var bodyClientH = document.body.offsetHeight;
var bgdivRDIndex = 0;
var TLBtnSum = 0;
init();
function init(){
	// 视频播放
	videoPlay();
	// 滚动
	rolling();
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
		nowTime = new Date().getTime();
		if (delta < 0){
			//向下滚动
			if(bgdivRDIndex == 3){
				if(nowTime - lastTime > interval){
					threePageMove('bottom');
				}
			}else if(bgdivRDIndex == 4){
				if(nowTime - lastTime > interval){
					bottomA('bottom');
					fourPageContent.style.opacity = 0;
					fourPageContent.style.width = 0;
				}
			}else{
				if(nowTime - lastTime > interval){
					bgMove('bottom');
					lastTime = nowTime;
				}
			}
		}else{
			//向上滚动
			if(bgdivRDIndex == 3){
				if(nowTime - lastTime > interval){
					threePageMove('top');
				}
			}else if(bgdivRDIndex == 5){
				if(nowTime - lastTime > interval){
					bottomA('top');
					fourPageContent.style.opacity = 1;
					fourPageContent.style.width = "";
				}
			}else{
				if(nowTime - lastTime > interval){
					bgMove('top');
					lastTime = nowTime;
				}
			}
		}
	}
}
function bgMove(direction){
	if(direction == 'bottom'){
		if(bgDiv.offsetTop - clienHeight > -bodyClientH*4){
			contentY = -bodyClientH  + bgDiv.offsetTop;
			$(bgDiv).animate({top:-bodyClientH + bgDiv.offsetTop},500,'easeInOutCubic');
			$(bgDiv2).animate({top:contentY},400);
			$(element).animate({top:-bodyClientH + element.offsetTop},800);
			bgdivRDIndex++;
			goTopFun();
		}
	}else if(direction == 'top'){
		if(bgDiv.offsetTop - clienHeight < 0){
			if(bgdivRDIndex > 0){
				bgdivRDIndex--;
			}
			contentY = document.body.offsetHeight + bgDiv.offsetTop;
			$(bgDiv).animate({top:bodyClientH + bgDiv.offsetTop},500,'swing');
			$(bgDiv2).animate({top:contentY},400);
			$(element).animate({top:bodyClientH + element.offsetTop},800);
			goTopFun();
		}
	}
	PageEleAnimate(bgdivRDIndex);
}
function PageEleAnimate(index){
	if(index == 0){
		firstContent.style.transform = 'translate(-50%,-50%) scale(1,1)';
		firstContent.style.opacity = 1;
		videoID.style.backgroundColor = '';
	}else{
		firstContent.style.transform = 'translate(-50%,-50%) scale(0,0)';
		firstContent.style.opacity = 0.5;
		videoID.style.backgroundColor = 'rgba(255,255,255,0.5)'
	}
	if(index == 0){
		local1.play();  //开启播放
	}else{
		local1.pause();  //停止播放
	}
	if(index == 1){
		setTimeout(function(){
			document.getElementsByClassName('VPTop')[0].style.transform = 'translate(-50%,-20%) scale(1,1)';
		},300)
	}else{
		document.getElementsByClassName('VPTop')[0].style.transform = 'translate(-50%,-50%) scale(0,0)';
	}
	if(index == 2){
		setTimeout(function(){
			document.querySelectorAll('.e-content>div:nth-of-type(3)>div')[0].style.opacity = 1;
			setTimeout(function(){
				document.querySelectorAll('.e-content>div:nth-of-type(3)>div')[1].style.opacity = 1;
			},200);
		},400)
		twoPageVideoFun();
		twoPageVideoPlayOrPause(twoPageVideo,true);
	}else{
		setTimeout(function(){
			document.querySelectorAll('.e-content>div:nth-of-type(3)>div')[1].style.opacity = 0;
			document.querySelectorAll('.e-content>div:nth-of-type(3)>div')[0].style.opacity = 0;
		},200);
		twoPageVideoPlayOrPause(twoPageVideo,false);
	}
	if(index == 3){
		setTimeout(function(){
			$('.biological > .b-image > ul > li').css('box-shadow','0 0 3px 3px #b2f8f6');
			setTimeout(function(){
				$('.biological > .b-image > ul > li').css('box-shadow','');
			},500)
		},300)
	}
	if(index == 4){
		mask.style.opacity = 1;
		setTimeout(function(){
			fourPageContent.style.opacity = 1;
		},300)
	}else{
		mask.style.opacity = 0;
		setTimeout(function(){
			fourPageContent.style.opacity = 0;
		},300)
	}
}
function goTopFun(){
	if(bgdivRDIndex != 0){
		goTop.style.display = 'block';
	}else{
		goTop.style.display = 'none';
	}
	goTop.addEventListener('click',function(){
		nowTime = new Date().getTime();
		if(nowTime - lastTime > interval){
			$(bgDiv).animate({top:937},300);
			bgdivRDIndex = 0;
			PageEleAnimate(bgdivRDIndex);
			goTop.style.display = 'none';
			lastTime = nowTime;
		}
	})
	
}
function videoPlay(){

	local1.autoplay = true; // 自动播放
	local1.loop = true; // 循环播放
	local1.muted=true; // 关闭声音，如果为false,视频无法自动播放
	if(local1.paused){  //判断是否处于暂停状态
		local1.play();  //开启播放
	}else{		   
		local1.pause();  //停止播放
	}
}
// 第一页
onePage();
function onePage(){
	onePageMove(VBCOne,'left',12000);
	onePageMove(VBCTwo,'right',12000);
	VBCOne.addEventListener('mouseover',function(){
		$(this).stop(true)
	})
	VBCTwo.addEventListener('mouseover',function(){
		$(this).stop(true)
	})
	VBCOne.addEventListener('mouseout',function(){
		var speed = parseFloat(this.offsetLeft/-660);
		var time = 12000 - 12000 * speed.toFixed(3);
		onePageMove(this,'left',time);
	})
	VBCTwo.addEventListener('mouseout',function(){
		var speed = parseFloat((-660 - this.offsetLeft)/-660);
		var time = 12000 - 12000 * speed.toFixed(3);
		onePageMove(this,'right',time);
	})
}
// 第一页视频滚动
function onePageMove(obj,direction,time){
	if(direction == 'left'){
		$(obj).animate({left:"-660px"},time,'linear',onePageMoveCb);
		function onePageMoveCb(){
			$(obj).animate({left:0},2000,'swing');
			onePageMove(VBCOne,'left',12000);
		}
	}else if(direction == 'right'){
		$(obj).animate({left:0},time,'linear',onePageMoveCb);
		function onePageMoveCb(){
			$(obj).animate({left:"-660px"},2000,'swing');
			onePageMove(VBCTwo,'right',12000);
		}
	}
}
// 第一页视频触摸播放
var playBool = true;
onePageOverPlay();
function onePageOverPlay(){
	for(let i = 0; i < VBCvideoArr.length; i++){
		VBCvideoArr[i].getElementsByTagName('video')[0].loop = true; // 循环播放
		VBCvideoArr[i].getElementsByTagName('video')[0].muted=true; // 关闭声音，如果为false,视频无法自动播放
		VBCvideoArr[i].getElementsByClassName('VBCMask')[0].innerHTML =
			 `<div class="btn btn--play-pause">
			 <svg viewBox="0 0 40 40" class="btn__icon">
			 <circle cx="20" cy="20" r="19" transform="rotate(-90 20 20)" class="icon__shape icon__shape--circle icon__shape--orange" style="stroke-dashoffset: -119.381px; stroke-dasharray: 119.381, 0;"></circle>
			 <circle cx="20" cy="20" r="19" transform="rotate(-90 20 20)" class="icon__shape icon__shape--circle icon__shape--white" style="stroke-dashoffset: -119.381px; stroke-dasharray: 119.381, 0;"></circle>
			 <polygon points="16,14 16,26 27.5,19.8" class="icon__shape icon__shape--triangle" style="stroke-dashoffset: 38px; stroke-dasharray: 38, 0;"></polygon>
			 <line x1="24" y1="14" x2="24" y2="26" class="icon__shape icon__shape--line" style="stroke-dashoffset: -12px; opacity: 0;"></line>
			 </svg>
			 <div class="btn__shadow" style="opacity: 0;"></div>
		 </div>`;
		VBCvideoArr[i].addEventListener('mouseover',function(){
			VBCvideoArr[i].getElementsByTagName('video')[0].play();  //开启播放
		})
		VBCvideoArr[i].addEventListener('mouseout',function(){
			VBCvideoArr[i].getElementsByTagName('video')[0].pause();  //停止播放
			// VBCvideoArr[i].getElementsByClassName('VBCMask')[0].innerHTML =
			//  `<span class="VBCMask-play"></span>`;
		})
	}
	videoBtnPlay();
}
// 第二页视频
twoPageVideoFun();
function twoPageVideoFun(){
	for(let i = 0; i < twoPageVideo.length; i++){
		twoPageVideo[i].autoplay = true; // 自动播放
		twoPageVideo[i].loop = true; // 循环播放
		twoPageVideo[i].muted=true; // 关闭声音，如果为false,视频无法自动播放
		twoPageVideo[i].play();  //开启播放 
		twoPageVideo[i].addEventListener('mouseover',function(){
			twoPageVideoPlayOrPause(twoPageVideo,false);
			twoPageVideo[i].play();
		});
		twoPageVideo[i].addEventListener('mouseout',function(){
			twoPageVideoPlayOrPause(twoPageVideo,true);
		})
	}
}
function twoPageVideoPlayOrPause(video,YesNot){
	for(let j = 0; j < video.length; j++){
		if(YesNot){
			video[j].play();
		}else{
			video[j].pause();
		}
	}
}
// 第三页竖向滚动
function threePageMove(direction){
	var pageThreeV0value = pageThreeV[0].style.transform,
		pageThreeV1value = pageThreeV[1].style.transform,
		pageThreeV2value = pageThreeV[2].style.transform;
	pageThreeV0value = parseInt(pageThreeV0value.split('(')[1].split(')')[0].split(',')[1]);
	pageThreeV1value = parseInt(pageThreeV1value.split('(')[1].split(')')[0].split(',')[1]);
	pageThreeV2value = parseInt(pageThreeV2value.split('(')[1].split(')')[0].split(',')[1]);
	if(direction == 'top'){
		pageThreeV[0].style.transform = 'translate(0,'+ (pageThreeV0value + 96) + 'px)';
		pageThreeV[1].style.transform = 'translate(0,'+ (pageThreeV1value + 60) + 'px)';
		pageThreeV[2].style.transform = 'translate(0,'+ (pageThreeV2value + 84) + 'px)';
	}else if(direction == 'bottom'){
		pageThreeV[0].style.transform = 'translate(0,'+ (pageThreeV0value - 96) + 'px)';
		pageThreeV[1].style.transform = 'translate(0,'+ (pageThreeV1value - 60) + 'px)';
		pageThreeV[2].style.transform = 'translate(0,'+ (pageThreeV2value - 84) + 'px)';
	}
	setTimeout(function(){
		var pageThreeV0value = pageThreeV[0].style.transform;
		pageThreeV0value = parseInt(pageThreeV0value.split('(')[1].split(')')[0].split(',')[1]);
		if(pageThreeV0value < -2780){
			nowTime = new Date().getTime();
			if(nowTime - lastTime > interval){
				setTimeout(function(){
					pageThreeVReduction();
				},400);
				bgMove('bottom');
				threePageImageshow(1);
				threePageImageshow(2);
				threePageImageshow(3);
				lastTime = nowTime;
			}
		}else if(pageThreeV0value > 0){
			nowTime = new Date().getTime();
			if(nowTime - lastTime > interval){
				setTimeout(function(){
					pageThreeVReduction();
				},400);
				bgMove('top');
				threePageImageshow(1);
				threePageImageshow(2);
				threePageImageshow(3);
				lastTime = nowTime;
			}
		}
	},300)
	function pageThreeVReduction(){
		pageThreeV[0].style.transform = 'translate(0,0)';
		pageThreeV[1].style.transform = 'translate(0,0)';
		pageThreeV[2].style.transform = 'translate(0,0)';
	}
	// 第三页面图片虚化效果
	threePageImageAlongWith();
	function threePageImageAlongWith(){
		pageThreeV0value = pageThreeV0value * -1,
		pageThreeV1value = pageThreeV1value * -1,
		pageThreeV2value = pageThreeV2value * -1;
		console.log(pageThreeV0value - bImage1Padding)
		if(pageThreeV0value - bImage1Padding > (bImageHeight*3 + bImageHeight*heightValue)){
			threePageImageshow(1);
			bImageColumn[0].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[0].getElementsByTagName('li')[1].style.opacity = 0;
			bImageColumn[0].getElementsByTagName('li')[2].style.opacity = 0;
			bImageColumn[0].getElementsByTagName('li')[3].style.opacity = 0.4;
		}else if(pageThreeV0value - bImage1Padding > (bImageHeight*2 + bImageHeight*heightValue)){
			threePageImageshow(1);
			bImageColumn[0].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[0].getElementsByTagName('li')[1].style.opacity = 0;
			bImageColumn[0].getElementsByTagName('li')[2].style.opacity = 0.4;
		}else if(pageThreeV0value - bImage1Padding > (bImageHeight + bImageHeight*heightValue)){
			threePageImageshow(1);
			bImageColumn[0].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[0].getElementsByTagName('li')[1].style.opacity = 0.4;
		}else if(pageThreeV0value - bImage1Padding > bImageHeight*heightValue){
			threePageImageshow(1);
			bImageColumn[0].getElementsByTagName('li')[0].style.opacity = 0.4;
		}else{
			threePageImageshow(1);
		}
		if(pageThreeV1value - bImage2Padding > (bImageHeight*3 + bImageHeight*heightValue)){
			threePageImageshow(2);
			bImageColumn[1].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[1].getElementsByTagName('li')[1].style.opacity = 0;
			bImageColumn[1].getElementsByTagName('li')[2].style.opacity = 0;
			bImageColumn[1].getElementsByTagName('li')[3].style.opacity = 0.4;
		}else if(pageThreeV1value - bImage2Padding > (bImageHeight*2 + bImageHeight*heightValue)){
			threePageImageshow(2);
			bImageColumn[1].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[1].getElementsByTagName('li')[1].style.opacity = 0;
			bImageColumn[1].getElementsByTagName('li')[2].style.opacity = 0.4;
		}else if(pageThreeV1value - bImage2Padding > (bImageHeight + bImageHeight*heightValue)){
			threePageImageshow(2);
			bImageColumn[1].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[1].getElementsByTagName('li')[1].style.opacity = 0.4;
		}else if(pageThreeV1value - bImage2Padding > bImageHeight*heightValue){
			threePageImageshow(2);
			bImageColumn[1].getElementsByTagName('li')[0].style.opacity = 0.4;
		}else{
			threePageImageshow(2);
		}

		if(pageThreeV2value - bImage3Padding > (bImageHeight*3 + bImageHeight*heightValue)){
			threePageImageshow(3);
			bImageColumn[2].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[2].getElementsByTagName('li')[1].style.opacity = 0;
			bImageColumn[2].getElementsByTagName('li')[2].style.opacity = 0;
			bImageColumn[2].getElementsByTagName('li')[3].style.opacity = 0.4;
		}else if(pageThreeV2value - bImage3Padding > (bImageHeight*2 + bImageHeight*heightValue)){
			threePageImageshow(3);
			bImageColumn[2].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[2].getElementsByTagName('li')[1].style.opacity = 0;
			bImageColumn[2].getElementsByTagName('li')[2].style.opacity = 0.4;
		}else if(pageThreeV2value - bImage3Padding > (bImageHeight + bImageHeight*heightValue)){
			threePageImageshow(3);
			bImageColumn[2].getElementsByTagName('li')[0].style.opacity = 0;
			bImageColumn[2].getElementsByTagName('li')[1].style.opacity = 0.4;
		}else if(pageThreeV2value - bImage3Padding > bImageHeight*heightValue){
			threePageImageshow(3);
			bImageColumn[2].getElementsByTagName('li')[0].style.opacity = 0.4;
		}else{
			threePageImageshow(3);
		}
	}
	function threePageImageshow(index){
		switch(index){
			case 1 :
				bImageColumn[0].getElementsByTagName('li')[0].style.opacity = 1;
				bImageColumn[0].getElementsByTagName('li')[1].style.opacity = 1;
				bImageColumn[0].getElementsByTagName('li')[2].style.opacity = 1;
				bImageColumn[0].getElementsByTagName('li')[3].style.opacity = 1;
				break;
			case 2 :
				bImageColumn[1].getElementsByTagName('li')[0].style.opacity = 1;
				bImageColumn[1].getElementsByTagName('li')[1].style.opacity = 1;
				bImageColumn[1].getElementsByTagName('li')[2].style.opacity = 1;
				bImageColumn[1].getElementsByTagName('li')[3].style.opacity = 1;
				break;
			case 3 :
				bImageColumn[2].getElementsByTagName('li')[0].style.opacity = 1;
				bImageColumn[2].getElementsByTagName('li')[1].style.opacity = 1;
				bImageColumn[2].getElementsByTagName('li')[2].style.opacity = 1;
				bImageColumn[2].getElementsByTagName('li')[3].style.opacity = 1;
				break;	
		}
	}
}
function getStyle(elem,prop){
	if(window.getComputedStyle){
		return window.getComputedStyle(elem,null)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}