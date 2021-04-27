package com.dream.star.service;

import com.dream.star.model.User;

import javax.security.auth.login.LoginException;

/**
 * @Autor:dream Data:2021/3/9 10:30
 * version:1.0
 */
public interface UserService {
    /**登录
     *
     * @param loginAct 账号
     * @param loginPwd 密码
     */
    User login(String loginAct, String loginPwd) throws LoginException;
    /**注册
     * @param user 注册信息
     */
    void register(User user);
    /**修改密码
     * @param user 注册信息
     */
    void forgetPwd(User user);

    User setUser(User user);
}
