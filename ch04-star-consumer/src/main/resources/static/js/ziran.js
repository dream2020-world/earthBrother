var bottom = document.getElementsByClassName('PageBottom')[0];
$(function () {
    $("#big1").click(function () {
        $("#left1").animate({
            left: "-600px"
        }, 1000);
        $("#right1").animate({
            width: "1920px"
        }, 1000);
        $("#big1").animate({
            left: "-20px"
        });
        $("#big2").animate({
            left: "20px"
        });
        $("#big2").fadeIn({
            display: 'block'
        });
        $("#big1").fadeOut({
            display: 'none'
        });
    });
    $("#big2").click(function () {
        $("#left1").animate({
            left: "0px"
        }, 1000);
        $("#right1").animate({
            width: "1310px"
        }, 1000);
        $("#big2").animate({
            left: "600px"
        });
        $("#big1").animate({
            left: "557px"
        });
        $("#big2").fadeOut({
            display: 'none'
        });
        $("#big1").fadeIn({
            display: 'block'
        });
    });


    //键盘控制视频播放
    var vol = 0.1;  //1代表100%音量，每次增减0.1
    var time = 0.3; //单位秒，每次增减1秒
    var videoElement = document.getElementById("videos1");
    console.log(videoElement.paused);

    document.onkeyup = function (event) {//键盘事件

        console.log("keyCode:" + event.keyCode);
        var e = event || window.event || arguments.callee.caller.arguments[0];

        //鼠标上下键控制视频音量
        if (e && e.keyCode === 37) {
            // 按 向左键
            videoElement.currentTime !== 0 ? videoElement.currentTime -= time : 1;
            return false;

        } else if (e && e.keyCode === 39) {
            // 按 向右键
            videoElement.volume !== videoElement.duration ? videoElement.currentTime += time : 1;
            return false;

        } else if (e && e.keyCode === 32) {
            // 按空格键 判断当前是否暂停
            videoElement.paused === true ? videoElement.play() : videoElement.pause();
            return false;
        }

    };


    var bottomTF = false;
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }//FF,火狐浏览器会识别该方法
    window.onmousewheel = document.onmousewheel = wheel;//W3C
    //统一处理滚轮滚动事件
    function wheel(event) {
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
        } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
            delta = -event.detail / 3;
        }
        nowTime = new Date().getTime();
        if (delta < 0) {
            if (bottom) {
                //变量scrollTop是滚动条滚动时，距离顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                //变量windowHeight是可视区的高度
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //滚动条到底部的条件
                if (scrollTop + windowHeight == scrollHeight) {
                    bottomA('bottom');
                    bottomTF = true;
                }
            }
        } else {
            if (bottomTF) {
                bottomA('top');
            }
        }
    }

    var i = 0;
    $("body").mousemove(function (event) {
        if("ziran_1"===event.target.className){
            var len = event.pageX/$("#s1").width();
            $("#s1").css("background-position-x",-(event.pageX));
            $("#s1 div").css("background-position-x",(event.pageX));
        }
    })
})
window.onscroll = function () {

}
//去除空格键滚动事件
document.onkeydown = function (ev) {
    var e = ev || event;
    if (e.keyCode == 32) {
        return false;
    }
}

