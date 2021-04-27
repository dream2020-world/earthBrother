// 底部
var PageBottom =  document.getElementsByClassName('PageBottom')[0];
var PBLogo = document.getElementsByClassName('PBLogo')[0];
var PBContent = document.getElementsByClassName('PBContent')[0];
var PBTwo =document.getElementsByClassName('PBTwo')[0];
var bgdivRDIndex = bgdivRDIndex || 0;
function bottomA(direction){
	if(direction == 'top'){
		nowTime = new Date().getTime();
		PageBottom.style = '0';
		PBLogo.style = '';
		PBContent.style = '';
		PBTwo.style = '';
		bgdivRDIndex--;
		lastTime = nowTime;
	}else if(direction == 'bottom'){
		PageBottom.style.height = '937px';
		PBLogo.style.width = '370px';
		PBLogo.style.height = '99px';
		PBLogo.style.top = '8%'
		PBTwo.style.bottom = '0';
		PBTwo.style.opacity = '1';
		bgdivRDIndex++;
	}
}