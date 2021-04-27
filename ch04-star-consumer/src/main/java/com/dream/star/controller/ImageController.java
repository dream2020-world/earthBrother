package com.dream.star.controller;

import com.alibaba.dubbo.common.json.JSONObject;
import com.alibaba.dubbo.config.annotation.Reference;
import com.dream.star.service.UserInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.UUID;

/**
 * @Autor:dream Data:2021/4/10 11:32
 * version:1.0
 */
@Controller
public class ImageController {

    //响应暴露的接口
    @Reference(interfaceClass = UserInfoService.class, version = "1.0.0", check = false)
    private UserInfoService userInfoService;

    //base64图片上传
    @RequestMapping("/file/uploads")
    @ResponseBody
    public String fileUpload(String base, String userId, HttpServletRequest request) throws IOException {
        if (null != base) {
            base = base.substring(base.indexOf(",") + 1);
        }
        String path = System.getProperty("user.dir") + "/upload/";

        //按照月份进行分类：
        Calendar instance = Calendar.getInstance();
        String month = (instance.get(Calendar.MONTH) + 1) + "月";
        path = path + month;

        File realPath = new File(path);
        if (!realPath.exists()) {
            realPath.mkdirs();
        }

        //上传文件地址
        System.out.println("上传文件保存地址：" + realPath);

        //解决文件名字问题：我们使用uuid;
        String filename = "pg-" + UUID.randomUUID().toString().replaceAll("-", "") + ".jpg";

        //拼接字符串
        String imgTitle = "http://localhost:8000/upload/" + (instance.get(Calendar.MONTH) + 1) + "月/" + filename;
        //存入数据库
        userInfoService.setTitleImg(imgTitle, userId);
        System.out.println(imgTitle);


        BASE64Decoder decoder = new BASE64Decoder();
        //Base64解码
        byte[] b = decoder.decodeBuffer(base);
        File newfile = new File(realPath, filename);
        OutputStream out = new FileOutputStream(realPath + "\\" + filename);
        out.write(b);
        out.flush();
        out.close();
        return imgTitle;
    }

    //博客图片上传问题
    @RequestMapping("/file/upload")
    @ResponseBody
    public String fileUpload(MultipartFile photo, String userId, HttpServletRequest request) throws IOException {
        System.out.println("进入到文章图片上传");
        System.out.println(userId);
        //上传路径保存设置

        //获得SpringBoot当前项目的路径：System.getProperty("user.dir")
        String path = System.getProperty("user.dir") + "/upload/";

        //按照月份进行分类：
        Calendar instance = Calendar.getInstance();
        String month = (instance.get(Calendar.MONTH) + 1) + "月";
        path = path + month;

        File realPath = new File(path);
        if (!realPath.exists()) {
            realPath.mkdirs();
        }

        //上传文件地址
        System.out.println("上传文件保存地址：" + realPath);

        //解决文件名字问题：我们使用uuid;
        String filename = "pg-" + UUID.randomUUID().toString().replaceAll("-", "") + ".jpg";
        File newfile = new File(realPath, filename);
        //拼接字符串
        String imgTitle = "http://localhost:8000/upload/" + (instance.get(Calendar.MONTH) + 1) + "月/" + filename;
        userInfoService.setTitleImg(imgTitle, userId);
        //通过CommonsMultipartFile的方法直接写文件（注意这个时候）
        photo.transferTo(newfile);

        return imgTitle;
    }
}
