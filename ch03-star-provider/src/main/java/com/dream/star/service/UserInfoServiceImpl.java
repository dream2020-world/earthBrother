package com.dream.star.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.dream.star.mapper.UserInfoMapper;
import com.dream.star.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @Autor:dream Data:2021/4/12 14:56
 * version:1.0
 */
@Component
@Service(interfaceClass = UserInfoService.class,version = "1.0.0",timeout = 15000)
public class UserInfoServiceImpl implements UserInfoService {
    @Autowired
    private UserInfoMapper userInfoMapper;

    @Override
    public UserInfo getUserInfoById(String userId) {
        System.out.println("进入到获取userInfo dao 层");
        UserInfo userInfo = userInfoMapper.selectByPrimaryKeys(userId);
        System.out.println(userInfo);
        return userInfo;
    }

    @Override
    public UserInfo setUserInfo(UserInfo userInfo) {
        System.out.println("进入到获取UserInfo Dao");
        Integer config = userInfoMapper.setUserInfo(userInfo);
        if(config==1){
            UserInfo userInfo1 = userInfoMapper.selectByPrimaryKey(userInfo.getId());
            return userInfo1;
        }else{
            return null;
        }


    }

    @Override
    public void setTitleImg(String imgTitle,String userId) {
        System.out.println("设置头像");
        System.out.println(imgTitle+""+userId);
        userInfoMapper.setTitleImg(imgTitle,userId);
    }
}
