package com.dream.star.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.dream.star.model.Hobby;
import com.dream.star.service.HobbyService;
import com.dream.star.service.UserInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @Autor:dream Data:2021/4/12 16:07
 * version:1.0
 */
@Controller
public class HobbyController {
    //响应暴露的接口
    @Reference(interfaceClass = HobbyService.class, version = "1.0.0", check = false)
    private HobbyService hobbyService;

    //获取hobbies
    @RequestMapping("/earth/user/getHobbies.do")
    public @ResponseBody
    ArrayList<Hobby> getHobbies(String userId){
        ArrayList<Hobby>  hobbies = hobbyService.getHobbies(userId);
       return hobbies;
    }
    //设置hobbies
    @RequestMapping("/earth/user/setHobbies.do")
    public @ResponseBody ArrayList<Hobby> setHobbies(Hobby hobby){
        System.out.println("进入到设置user hobbies 阶段");
        hobbyService.setHobbies(hobby);

        return null;
    }
}
