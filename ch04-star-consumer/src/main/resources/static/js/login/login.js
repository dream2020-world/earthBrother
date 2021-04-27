$(function () {
    //验证码'
    showLogin();
    var code = "";

//发送验证码
    $(".loginmain").on("click", '.send', function () {
        //元素变只读60秒后解锁
        $(".send").removeClass("send");
        //60秒
        var time = 60;
        $(".loginmain").off("click");
        var emailOrPhone = $("#emailOrPhone").val().trim();
        if ($(".select option:selected").text() === "电话") {
        } else {
            $.ajax({
                url: "/earth/register.sendCode",
                data: {
                    "emailOrPhone": emailOrPhone
                },
                type: "get",
                success: function (data) {
                    code = data;
                    console.log(code)
                }
            })
        }
    })
//邮箱手机切换
    $(".loginmain").on("change", '.select', function () {
        if ($(".select option:selected").text() === "电话") {
            $("#emailOrPhone").attr('placeholder', '电话');
        } else {
            $("#emailOrPhone").attr('placeholder', '邮箱');
        }
        $("#emailOrPhone").val("");
        $("#emailOrPhone").next().text("");
        $(".send").fadeOut(100);
    })
//用户名验证
    $(".loginmain").on("blur", "#register_act", function () {
        var act = $("#register_act").val().trim();
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (act.length < 8) {
            $("#register_act").next().text("用户名长度过短")
        } else if (reg.test(act)) {
            $("#register_act").next().text("用户名不能包含汉字")
        } else if (act.length > 11) {
            $("#register_act").next().text("用户名过长")
        } else {
            $("#register_act").next().text("");
        }
    });
//密码验证
    $(".loginmain").on("blur", "#register_pwd", function () {
        var pwd = $("#register_pwd").val().trim();
        if (pwd.length < 8) {
            $("#register_pwd").next().text("密码不得小于八位")
        } else if (pwd.length > 15) {
            $("#register_pwd").next().text("密码不得大于十五位")
        } else {
            $("#register_pwd").next().text("");
        }
    })
//邮箱验证
    $(".loginmain").on("blur", "#emailOrPhone", function () {
        var ep = $(".select option:selected").text();
        var emAndPh = $("#emailOrPhone").val().trim();
        if (ep === "邮箱") {
            //邮箱验证
            if (emAndPh.indexOf("@") < 0) {
                $("#emailOrPhone").next().text("邮箱必须包含@");
                $(".send").fadeOut(100);
            } else if (emAndPh.length < 12) {
                $("#emailOrPhone").next().text("邮箱过短");
                $(".send").fadeOut(100);
            } else if (emAndPh.length > 20) {
                $("#emailOrPhone").next().text("邮箱过长");
                $(".send").fadeOut(100);
            } else {
                $("#emailOrPhone").next().text("");
                $(".send").fadeIn(100);
            }
        } else {
            //手机验证
            if (emAndPh.length > 12) {
                $("#emailOrPhone").next().text("手机号码长度位12位以下");
                $(".send").fadeOut(100);
            } else if (emAndPh.length < 5) {
                $("#emailOrPhone").next().text("手机号码长度5位以上");
                $(".send").fadeOut(100);
            } else {
                $(".send").fadeIn(100);
                $("#emailOrPhone").next().text("")
            }
        }
    });
//验证码验证
    $(".loginmain").on("blur", "#checkCode", function () {
        var code = $("#checkCode").val().trim();
        if (code.length > 6 || code.length < 6) {
            $("#checkCode").next().text("验证码为6位，请再次确认")
        } else {
            $("#checkCode").next().text("")
        }
    })
//注册验证
    $("body").on("click", "#register", function () {
        //验证非空
        if ($("#register_act").val().trim() === "" || $("#register_pwd").val().trim() === ""
            || $("#emailOrPhone").val().trim() === "" || $("#checkCode").val().trim() === ""
        ) {
            swal("注册失败...", "你输入有误，请检查", "error");
        } else {
            //注册
            //判断验证码
            if ($("#checkCode").val().trim() === code) {
                //获取数值
                var registerAct = $("#register_act").val().trim();
                var registerPwd = $("#register_pwd").val().trim();
                var emailOrPhone = $("#emailOrPhone").val().trim();
                $.ajax({
                    url: "/earth/register.do",
                    data: {
                        "loginact": registerAct,
                        "loginpwd": registerPwd,
                        "emailOrPhone": emailOrPhone
                    },
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data==="1") {
                            swal("注册失败...", "账号或者密码错误", "error");
                        } else {
                            swal("注册成功", "马上跳转到首页", "success");
                        }
                    }
                })
            } else {
                $("#checkCode").next().text("您的验证码输入有误");
            }

        }
    });

    //忘了密码
    $(".loginmain").on("click", "#forgetPwd", function () {
        //验证非空
        if ($("#loginAct").val().trim() === "" || $("#loginPwd").val().trim() === ""
            || $("#pwdAgain").val().trim() === "" || $("#checkCode").val().trim() === ""
            || $("#emailOrPhone").val().trim() === ""
        ) {
            swal("注册失败...", "你输入有误，请检查", "error");
        } else {
            //注册
            //判断验证码
            if ($("#checkCode").val().trim() === code) {
                //获取数值
                var loginAct = $("#loginAct").val().trim();
                var loginPwd = $("#loginPwd").val().trim();
                var emailOrPhone = $("#emailOrPhone").val().trim();
                $.ajax({
                        url: "/earth/forgetPwd.do",
                    data: {
                        "loginact": loginAct,
                        "loginpwd": loginPwd,
                        "emailOrPhone": emailOrPhone
                    },
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        if (data==="1") {
                            swal("修改失败...", "账号或者密码错误", "error");
                        } else {
                            swal("修改成功", "马上跳转到首页", "success");
                        }
                    }
                })
            } else {
                $("#checkCode").next().text("您的验证码输入有误");
            }

        }
    });

