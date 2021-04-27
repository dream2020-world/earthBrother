$(function(){
	var change_t=0.2
	$(".blackdog").click(function(){//显示黑狗
		TM.to(".seg_main",change_t,{fill:"#404040"})
		TM.to(".seg_lf",change_t,{fill:"#282828"})
		TM.to(".skin_main",change_t,{attr:{style:"stop-color:#404040"}})
		TM.to(".skin_shadow",change_t,{attr:{style:"stop-color:#303030"}})
		TM.to(".skin_shadow_dark",change_t,{attr:{style:"stop-color:#202020"}})
		TM.to(".skin_left",change_t,{attr:{style:"stop-color:#282828"}})
		TM.to(".skin_left_dark",change_t,{attr:{style:"stop-color:#222"}})
		TM.to(".seg",change_t,{fillOpacity:1, strokeWidth:0})
		//骨骼
		TM.to(".bone",change_t,{opacity:0})
		//影子
		TM.to(".shadow_set",change_t,{attr:{stdDeviation:"10 6"}})
		TM.to(".Dog_shadow",change_t,{fillOpacity:0.3, strokeWidth:0})
	})
	



	//-----------------------------------------------
	var blink_t = 0.1,//眨眼速度
		breathe_t = 0.8,//平静呼吸速率
		TM = TweenMax,
		g_DogEye_TL = new TimelineMax(),
		allTL=[
		"g_Dog_TL",
		
		"g_Fleg_TL",
		"g_Fleg_1_TL",
			
		"g_FlegL_TL",
		"g_FlegL_1_TL",
		"g_FlegL_2_TL",
		"g_FlegL_3_TL",
		"g_FlegL_4_TL",
		"g_FlegL_5_TL",

		"g_FlegR_TL",
		"g_FlegR_1_TL",
		"g_FlegR_2_TL",
		"g_FlegR_3_TL",
		"g_FlegR_4_TL",
		"g_FlegR_5_TL",
			
		"g_Hleg_TL",
		"g_Hleg_1_TL",
			
		"g_HlegL_TL",
		"g_HlegL_1_TL",
		"g_HlegL_2_TL",
		"g_HlegL_3_TL",
		"g_HlegL_4_TL",
		"g_HlegL_5_TL",

		"g_HlegR_TL",
		"g_HlegR_1_TL",
		"g_HlegR_2_TL",
		"g_HlegR_3_TL",
		"g_HlegR_4_TL",
		"g_HlegR_5_TL",

		"g_Tail_TL",
		"g_Tail_1_TL",
		"g_Tail_2_TL",
		"g_Tail_3_TL",
		"g_Tail_4_TL",
		"g_Tail_5_TL",
		"g_Tail_6_TL",
		"g_Tail_7_TL",
		"g_Tail_8_TL",
		"g_Tail_9_TL",
		"g_Tail_10_TL",
		"g_Tail_11_TL",

		"g_Body_TL",
		"g_Body_1_TL",
		"g_Body_2_TL",
		"g_Body_3_TL",
		"g_Body_4_TL",
		"g_Body_5_TL",
		
		"g_Neck_TL",
		"g_Neck_1_TL",
		"g_Neck_2_TL",
		"g_Neck_3_TL",
		"g_Neck_4_TL",
		"g_DogHead_TL",
			
		"g_Ear_TL",
		"g_EarL_TL",
		"g_EarL_2_TL",
		"g_EarL_3_TL",
		"g_EarR_TL",
		"g_EarR_2_TL",
		"g_EarR_3_TL",

		"g_Jaw_TL",
		"g_Tongue_TL",
		"g_Tongue_2_TL",
		"g_Tongue_3_TL",
		"g_Tongue_4_TL",
		"g_Tongue_5_TL",
		"g_Tongue_6_TL",
		
		"ground_TL",
		"Dog_shadow_TL"
		],
		allTL_l=allTL.length,
		TL={};
	for(var i=0; i<allTL_l;i++){
		TL[allTL[i]]=new TimelineMax()//初始化所有的部件创建时间轴
	}
	function initTL(myTimeLine){//时间轴初始化方法
		myTimeLine.eventCallback("onStart",null).eventCallback("onComplete",null).eventCallback("onReverseComplete",null).eventCallback("onUpdate",null).eventCallback("onRepeat",null)
		.clear().delay(0).repeat(0).repeatDelay(0).yoyo(false).time(0);
	}
	
	//初始化狗子形态
	TM.set(".g_Dog", {x:0, y:-20})
	//前腿
	TM.set(".g_Fleg_1", {transformOrigin:"21.53 15.83"})
	TM.set(".g_Fleg_2", {transformOrigin:"25.23 14.9"})
	TM.set(".g_Fleg_3", {transformOrigin:"17.52 12.72"})
	TM.set(".g_Fleg_4", {transformOrigin:"8.43 10.21"})
	TM.set(".g_Fleg_5", {transformOrigin:"5.74 7.81"})
	//前左腿
	TM.set(".g_FlegL_1", {rotation:0})
	TM.set(".g_FlegL_2", {rotation:6})
	TM.set(".g_FlegL_3", {rotation:-3})
	TM.set(".g_FlegL_4", {rotation:-3})
	TM.set(".g_FlegL_5", {rotation:0})
	//前右腿
	TM.set(".g_FlegR_1", {rotation:0})
	TM.set(".g_FlegR_2", {rotation:0})
	TM.set(".g_FlegR_3", {rotation:0})
	TM.set(".g_FlegR_4", {rotation:0})
	TM.set(".g_FlegR_5", {rotation:0})
	//后腿
	TM.set(".g_Hleg_1", {transformOrigin:"58.83 2.27"})
	TM.set(".g_Hleg_2", {transformOrigin:"40.52 38.18"})
	TM.set(".g_Hleg_3", {transformOrigin:"50.45 20.63"})
	TM.set(".g_Hleg_4", {transformOrigin:"10.32 10.18"})
	TM.set(".g_Hleg_5", {transformOrigin:"8.34 9.99"})
	//后左腿
	TM.set(".g_HlegL_1", {rotation:0})
	TM.set(".g_HlegL_2", {rotation:2})
	TM.set(".g_HlegL_3", {rotation:4})
	TM.set(".g_HlegL_4", {rotation:0})
	TM.set(".g_HlegL_5", {rotation:0})
	//后右腿
	TM.set(".g_HlegR_1", {rotation:0})
	TM.set(".g_HlegR_2", {rotation:0})
	TM.set(".g_HlegR_3", {rotation:0})
	TM.set(".g_HlegR_4", {rotation:0})
	TM.set(".g_HlegR_5", {rotation:0})
	//尾巴
	TM.set(".g_Tail_1", {transformOrigin:"124.58 7.57", rotation:0})
	TM.set(".g_Tail_2", {transformOrigin:"90.45 10.94", rotation:0})
	TM.set(".g_Tail_3", {transformOrigin:"71.46 8.03", rotation:0})
	TM.set(".g_Tail_4", {transformOrigin:"58.53 4.1", rotation:0})
	TM.set(".g_Tail_5", {transformOrigin:"51.6 5.09", rotation:0})
	TM.set(".g_Tail_6", {transformOrigin:"49.25 4.72", rotation:0})
	TM.set(".g_Tail_7", {transformOrigin:"49.25 4.48", rotation:0})
	TM.set(".g_Tail_8", {transformOrigin:"49.25 4.92", rotation:0})
	TM.set(".g_Tail_9", {transformOrigin:"44.54 4.67", rotation:0})
	TM.set(".g_Tail_10", {transformOrigin:"33.95 3.72", rotation:0})
	TM.set(".g_Tail_11", {transformOrigin:"18.65 6.35", rotation:0})
	//躯干（前腿驱动）
	TM.set(".g_Body", {transformOrigin:"264.88 134.44", rotation:0})
	TM.set(".g_Body_1", {transformOrigin:"264.88 32.93", rotation:0})
	TM.set(".g_Body_2", {transformOrigin:"217.80 33.70", rotation:0})
	TM.set(".g_Body_3", {transformOrigin:"160.12 28.98", rotation:0})
	TM.set(".g_Body_4", {transformOrigin:"109.51 16.04", rotation:0})
	TM.set(".g_Body_5", {transformOrigin:"61.25 10.15", rotation:0})
	//头颈
	TM.set(".g_Neck_1", {transformOrigin:"26.88 134.44", rotation:0})
	TM.set(".g_Neck_2", {transformOrigin:"37.13 115.1", rotation:0})
	TM.set(".g_Neck_3", {transformOrigin:"29.74 92.59", rotation:0})
	TM.set(".g_Neck_4", {transformOrigin:"23.36 70.07", rotation:0})
	TM.set(".g_DogHead", {transformOrigin:"21.43 57.94", rotation:0})
	
	TM.set(".g_EarL", {transformOrigin:"7.58 34.4", rotation:28, x:-2})
	TM.set(".g_EarL_2", {transformOrigin:"4.22 21.26", rotation:-8})
	TM.set(".g_EarL_3", {transformOrigin:"3.56 17.92", rotation:0})
	TM.set(".g_EarR", {transformOrigin:"7.58 34.4", rotation:30, x:-2})
	TM.set(".g_EarR_2", {transformOrigin:"4.22 21.26", rotation:0})
	TM.set(".g_EarR_3", {transformOrigin:"3.56 17.92", rotation:0})
	TM.set(".g_DogEye", {transformOrigin:"5 5.5", rotation:0})



	
	

	
	//走起来
	var w_t = 1.5;
	//前脚配置
	var Ft1=0.14*w_t, Fp1=0,
		Ft2=0.18*w_t, Fp2=Ft1,
		Ft3=0.18*w_t, Fp3=Fp2+Ft2,
		Ft4=0.14*w_t, Fp4=Fp3+Ft3,
		Ft5=0.18*w_t, Fp5=Fp4+Ft4,
		Ft6=0.18*w_t, Fp6=Fp5+Ft5;

	var w_Fleg_1_k0={rotation:-4},
		w_Fleg_1_k1={rotation:-3},
		w_Fleg_1_k2={rotation:0},
		w_Fleg_1_k3={rotation:3},
		w_Fleg_1_k4={rotation:4},
		w_Fleg_1_k5={rotation:0},
		w_Fleg_1_k6={rotation:-4},
		w_Fleg_2_k0={rotation:-14},
		w_Fleg_2_k1={rotation:-8},
		w_Fleg_2_k2={rotation:15},
		w_Fleg_2_k3={rotation:30},
		w_Fleg_2_k4={rotation:26},
		w_Fleg_2_k5={rotation:5},
		w_Fleg_2_k6=w_Fleg_2_k0,
		w_Fleg_3_k0={rotation:-16},
		w_Fleg_3_k1={rotation:-12},
		w_Fleg_3_k2={rotation:-22},
		w_Fleg_3_k3={rotation:-20},
		w_Fleg_3_k4={rotation:2},
		w_Fleg_3_k5={rotation:-45, ease:Power1.easeOut},
		w_Fleg_3_k6=w_Fleg_3_k0,
		w_Fleg_4_k0={rotation:-2},
		w_Fleg_4_k1={rotation:4},
		w_Fleg_4_k2={rotation:2},
		w_Fleg_4_k3={rotation:8},
		w_Fleg_4_k4={rotation:5},
		w_Fleg_4_k5={rotation:90, ease:Back.easeOut},
		w_Fleg_4_k6=w_Fleg_4_k0,
		w_Fleg_5_k0={rotation:20},
		w_Fleg_5_k1={rotation:20},
		w_Fleg_5_k2={rotation:6},
		w_Fleg_5_k3={rotation:-19},
		w_Fleg_5_k4={rotation:5},
		w_Fleg_5_k5={rotation:55},
		w_Fleg_5_k6=w_Fleg_5_k0
	//后脚配置
	var Ht1=0.18*w_t, Hp1=0,
		Ht2=0.18*w_t, Hp2=Ht1,
		Ht3=0.14*w_t, Hp3=Hp2+Ht2,
		Ht4=0.18*w_t, Hp4=Hp3+Ht3,
		Ht5=0.18*w_t, Hp5=Hp4+Ht4,
		Ht6=0.14*w_t, Hp6=Hp5+Ht5;
	
	var w_Hleg_1_k0={rotation:-3},
		w_Hleg_1_k1={rotation:0},
		w_Hleg_1_k2={rotation:3},
		w_Hleg_1_k3={rotation:4},
		w_Hleg_1_k4={rotation:0},
		w_Hleg_1_k5={rotation:-4},
		w_Hleg_1_k6=w_Hleg_1_k0,
		w_Hleg_2_k0={rotation:-20},
		w_Hleg_2_k1={rotation:-3},
		w_Hleg_2_k2={rotation:30},
		w_Hleg_2_k3={rotation:32},
		w_Hleg_2_k4={rotation:-12},
		w_Hleg_2_k5={rotation:-17},
		w_Hleg_2_k6=w_Hleg_2_k0,
		w_Hleg_3_k0={rotation:13},
		w_Hleg_3_k1={rotation:11},
		w_Hleg_3_k2={rotation:-12},
		w_Hleg_3_k3={rotation:0},
		w_Hleg_3_k4={rotation:45},
		w_Hleg_3_k5={rotation:20},
		w_Hleg_3_k6=w_Hleg_3_k0,
		w_Hleg_4_k0={rotation:-14},
		w_Hleg_4_k1={rotation:-13},
		w_Hleg_4_k2={rotation:-10},
		w_Hleg_4_k3={rotation:-14},
		w_Hleg_4_k4={rotation:-30},
		w_Hleg_4_k5={rotation:-35},
		w_Hleg_4_k6=w_Hleg_4_k0,
		w_Hleg_5_k0={rotation:26},
		w_Hleg_5_k1={rotation:7},
		w_Hleg_5_k2={rotation:-10},
		w_Hleg_5_k3={rotation:80},
		w_Hleg_5_k4={rotation:55},
		w_Hleg_5_k5={rotation:40},
		w_Hleg_5_k6=w_Hleg_5_k0
	//躯干配置
	var w_body_k0 = {x:0, y:15},
		w_body_k1 = {x:0, y:15},
		w_body_k2 = {x:0, y:5, ease:Power2.easeOut},
		w_body_k3 = {x:0, y:15, ease:Power2.easeIn},
		w_body_1_k0 = {rotation:0,},
		w_body_1_k1 = {rotation:1, ease:Power2.easeOut},
		w_body_1_k1_1 = {rotation:0},
		w_body_1_k2 = {rotation:-1.7},
		w_body_1_k2_1 = {rotation:-2.7},
		w_body_1_k3 = {rotation:0, ease:Power1.easeIn},
		w_body_2_k0 = {rotation:0},
		w_body_2_k1 = {rotation:2},
		w_body_2_k1_1 = {rotation:1},
		w_body_2_k2 = {rotation:0},
		w_body_2_k2_1 = {rotation:-2},
		w_body_2_k3 = {rotation:0},
		w_body_hl_k0 = {x:0, y:15},
		w_body_hl_k1 = {x:0, y:5, ease:Power1.easeOut},
		w_body_hl_k2 = {x:0, y:15, ease:Power1.easeIn},
		w_body_hl_k3 = {x:0, y:15};
	
	//从站立到走路的过度
	function stand2walk(){
		console.log("过渡到走路循环开始点")
		for(var key in TL){
			initTL(TL[key])//初始化所有的TL
		}
		
		//过度到走路循环开始点
		var s2w_t = Ft2
		//添加过度到walk的事件
		TL.g_Dog_TL.eventCallback("onComplete",walk)
		TL.g_Dog_TL.add([//添加stand2walk动画
			//前左腿
			TL.g_FlegL_TL.add([
				TL.g_FlegL_1_TL.to(".g_FlegL_1", s2w_t, w_Fleg_1_k3),
				TL.g_FlegL_2_TL.to(".g_FlegL_2", s2w_t, w_Fleg_2_k3),
				TL.g_FlegL_3_TL.to(".g_FlegL_3", s2w_t, w_Fleg_3_k3),
				TL.g_FlegL_4_TL.to(".g_FlegL_4", s2w_t, w_Fleg_4_k3),
				TL.g_FlegL_5_TL.to(".g_FlegL_5", s2w_t, w_Fleg_5_k3)
			],0,"normal",0)
			.to(".g_FlegL_1", s2w_t, w_body_k0, 0),//位移动画
			//前右腿
			TL.g_FlegR_TL.add([
				TL.g_FlegR_1_TL
				.to(".g_FlegR_1", s2w_t/2, w_Fleg_1_k5)
				.to(".g_FlegR_1", s2w_t/2, w_Fleg_1_k0),
				TL.g_FlegR_2_TL
				.to(".g_FlegR_2", s2w_t/2, w_Fleg_2_k5)
				.to(".g_FlegR_2", s2w_t/2, w_Fleg_2_k0),
				TL.g_FlegR_3_TL
				.to(".g_FlegR_3", s2w_t/2, w_Fleg_3_k5)
				.to(".g_FlegR_3", s2w_t/2, w_Fleg_3_k0),
				TL.g_FlegR_4_TL
				.to(".g_FlegR_4", s2w_t/2, w_Fleg_4_k5)
				.to(".g_FlegR_4", s2w_t/2, w_Fleg_4_k0),
				TL.g_FlegR_5_TL
				.to(".g_FlegR_5", s2w_t/2, w_Fleg_5_k5)
				.to(".g_FlegR_5", s2w_t/2, w_Fleg_5_k0)

			],0,"normal",0)
			.to(".g_FlegR_1", s2w_t, w_body_k0, 0),
			//后左腿
			TL.g_HlegL_TL.add([
				TM.to(".g_HlegL_1", s2w_t, w_Hleg_1_k3),
				TM.to(".g_HlegL_2", s2w_t, w_Hleg_2_k3),
				TM.to(".g_HlegL_3", s2w_t, w_Hleg_3_k3),
				TM.to(".g_HlegL_4", s2w_t, w_Hleg_4_k3),
				TM.to(".g_HlegL_5", s2w_t, w_Hleg_5_k3)
			],0,"normal",0)
			.to(".g_HlegL_1", s2w_t/2, {x:0, y:1}, 0)//位移动画
			.to(".g_HlegL_1", s2w_t/2, w_body_hl_k0, s2w_t/2),
			//后右腿
			TL.g_HlegR_TL.add([
				TM.to(".g_HlegR_1", s2w_t, w_Hleg_1_k0),
				TL.g_HlegR_2_TL.to(".g_HlegR_2", s2w_t, w_Hleg_2_k0),
				TL.g_HlegR_3_TL.to(".g_HlegR_3", s2w_t, w_Hleg_3_k0),
				TL.g_HlegR_4_TL.to(".g_HlegR_4", s2w_t, w_Hleg_4_k0),
				TL.g_HlegR_5_TL.to(".g_HlegR_5", s2w_t, w_Hleg_5_k0)
			],0,"normal",0)
			.to(".g_HlegR_1", s2w_t/2, {x:0, y:1}, 0)//位移动画
			.to(".g_HlegR_1", s2w_t/2, w_body_hl_k0, s2w_t/2),

			//躯干
			TL.g_Body_TL.add([
				TM.to(".g_Body", s2w_t, {x:0, y:15}),
				TL.g_Body_1_TL
				.to(".g_Body_1", s2w_t/2, {rotation:1, x:0, y:0, scaleX:1, scaleY:1})
				.to(".g_Body_1", s2w_t/2, {rotation:0}),
				TL.g_Body_2_TL
				.to(".g_Body_2", s2w_t/2, {rotation:1, x:0, y:0, scaleX:1, scaleY:1})
				.to(".g_Body_2", s2w_t/2, {rotation:0}),
				TL.g_Body_3_TL
				.to(".g_Body_3", s2w_t/2, {rotation:0.5, x:0, y:0, scaleX:1, scaleY:1})
				.to(".g_Body_3", s2w_t/2, {rotation:0}),
				TL.g_Body_4_TL.to(".g_Body_4", s2w_t/2, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TL.g_Body_5_TL.to(".g_Body_5", s2w_t/2, {rotation:0, x:0, y:0, scaleX:1, scaleY:1})
			],0,"normal",0),
			//尾巴
			TL.g_Tail_TL.add([
				TL.g_Tail_1_TL
				.to(".g_Tail_1", s2w_t/2, {rotation:0, x:0, y:1, scaleX:1, scaleY:1})
				.to(".g_Tail_1", s2w_t/2, {rotation:0, y:15}),
				TM.to(".g_Tail_2", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_3", s2w_t, {rotation:-1, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_4", s2w_t, {rotation:-2, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_5", s2w_t, {rotation:-3, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_6", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_7", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_8", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_9", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_10", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tail_11", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1})
			],0,"normal",0),
			//头颈
			TL.g_Neck_TL.add([
				//头颈
				TL.g_Neck_1_TL.to(".g_Neck_1", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Neck_2", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Neck_3", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Neck_4", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_DogHead", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				//下巴舌头
				TM.to(".g_Jaw", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tongue", s2w_t, {rotation:8, x:0, y:0, scaleX:0.9, scaleY:1}),
				TM.to(".g_Tongue_2", s2w_t, {rotation:4, x:0, y:0, scaleX:0.93, scaleY:1}),
				TM.to(".g_Tongue_3", s2w_t, {rotation:0, x:0, y:0, scaleX:0.96, scaleY:1}),
				TM.to(".g_Tongue_4", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tongue_5", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1}),
				TM.to(".g_Tongue_6", s2w_t, {rotation:0, x:0, y:0, scaleX:1, scaleY:1})
			],0,"normal",0),
			//地面
			TM.to(".ground", s2w_t,{"stroke-dashoffset":"+=60px"}),
			TM.to(".Dog_shadow", s2w_t,{scaleX:1.3})
			
		],0,"normal",0)//.tweenTo(s2w_t/2)
		
	}

	function walk(){
		console.log("走起来")
			
		for(var key in TL){
			initTL(TL[key])//初始化所有的TL
		}
		//前脚动画配置
		function FLeg(leg){
			TL.g_Fleg_1_TL = new TimelineMax().repeat(1)
			TL.g_Fleg_TL = new TimelineMax().repeat(-1)
			.add([
				TL.g_Fleg_1_TL
				.set(leg+"_1",w_body_k0,0)
				.to(leg+"_1", Ft1, w_body_k1, Fp1)
				.to(leg+"_1", Ft2, w_body_k2, Fp2)
				.to(leg+"_1", Ft3, w_body_k3, Fp3)
			],0,"normal",0)//位移动画
			.set(leg+"_1", w_Fleg_1_k0, 0)
			.to(leg+"_1", Ft1, w_Fleg_1_k1, Fp1)
			.to(leg+"_1", Ft2, w_Fleg_1_k2, Fp2)
			.to(leg+"_1", Ft3, w_Fleg_1_k3, Fp3)
			.to(leg+"_1", Ft4, w_Fleg_1_k4, Fp4)
			.to(leg+"_1", Ft5, w_Fleg_1_k5, Fp5)
			.to(leg+"_1", Ft6, w_Fleg_1_k6, Fp6)
			
			.set(leg+"_2", w_Fleg_2_k0, 0)
			.to(leg+"_2", Ft1, w_Fleg_2_k1, Fp1)
			.to(leg+"_2", Ft2, w_Fleg_2_k2, Fp2)
			.to(leg+"_2", Ft3, w_Fleg_2_k3, Fp3)
			.to(leg+"_2", Ft4, w_Fleg_2_k4, Fp4)
			.to(leg+"_2", Ft5, w_Fleg_2_k5, Fp5)
			.to(leg+"_2", Ft6, w_Fleg_2_k6, Fp6)
			
			.set(leg+"_3", w_Fleg_3_k0, 0)
			.to(leg+"_3", Ft1, w_Fleg_3_k1, Fp1)
			.to(leg+"_3", Ft2, w_Fleg_3_k2, Fp2)
			.to(leg+"_3", Ft3, w_Fleg_3_k3, Fp3)
			.to(leg+"_3", Ft4, w_Fleg_3_k4, Fp4)
			.to(leg+"_3", Ft5, w_Fleg_3_k5, Fp5)
			.to(leg+"_3", Ft6, w_Fleg_3_k6, Fp6)
			
			.set(leg+"_4", w_Fleg_4_k0, 0)
			.to(leg+"_4", Ft1, w_Fleg_4_k1, Fp1)
			.to(leg+"_4", Ft2, w_Fleg_4_k2, Fp2)
			.to(leg+"_4", Ft3, w_Fleg_4_k3, Fp3)
			.to(leg+"_4", Ft4, w_Fleg_4_k4, Fp4)
			.to(leg+"_4", Ft5, w_Fleg_4_k5, Fp5)
			.to(leg+"_4", Ft6, w_Fleg_4_k6, Fp6)
			
			.set(leg+"_5", w_Fleg_5_k0, 0)
			.to(leg+"_5", Ft1, w_Fleg_5_k1, Fp1)
			.to(leg+"_5", Ft2, w_Fleg_5_k2, Fp2)
			.to(leg+"_5", Ft3, w_Fleg_5_k3, Fp3)
			.to(leg+"_5", Ft4, w_Fleg_5_k4, Fp4)
			.to(leg+"_5", Ft5, w_Fleg_5_k5, Fp5)
			.to(leg+"_5", Ft6, w_Fleg_5_k6, Fp6)
			
			return TL.g_Fleg_TL
		}
		//后脚动画配置
		function HLeg(leg){
			TL.g_Hleg_1_TL = new TimelineMax().repeat(1)
			TL.g_Hleg_TL = new TimelineMax().repeat(-1)
			.add([
				TL.g_Hleg_1_TL.set(leg+"_1",w_body_hl_k0,0)
				.to(leg+"_1", Ht1, w_body_hl_k1, Hp1)
				.to(leg+"_1", Ht2, w_body_hl_k2, Hp2)
				.to(leg+"_1", Ht3, w_body_hl_k3, Hp3)
			],0,"normal",0)//位移动画
			.set(leg+"_1", w_Hleg_1_k0, 0)
			.to(leg+"_1", Ht1, w_Hleg_1_k1, Hp1)
			.to(leg+"_1", Ht2, w_Hleg_1_k2, Hp2)
			.to(leg+"_1", Ht3, w_Hleg_1_k3, Hp3)
			.to(leg+"_1", Ht4, w_Hleg_1_k4, Hp4)
			.to(leg+"_1", Ht5, w_Hleg_1_k5, Hp5)
			.to(leg+"_1", Ht6, w_Hleg_1_k6, Hp6)
			
			.set(leg+"_2", w_Hleg_2_k0, 0)
			.to(leg+"_2", Ht1, w_Hleg_2_k1, Hp1)
			.to(leg+"_2", Ht2, w_Hleg_2_k2, Hp2)
			.to(leg+"_2", Ht3, w_Hleg_2_k3, Hp3)
			.to(leg+"_2", Ht4, w_Hleg_2_k4, Hp4)
			.to(leg+"_2", Ht5, w_Hleg_2_k5, Hp5)
			.to(leg+"_2", Ht6, w_Hleg_2_k6, Hp6)
			
			.set(leg+"_3", w_Hleg_3_k0, 0)
			.to(leg+"_3", Ht1, w_Hleg_3_k1, Hp1)
			.to(leg+"_3", Ht2, w_Hleg_3_k2, Hp2)
			.to(leg+"_3", Ht3, w_Hleg_3_k3, Hp3)
			.to(leg+"_3", Ht4, w_Hleg_3_k4, Hp4)
			.to(leg+"_3", Ht5, w_Hleg_3_k5, Hp5)
			.to(leg+"_3", Ht6, w_Hleg_3_k6, Hp6)
			
			.set(leg+"_4", w_Hleg_4_k0, 0)
			.to(leg+"_4", Ht1, w_Hleg_4_k1, Hp1)
			.to(leg+"_4", Ht2, w_Hleg_4_k2, Hp2)
			.to(leg+"_4", Ht3, w_Hleg_4_k3, Hp3)
			.to(leg+"_4", Ht4, w_Hleg_4_k4, Hp4)
			.to(leg+"_4", Ht5, w_Hleg_4_k5, Hp5)
			.to(leg+"_4", Ht6, w_Hleg_4_k6, Hp6)
			
			.set(leg+"_5", w_Hleg_5_k0, 0)
			.to(leg+"_5", Ht1, w_Hleg_5_k1, Hp1)
			.to(leg+"_5", Ht2, w_Hleg_5_k2, Hp2)
			.to(leg+"_5", Ht3, w_Hleg_5_k3, Hp3)
			.to(leg+"_5", Ht4, w_Hleg_5_k4, Hp4)
			.to(leg+"_5", Ht5, w_Hleg_5_k5, Hp5)
			.to(leg+"_5", Ht6, w_Hleg_5_k6, Hp6)
			
			return TL.g_Hleg_TL
		}
		//耳朵动画配置
		function Ear(ear){
			TL.g_Ear_TL=new TimelineMax().repeat(-1)
			.to(ear, w_t/4, {rotation:"-=5",yoyo:true,repeat:1}, 0)
			.to(ear+"_2", w_t/4, {rotation:"-=5",yoyo:true,repeat:1}, 0)
			return TL.g_Ear_TL
		}
		//添加动画
		TL.g_Dog_TL.add(FLeg(".g_FlegR"),Fp4).add(FLeg(".g_FlegL"),0)//添加前脚动画
		TL.g_Dog_TL.add(HLeg(".g_HlegR"),Hp4).add(HLeg(".g_HlegL"),0)//添加后脚动画
		TL.g_Dog_TL.add([
			//躯干
			TL.g_Body_TL.repeat(-1)
				//g_body
				.to(".g_Body", Ft1, w_body_k1, Fp1)
				.to(".g_Body", Ft2, w_body_k2, Fp2)
				.to(".g_Body", Ft3, w_body_k3, Fp3)
				//第一节躯干
				.to(".g_Body_1", Ft1, w_body_1_k1, Fp1)
				.to(".g_Body_1", Ht1-Ft1, w_body_1_k1_1, Fp2)
				.to(".g_Body_1", Ft2-(Ht1-Ft1), w_body_1_k2, Hp2)
				.to(".g_Body_1", Ft3-Ht3, w_body_1_k2_1, Fp3)
				.to(".g_Body_1", Ht3, w_body_1_k3, Hp3)
				//第二节躯干
				.to(".g_Body_2", Ft1, w_body_2_k1, Fp1)
				.to(".g_Body_2", Ht1-Ft1, w_body_2_k1_1, Fp2)
				.to(".g_Body_2", Ft2, w_body_2_k2, Fp2)
				.to(".g_Body_2", Ft3-Ht3, w_body_2_k2_1, Fp3)
				.to(".g_Body_2", Ft3, w_body_2_k3, Fp3),
			//尾巴
			TL.g_Tail_TL.repeat(-1)
				.to(".g_Tail_1", Ht1, w_body_hl_k1, Hp1)
				.to(".g_Tail_1", Ht2, w_body_hl_k2, Hp2)
				.to(".g_Tail_1", Ht3, w_body_hl_k3, Hp3)
				.add([
					TM.to(".g_Tail_1", w_t/4, {rotation:"+=4",yoyo:true,repeat:1}),
					TM.to(".g_Tail_2", w_t/4, {rotation:"-=5",yoyo:true,repeat:1}),
					TM.to(".g_Tail_3", w_t/4, {rotation:"+=10",yoyo:true,repeat:1})
				],0,"normal",0),
			//头颈
			TL.g_Neck_TL.repeat(-1)
				.add([
					TM.to(".g_Neck_1", w_t/4, {rotation:"+=5",yoyo:true,repeat:3}),
					TM.to(".g_Neck_2", w_t/4, {rotation:"-=1",yoyo:true,repeat:3})
				],0,"normal",0),
			TL.Dog_shadow_TL.repeat(-1)
				.to(".Dog_shadow", Ft1,{scaleX:1.3})
				.to(".Dog_shadow", Ft2,{scaleX:1.0})
				.to(".Dog_shadow", Ft3,{scaleX:1.3})
			
		],0,"normal",0)
		TL.g_Dog_TL.add(Ear(".g_EarL"),0).add(Ear(".g_EarR"),0)//添加耳朵动画
		TL.g_Dog_TL.add(TM.to(".ground", w_t/2,{"stroke-dashoffset":"+=210px", repeat:-1}),Fp4)//地面
		.time(Fp4)
	}

	stand2walk()
})