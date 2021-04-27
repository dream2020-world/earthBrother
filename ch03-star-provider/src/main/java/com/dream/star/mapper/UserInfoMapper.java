package com.dream.star.mapper;

import com.dream.star.model.UserInfo;

public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);

    UserInfo selectByPrimaryKeys(String userId);

    Integer setUserInfo(UserInfo userInfo);

    void setTitleImg(String imgTitle,String userId);

    void insertUserId(String id);
}