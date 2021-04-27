package com.dream.star.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import springfox.documentation.service.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by bianxh on 2019/1/21.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        //链式编程（构建器模式），基本是固定；
        return new Docket(DocumentationType.SWAGGER_2)
                //可以开启或关闭swagger文档
                .enable(true)
                .apiInfo(apiInfo())
                .select()
                //扫描有ApiOperation注解的方法
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * 创建api的基本信息
     *
     * @return
     */
    private ApiInfo apiInfo() {
        //链式编程（构建器模式），基本是固定；
        return new ApiInfoBuilder()
                .title("用户账号中心接口文档")
                .description("集成Swagger2构建RESTful APIs")
                .termsOfServiceUrl("http://www.bjpowernode.com/")
                .contact(new Contact("cat","http://www.bjpowernode.com","cat@163.com"))
                .license("采用 Apache 2.0 开源许可证")
                .licenseUrl("http://http://www.bjpowernode.com/licence.txt")
                .version("1.0.0")
                .build();
    }
}