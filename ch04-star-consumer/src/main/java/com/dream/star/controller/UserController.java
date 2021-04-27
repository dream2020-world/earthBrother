package com.dream.star.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.dream.star.model.UserInfo;
import com.dream.star.service.UserInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @Autor:dream Data:2021/4/12 14:11
 * version:1.0
 */
@Controller
public class UserController {
    //响应暴露的接口
    @Reference(interfaceClass = UserInfoService.class, version = "1.0.0", check = false)
    private UserInfoService userInfoService;

    //修改userInfo
    @RequestMapping("/earth/user/setUserInfo.do")
    public  @ResponseBody UserInfo setUserInfo(UserInfo userInfo){
        System.out.println("进入到设置userInfo阶段");
        System.out.println(userInfo);
        UserInfo UserInfo1 =  userInfoService.setUserInfo(userInfo);
        return  UserInfo1;
    }
    //根据userId 获取user数据

    @RequestMapping("/earth/user/getUserInfo.do")
    public @ResponseBody
    UserInfo getUserInfoById(String userId) {
        System.out.println("进入到获取userId阶段");
        UserInfo userInfo = userInfoService.getUserInfoById(userId);
        if (userId!=null){
            return userInfo;
        }else {
            return  null;
        }

    }
}
