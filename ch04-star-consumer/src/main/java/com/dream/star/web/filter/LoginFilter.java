package com.dream.star.web.filter;

import com.dream.star.model.User;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @Autor:dream Data:2021/4/9 15:18
 * version:1.0
 */
@WebFilter("/earth/*")
public class LoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("进入到过滤器");
        //通过session判断是否登录过 因为只要session中有对象就证明登陆过
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        /*放行登录，/login.jsp  /setting/user/login.jsp*/
        String path = request.getServletPath();
        if("/earth/login".equals(path)||"/earth/ziran".equals(path)||
        "/earth/index".equals(path)||"/earth/seal".equals(path)
                ||"/earth/keji".equals(path)||"/earth/yuzhou".equals(path)||
                "/earth/register.sendCode".equals(path)||
        path.contains(".do")){
            filterChain.doFilter(servletRequest,servletResponse);
        }else{
            //其他资源必须验证是否登录
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            if (user != null) {
                //说明登陆过
                filterChain.doFilter(servletRequest, servletResponse);
            }else{
                //重定向
                response.sendRedirect(request.getContextPath() + "/earth/login");
            }
        }
    }
}
