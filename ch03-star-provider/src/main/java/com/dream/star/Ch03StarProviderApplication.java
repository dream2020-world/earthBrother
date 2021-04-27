package com.dream.star;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//指定mapper
@MapperScan(basePackages = "com.dream.star.mapper")
//开启dubbo配置
@EnableDubboConfiguration
@SpringBootApplication
public class Ch03StarProviderApplication {

	public static void main(String[] args) {
		SpringApplication.run(Ch03StarProviderApplication.class, args);
	}

}
