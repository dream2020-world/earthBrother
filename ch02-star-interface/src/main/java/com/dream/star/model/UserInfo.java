package com.dream.star.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserInfo implements Serializable {

    private Integer id;

    private String userid;

    private String intro;

    private String job;

    private String headimage;

    private String borndate;

    private Integer hobbyid;

    private String address;

}