//返回登录
    $(".loginmain").on("click", ".register_forget a", function () {
        $(".loginmain").html("");
        showLogin();
    })
//注册页面
    $(".loginmain").on("click", ".register", function () {
        //隐藏登录
        $(".loginmain").addClass("rotate");
        $(".loginmain").html("");
        //显示注册
        setTimeout(function () {
            $(".loginmain").removeClass("rotate");
        }, 2500);
        showRegister()
    })
//登录页面
    $(".loginmain").on("click", ".register_forget", function () {
        //隐藏注册
        $(".loginmain").addClass("rotate");
        $(".loginmain").html("");
        //显示注册
        setTimeout(function () {
            $(".loginmain").removeClass("rotate");
        }, 2500);
        showLogin();
    });

    //忘记密码
    $(".loginmain").on("click", ".forget", function () {
        //隐藏注册
        $(".loginmain").addClass("rotate");
        $(".loginmain").html("");
        //显示注册
        setTimeout(function () {
            $(".loginmain").removeClass("rotate");
        }, 2500);
        showForget();
    });
    $(".pages").hide();
    //验证密码是否相投
    $(".loginmain").on("blur", "#pwdAgain", function () {
        var pwd = $("#loginPwd").val().trim();
        var pwdAgain = $("#pwdAgain").val().trim();
        if (pwd === pwdAgain) {
            $("#pwdAgain").next().text("两次密码一致")
        } else {
            $("#pwdAgain").next().text("密码不一致,重新输入")
        }
    })
//这里的初始化是滑动&拼图的标志slideVerify
    $(".loginmain").on("click", "#login", function () {
        //获取登录框和密码框
        var loginAct = $("#loginAct").val().trim();
        var loginPwd = $("#loginPwd").val().trim();
        console.log(loginAct+"----"+loginPwd);
        if (loginAct.length < 6) {
            $(".error").text("账号长度过短，请重新输入")
        } else if (loginPwd.length < 6) {
            $(".error").text("密码长度过短，请重新输入")
        } else {
            //加入遮罩层
            $(".pages").fadeIn();
            $('#mpanel4').slideVerify({
                type: 2,		//类型
                vOffset: 5,	//误差量，根据需求自行调整
                vSpace: 5,	//间隔
                imgName: ['1.jpg', '2.jpg'],
                imgSize: {
                    width: '450px',
                    height: '250px',
                },
                blockSize: {
                    width: '50px',
                    height: '50px',
                },
                barSize: {
                    width: '450px',
                    height: '40px',
                },
                ready: function () {
                },
                success: function () {
                    //请求
                    $.ajax({
                        url: "/earth/login.do",
                        data: {
                            "loginAct": loginAct,
                            "loginPwd": loginPwd
                        },
                        type: "post",
                        dataType: "json",
                        success: function (data) {
                            if (data.success == false) {
                                //登录失败
                                swal("登录失败...", "账号或者密码错误", "error");
                                //关闭验证
                                $(".verify-bar-area").remove();
                                $(".verify-img-out").remove();
                                //清空密码
                                $("#loginPwd").val("");
                            } else {
                                //登录成功
                                //关闭验证
                                $(".verify-bar-area").remove();
                                $(".verify-img-out").remove();
                                swal("登录成功", "马上跳转到首页", "success");
                            }
                        }
                    });
                    //删除遮罩层
                    $(".pages").fadeOut(1000);
                }
            })
        }
    });
});
//ok
$("body").on("click", ".confirm", function () {
    if ($(".sweet-alert h2").text().indexOf("成功")>=0) {
        window.location = "/earth/index";
    }
})

