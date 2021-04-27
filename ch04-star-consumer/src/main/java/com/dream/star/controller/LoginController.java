package com.dream.star.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.dream.star.model.User;
import com.dream.star.service.UserService;
import com.dream.star.until.DateTimeUtil;
import com.dream.star.until.MailServiceImpl;
import com.dream.star.until.MathRandom;
import com.dream.star.until.UUIDUtil;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

/**
 * @Autor:dream Data:2021/3/15 15:53
 * version:1.0
 */
@Api("登录请求处理类")
@Controller
public @ResponseBody
class LoginController {

    //响应暴露的接口
    @Reference(interfaceClass = UserService.class, version = "1.0.0", check = false)
    private UserService userService;

    //邮箱验证
    @Autowired

    private MailServiceImpl mailService;

    //修改用户信息
    @RequestMapping("/earth/user/setUser.do")
    public @ResponseBody User setUser(HttpServletRequest request,User user){
        System.out.println("进入到修改用户阶段");
        User user1 = userService.setUser(user);
        if(user1!=null){
            //存入session
            request.getSession().setAttribute("user",user1);
            return user1;
        }else{
            return null;
        }

    }
    @ApiOperation(value = "获取用户信息",
            notes = "根据用户名和密码进行获取用户信息并存入Session中")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "request",
                    value = "request对象", dataType = "HttpServletRequest"),
            @ApiImplicitParam(paramType = "query", name = "name",
                    value = "用户姓名", dataType = "String"),
            @ApiImplicitParam(paramType = "query", name = "pwd",
                            value = "用户密码", dataType = "String"),
    })
    @ApiResponses({
            @ApiResponse(code = 404,message = "请求路径或页面路径不对"),
            @ApiResponse(code = 200,message = "请求成功,从数据库请求数据user存入session")
    })
    @PostMapping(value = "/earth/login.do")
    public Object login(HttpServletRequest request, String loginAct, String loginPwd) {
        System.out.println("进入到登录验证阶段");
        //将密码进行md5加密
        //pwd = MD5Util.getMD5(pwd);
        try{
            //进行登录验证
            User user = userService.login(loginAct,loginPwd);
            //将获取的数据存入session
            request.getSession().setAttribute("user",user);
            //返回给前台
            return true;
        }catch(Exception e){
            //表示登录失败
            e.printStackTrace();
            String msg = e.getMessage();
            Map<String,Object> map = new HashMap<String, Object>();
            map.put("success",false);
            map.put("msg",msg);
            return map;
        }
    }

    @ApiOperation(value = "注册用户",
            notes = "根据用户信息进行注册")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "header", name = "request",
                    value = "request对象", dataType = "HttpServletRequest"),
            @ApiImplicitParam(paramType = "query", name = "user",
                    value = "注册信息", dataType = "User"),
            @ApiImplicitParam(paramType = "header", name = "emailOrPhone",
                    value = "邮箱或手机号码", dataType = "String")
    })
    @ApiResponses({
            @ApiResponse(code = 404,message = "请求路径或页面路径不对"),
            @ApiResponse(code = 200,message = "请求成功,将注册的用户信息存入数据库")
    })
    @PostMapping("/earth/register.do")
    public @ResponseBody String toRegister(HttpServletRequest request,User user,String emailOrPhone) throws ParseException {
        //完善用户信息
        //判断是邮箱还是电话
        if(emailOrPhone.contains("@")){
            user.setEmail(emailOrPhone);
        }else{
            user.setPhone(emailOrPhone);
        }
        //设置其他属性
        user.setId(UUIDUtil.getUUID());
        user.setCreatetime(DateTimeUtil.getSysTime());
        user.setLockstate("1");
        System.out.println(user);
        //进入service层
        try {
            userService.register(user);
            //注册成功
            //将该用户存入session
            request.getSession().setAttribute("user",user);
            //跳转页面
            return "1";
        }catch (Exception e){
            e.printStackTrace();
            //注册失败
            return "2";
        }
    }
//忘记密码
@ApiOperation(value = "忘记密码",
        notes = "根据用户信息修改密码")
@ApiImplicitParams({
        @ApiImplicitParam(paramType = "header", name = "request",
                value = "request对象", dataType = "HttpServletRequest"),
        @ApiImplicitParam(paramType = "query", name = "user",
                value = "注册信息", dataType = "User"),
        @ApiImplicitParam(paramType = "header", name = "emailOrPhone",
                value = "邮箱或手机号码", dataType = "String")
})
@ApiResponses({
        @ApiResponse(code = 404,message = "请求路径或页面路径不对"),
        @ApiResponse(code = 200,message = "请求成功,将注册的用户信息存入数据库")
})
@PostMapping("/earth/forgetPwd.do")
public @ResponseBody String forgetPwd(HttpServletRequest request,User user,String emailOrPhone) throws ParseException {
    //完善用户信息
    //判断是邮箱还是电话
    if(emailOrPhone.contains("@")){
        user.setEmail(emailOrPhone);
    }else{
        user.setPhone(emailOrPhone);
    }
    System.out.println(user);
    //进入service层
    try {
        //根据用户名和邮箱或手机获取用户
        userService.forgetPwd(user);
        //修改成功
        //将该用户存入session
        request.getSession().setAttribute("user",user);
        //跳转页面
        return "1";
    }catch (Exception e){
        e.printStackTrace();
        //注册失败
        return "2";
    }
}


    @ApiOperation(value = "获取邮箱或手机",
            notes = "根据手机或邮箱发送验证码，并将生成的验证码返回")
    @ApiImplicitParam(paramType = "header", name = "emailOrPhone",
            value = "邮箱或手机号码", dataType = "String")
    @ApiResponses({
            @ApiResponse(code = 404,message = "请求路径或页面路径不对"),
            @ApiResponse(code = 200,message = "请求成功,将数据返回")
    })
    @GetMapping("/earth/register.sendCode")
    public @ResponseBody String getCode(String emailOrPhone)  {
        //获取随机数
        String math = MathRandom.create();
        System.out.println(emailOrPhone);
        //判断是否是邮箱
        if(emailOrPhone.contains("@")){
            try{
                //邮箱发送验证码
                mailService.sendHtmlMail(emailOrPhone,"地球浏览器验证码",
                        "您的验证码位:<a href='javascript:'>"+math+"</a>请勿转告他人");
                return math;
            }catch (MessagingException e){
                return "验证码发送失败";
            }

        }else{
            System.out.println("2");
        }
        return "";
    }

}
