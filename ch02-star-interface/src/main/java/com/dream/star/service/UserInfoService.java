package com.dream.star.service;

import com.dream.star.model.UserInfo;

/**
 * @Autor:dream Data:2021/4/12 14:56
 * version:1.0
 */
public interface UserInfoService {
    UserInfo getUserInfoById(String userId);

    UserInfo setUserInfo(UserInfo userInfo);

    void setTitleImg(String imgTitle,String userId);
}
