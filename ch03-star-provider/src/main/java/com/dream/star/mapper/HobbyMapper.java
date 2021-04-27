package com.dream.star.mapper;

import com.dream.star.model.Hobby;

import java.util.ArrayList;

public interface HobbyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Hobby record);

    int insertSelective(Hobby record);

    Hobby selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Hobby record);

    int updateByPrimaryKey(Hobby record);

    ArrayList<Hobby> selectAllHobbies(String userId);

    Integer setHobbies(Hobby hobby);
}