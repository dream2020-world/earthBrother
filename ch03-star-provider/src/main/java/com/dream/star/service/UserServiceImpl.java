package com.dream.star.service;

import com.alibaba.dubbo.config.annotation.Service;
import com.dream.star.mapper.UserInfoMapper;
import com.dream.star.mapper.UserMapper;
import com.dream.star.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 24663
 * @Autor:dream Data:2021/3/9 10:30
 * version:1.0
 */
//暴露接口
@Component
@Service(interfaceClass = UserService.class,version = "1.0.0",timeout = 15000)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private  UserInfoMapper userInfoMapper;

    /**登录
     * @param loginAct 姓名
     * @param loginPwd  密码
     */
    @Override
    public User login(String loginAct, String loginPwd) throws LoginException {
        System.out.println("进入到登录验证dao层");
        //封装为map
        Map<String,String> map = new HashMap<>();
        map.put("loginAct",loginAct);
        map.put("loginPwd",loginPwd);
        //进行dao层操作
        User user = userMapper.login(map);
        System.out.println(user);
        if(user==null){
            throw  new LoginException("账号或密码输入错误");
        }
        return user;
    }
    /**注册
     * @param user 注册信息
     */
    @Override
    public void register(User user) {
        System.out.println("进入到注册dao");
        //进行注册
        try {
            userMapper.insert(user);
            userInfoMapper.insertUserId(user.getId());
        }catch (Exception e){
            e.printStackTrace();
        }


    }
    /**忘了密码
     * @param user 用户信息
     */
    @Override
    public void forgetPwd(User user) {
        System.out.println("进入到修改密码dao");
        try {
         User user1 = userMapper.forgetPwd(user);
         System.out.println(user1);
         if(user1!=null){
             //进行修改
             user1.setLoginpwd(user.getLoginpwd());
             int i = userMapper.updateByPrimaryKeySelective(user1);
             System.out.println(i);
             //修改成功
         }
        }catch (Exception e){
            e.printStackTrace();
        }

    }
    //修改user
    @Override
    public User setUser(User user) {
        System.out.println("进入修改user Dao");
        Integer config= userMapper.setUser(user);
        if(config==1){
            //获取user
            User user1 = userMapper.selectByPrimaryKeys(user.getId());
            System.out.println(user1);
            return user1;
        }else{
            return null;
        }

    }
}
