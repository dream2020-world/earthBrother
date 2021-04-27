package com.dream.star.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Autor:dream Data:2021/3/3 18:52
 * version:1.0
 */
@Api("页面跳转类")
@Controller
public class SkipTo {

    @ApiOperation(value = "跳转index", notes="跳转到index页面")
    @GetMapping("/earth/index")
    public String toIndex() {
        return "index";
    }

    @ApiOperation(value = "跳转login", notes="跳转到登录页面")
    @GetMapping("/earth/login")
    public String toLogin() {
        return "login";
    }

    @ApiOperation(value = "跳转seal", notes="跳转到海洋页面")
    @RequestMapping("/earth/seal")
    public  String toSeal(){
        return "sea";
    }

    @ApiOperation(value = "跳转ziran", notes="跳转到自然页面")
    @RequestMapping("/earth/ziran")
    public  String toZiRan(){
        return "ziran";
    }

    @ApiOperation(value = "跳转user/index", notes="跳转到用户首页")
    @RequestMapping("/earth/user/index")
    public  String toUserIndex(){
        return "user";
    }
    @ApiOperation(value = "跳转user/category", notes="跳转到用户分类")
    @RequestMapping("/earth/user/category")
    public  String toUserCategory(){
        return "/user/category";
    }

        @ApiOperation(value = "跳转user/contact", notes="跳转到用户类别")
    @RequestMapping("/earth/user/contact")
    public  String toUserContact(){
        return "/user/contact";
    }

    @ApiOperation(value = "跳转user/portfolio", notes="跳转到用户文件夹")
    @RequestMapping("/earth/user/portfolio")
    public  String toUserPortfolio(){
        return "/user/portfolio";
    }

    @ApiOperation(value = "跳转user/search", notes="跳转到用户查询")
    @RequestMapping("/earth/user/search")
    public  String toUserSearch(){
        return "/user/search";
    }

    @ApiOperation(value = "跳转user/testimonials", notes="跳转到用户感言")
    @RequestMapping("/earth/user/testimonials")
    public  String toUserTestimonials(){
        return "/user/testimonials";
    }

    @ApiOperation(value = "跳转user/editormd", notes="跳转到文档")
    @RequestMapping("/earth/editormd")
    public  String toEditOrMd(){
        return "editormd";
    }
    @RequestMapping("/earth/keji")
    public  String toKeji(){
        return "keji";
    }
}
