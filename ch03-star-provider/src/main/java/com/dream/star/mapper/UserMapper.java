package com.dream.star.mapper;

import com.dream.star.model.User;

import java.util.Map;

public interface UserMapper {
    int deleteByPrimaryKey(String id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User login(Map<String, String> map);

    User forgetPwd(User user);

    Integer setUser(User user);

    User selectByPrimaryKeys(String id);
}