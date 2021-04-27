package com.dream.star.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.dream.star.mapper.HobbyMapper;
import com.dream.star.model.Hobby;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Map;

/**
 * @Autor:dream Data:2021/4/12 16:10
 * version:1.0
 */
@Component
@Service(interfaceClass = HobbyService.class,version = "1.0.0",timeout = 15000)
public class HobbyServiceImpl implements HobbyService {
    @Autowired
    private HobbyMapper hobbyMapper;

    @Override
    public ArrayList<Hobby> getHobbies(String userId) {
        ArrayList<Hobby> hobbies = hobbyMapper.selectAllHobbies(userId);
        return hobbies;
    }

    @Override
    public void setHobbies(Hobby hobby) {
        System.out.println("进入到设置hobbies dao");
        if(hobby.getId()!=null){
            Integer config = hobbyMapper.setHobbies(hobby);
        }else{
            Integer config = hobbyMapper.insert(hobby);
        }

    }
}