//忘了密码
function showForget() {
    var html = "   <div class=\"three\">\n" +
        "        <div class=\"login-title\">\n" +
        "            <span>忘了密码</span>\n" +
        "        </div>\n" +
        "\n" +
        "        <div class=\"login-con\">\n" +
        "            <div class=\"login-user\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/user_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"loginAct\" type=\"text\" name=\"usernem\" placeholder=\"用户名\" autocomplete=\"off\" value=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/lock_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"loginPwd\" type=\"password\" name=\"pwd\" placeholder=\"密码\" autocomplete=\"off\" value=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/lock_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"pwdAgain\" type=\"password\" name=\"pwdAgain\" placeholder=\"确认密码\" autocomplete=\"off\" value=\"\">\n" +
        "                <span></span>\n" +
        "            </div>\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <select class=\"select\">\n" +
        "                        <option>邮箱</option>\n" +
        "                        <option>电话</option>\n" +
        "                    </select>\n" +
        "                </div>\n" +
        "                <input id=\"emailOrPhone\" type=\"text\" name=\"pwd\" placeholder=\"邮箱\" autocomplete=\"off\" >\n" +
        "                <span></span>\n" +
        "                <div class=\"send sends\">发送</div>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/key.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"checkCode\" type=\"text\" name=\"pwd\" placeholder=\"验证码\" autocomplete=\"off\" >\n" +
        "                <span></span>\n" +
        "            </div>\n" +
        "            <div class=\"error\"></div>\n" +
        "            <div class=\"login-btn\">\n" +
        "                <input type=\"button\" value=\"重置密码\" id=\"forgetPwd\">\n" +
        "            </div>\n" +
        "            <div class=\'aa\'  id=\"mpanel4\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>";
    $(".loginmain").html(html)
}

function showLogin() {
    var html = "   <div class=\"one\">\n" +
        "        <div class=\"login-title\">\n" +
        "            <span>用户登录</span>\n" +
        "        </div>\n" +
        "\n" +
        "        <div class=\"login-con\">\n" +
        "            <div class=\"login-user\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/user_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"loginAct\" type=\"text\" name=\"usernem\" placeholder=\"用户名\" autocomplete=\"off\" value=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/lock_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"loginPwd\" type=\"password\" name=\"pwd\" placeholder=\"密码\" autocomplete=\"off\" value=\"\">\n" +
        "            </div>\n" +
        "            <div class=\"error\"></div>\n" +
        "            <div class=\"reg\"><a href=\"javascript:\" class=\"forget\">忘了密码</a>|<a href=\"javascript:\" class=\"register\">没有账号？立即注册</a>\n" +
        "            </div>\n" +
        "            <div class=\"login-btn\">\n" +
        "                <input type=\"button\" value=\"登录\" id=\"login\">\n" +
        "            </div>\n" +
        "            <div class=\'aa\'  id=\"mpanel4\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>";
    $(".loginmain").html(html)
}

function showRegister() {
    var html = " <div class=\"two\">\n" +
        "        <div class=\"login-title\">\n" +
        "            <span>用户注册</span>\n" +
        "        </div>\n" +
        "        <div class=\"login-con\">\n" +
        "            <div class=\"login-user\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/user_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"register_act\" type=\"text\" name=\"usernem\" placeholder=\"用户名\" autocomplete=\"off\"    >\n" +
        "                <span></span>\n" +
        "            </div>\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/lock_icon_copy.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"register_pwd\" type=\"password\" name=\"pwd\" placeholder=\"密码\" autocomplete=\"off\">\n" +
        "                <span></span>\n" +
        "            </div>\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <select class=\"select\">\n" +
        "                        <option>邮箱</option>\n" +
        "                        <option>电话</option>\n" +
        "                    </select>\n" +
        "                </div>\n" +
        "                <input id=\"emailOrPhone\" type=\"text\" name=\"pwd\" placeholder=\"邮箱\" autocomplete=\"off\" >\n" +
        "                <span></span>\n" +
        "                <div class=\"send sends\">发送</div>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"login-pwd\">\n" +
        "                <div class=\"icons\">\n" +
        "                    <img src=\"/images/login/key.png\" alt=\"\">\n" +
        "                </div>\n" +
        "                <input id=\"checkCode\" type=\"text\" name=\"pwd\" placeholder=\"验证码\" autocomplete=\"off\" >\n" +
        "                <span></span>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"login-btn\">\n" +
        "                <input type=\"button\" value=\"注册\" id=\"register\">\n" +
        "            </div>\n" +
        "            <div class=\"register_forget\"><a href=\"javascript:\">已有账号？返回登录</a></div>\n" +
        "        </div>\n" +
        "    </div>";
    $(".loginmain").html(html)
}