package com.dream.star.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private String id;

    private String loginact;

    private String name;

    private String loginpwd;

    private String email;

    private String createtime;

    private String lockstate;

    private String phone;
}