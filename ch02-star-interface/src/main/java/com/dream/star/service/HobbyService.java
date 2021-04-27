package com.dream.star.service;

import com.dream.star.model.Hobby;

import java.util.ArrayList;
import java.util.Map;

/**
 * @Autor:dream Data:2021/4/12 16:08
 * version:1.0
 */
public interface HobbyService {
    ArrayList<Hobby> getHobbies(String userId);

    void setHobbies(Hobby hobby);
}
