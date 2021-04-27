package com.dream.star.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class Hobby implements Serializable {
    private Integer id;

    private String hobby;

    private Integer count;

    private String useid;
    public Hobby(Integer id, String hobby, Integer count, String useid) {
        this.id = id;
        this.hobby = hobby;
        this.count = count;
        this.useid = useid;
    }
}